import { stringArg, floatArg, intArg, nonNull, objectType } from 'nexus';
import prisma from '../../../db/prisma';
import { requireAuth } from '../../../middleware/requireAuth';

export const DeleteMovie = objectType({
  name: 'DeleteMovie',
  definition(t) {
    t.boolean('success');
  },
});

export const movieMutations = {
  createMovie: {
    type: 'Movie',
    args: {
      title: nonNull(stringArg()),
      rating: nonNull(floatArg()),
      description: stringArg(),
      director: stringArg(),
      year: intArg(),
      genre: stringArg(),
      posterUrl: stringArg(),
    },
    resolve: requireAuth(async (_: any, args: any, ctx: any) => {
      const movie = await prisma.movie.create({
        data: {
          ...args,
          userId: ctx.userId,
        }
      });
      return movie;
    }),
  },

  updateMovie: {
    type: 'Movie',
    args: {
      id: nonNull(stringArg()),
      title: stringArg(),
      rating: floatArg(),
      description: stringArg(),
      director: stringArg(),
      year: intArg(),
      genre: stringArg(),
      posterUrl: stringArg(),
    },
    resolve: requireAuth(async (_: any, { id, ...args }: any) => {
      const movie = await prisma.movie.update({
        where: { id },
        data: args
      });
      return movie;
    }),
  },

  deleteMovie: {
    type: 'DeleteMovie',
    args: {
      id: nonNull(stringArg()),
    },
    resolve: requireAuth(async (_: any, { id }: any) => {
      await prisma.movie.delete({
        where: { id }
      });
      return { success: true };
    }),
  }
} 