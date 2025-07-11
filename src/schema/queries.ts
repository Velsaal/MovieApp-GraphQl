import { queryType, intArg } from 'nexus';
import prisma from '../db/prisma';

export const Query = queryType({
  definition(t) {
    t.string('hello', {
      resolve: () => 'Hello from Nexus!',
    })
    
    t.list.field('movies', {
      type: 'Movie',
      resolve: async (_, __, ctx) => {
        if (!ctx.userId) {
          throw new Error('Not authenticated');
        }
        return await prisma.movie.findMany({ 
          where: { userId: ctx.userId } 
        });
      },
    });
    
    t.field('movie', {
      type: 'Movie',
      args: { id: intArg() },
      resolve: async (_, { id }, ctx) => {
        if (!ctx.userId) {
          throw new Error('Not authenticated');
        }
        return await prisma.movie.findFirst({
          where: { 
            id: id.toString(),
            userId: ctx.userId 
          }
        });
      },
    });
  }
}) 