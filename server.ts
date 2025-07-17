import { ApolloServer } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import dotenv from 'dotenv';
import { schema } from './src/schema';
import prisma from './src/db/prisma';
import { verifyToken } from './src/auth/jwt';
import { permissions } from './src/auth/permission';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: async ({ req }) => {
    const auth = req.headers.authorization || '';
    let user = null;
    
    const body = req.body || {};
    const query = body.query || '';
    
    const publicOperations = ['register', 'login'];
    const isPublicOperation = publicOperations.some(op => query.includes(op));
    
    if (isPublicOperation) {
      return {
        prisma,
        user,
        req,
      };
    }
    
    if (!auth || !auth.startsWith('Bearer ')) {
      throw new Error('Authorization header missing or invalid');
    }
    const token = auth.replace('Bearer ', '');

    try {
      const decoded = verifyToken(token);
      if (typeof decoded === 'object' && 'sessionId' in decoded) {     
        const session = await prisma.session.findFirst({
          where: { 
            id: (decoded as any).sessionId,
            token: token, 
            expiresAt: { gt: new Date() } 
          },
          include: { user: true }
        });
        
        if (!session) {
          throw new Error('Session not found or expired');
        }
        
        if (!session.user) {
          throw new Error('User not found in database');
        }
        
        user = session.user;
      } else {
        throw new Error('Invalid token format');
      }
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
    
    return {
      prisma,
      user,
      req,
    };
  },
  cors: {
    origin: '*',
    credentials: true,
  },
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server is running on ${url}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
