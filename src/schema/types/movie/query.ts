import { stringArg, nonNull } from 'nexus';
import prisma from '../../../db/prisma';

export const movieQueries = {
  movies: {
    resolve: async (_: any, __: any, ctx: any) => {
      return await prisma.movie.findMany({
        where: { userId: ctx.user.id }
      });
    },
  },
  
  movie: {
    type: 'Movie',
    args: { id: nonNull(stringArg()) },
    resolve: async (_: any, { id }: any, ctx: any) => {
      return await prisma.movie.findFirst({
        where: { 
          id,
          userId: ctx.user.id 
        }
      });
    },
  }
} 