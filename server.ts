import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import { schema } from './src/schema';
import prisma from './src/db/prisma';
import { getUserIdFromReq } from './src/auth/authMiddleware';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({userId: getUserIdFromReq(req), 
    req,
  }),
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
