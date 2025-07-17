import { ApolloServer } from 'apollo-server';
import { AuthenticationError } from 'apollo-server';
import dotenv from 'dotenv';
import { schema } from './src/schema';
import prisma from './src/db/prisma';
import { verifyToken } from './src/auth/jwt';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const auth = req.headers.authorization || '';
    let user = null;
    if (auth.startsWith('Bearer ')) {
      const token = auth.replace('Bearer ', '');
      try {
        const decoded = verifyToken(token);
        if (typeof decoded === 'object' && 'sessionId' in decoded) {
          // Проверяем сессию в БД
          const session = await prisma.session.findFirst({
            where: { 
              id: (decoded as any).sessionId,
              expiresAt: { gt: new Date() } // Проверяем, что сессия не истекла
            },
            include: { user: true }
          });
          
          if (session && session.user) {
            user = session.user;
          }
        }
              } catch (error) {
          // Токен недействителен - оставляем user как null
          console.warn('Invalid token:', error instanceof Error ? error.message : 'Unknown error');
        }
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
