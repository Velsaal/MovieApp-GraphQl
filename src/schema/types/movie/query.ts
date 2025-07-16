import { stringArg, nonNull } from 'nexus';
import prisma from '../../../db/prisma';
import { requireAuth } from '../../../middleware/requireAuth';

export const movieQueries = {
  movies: {
    resolve: requireAuth(async (_: any, __: any, ctx: any) => {
      return await prisma.movie.findMany({
        where: { userId: ctx.user.id }
      });
    }),
  },
  
  movie: {
    type: 'Movie',
    args: { id: nonNull(stringArg()) },
    resolve: requireAuth(async (_: any, { id }: any) => {
      return await prisma.movie.findFirst({
        where: { id }
      });
    }),
  }
} 