import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import { schema } from './src/schema';
import initMongoConnection from './src/db/initMongoConnection';

dotenv.config();

const PORT = process.env.PORT || 4000;

initMongoConnection();

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ req }),
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
