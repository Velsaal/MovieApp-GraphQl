import { ApolloServer } from 'apollo-server';
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
        if (typeof decoded === 'object' && 'userId' in decoded) {
          user = await prisma.user.findUnique({ where: { id: (decoded as any).userId } });
        }
      } catch (error) {
        console.error('Error verifying token:', error);
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
