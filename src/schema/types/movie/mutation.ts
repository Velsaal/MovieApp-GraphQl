import { stringArg, floatArg, intArg, nonNull, objectType } from 'nexus';
import prisma from '../../../db/prisma';


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
    resolve: async (_: any, args: any, ctx: any) => {
      const movie = await prisma.movie.create({
        data: {
          ...args,
          userId: ctx.user.id,
        }
      });
      return movie;
    },
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
    resolve: async (_: any, { id, ...args }: any, ctx: any) => {
      const updated = await prisma.movie.updateMany({
        where: { id, userId: ctx.user.id },
        data: args
      });
      if (updated.count === 0) {
        throw new Error('Movie not found');
      }
      return await prisma.movie.findUnique({ where: { id } });
    },
  },

  deleteMovie: {
    type: 'DeleteMovie',
    args: {
      id: nonNull(stringArg()),
    },
    resolve: async (_: any, { id }: any, ctx: any) => {
      const deleted = await prisma.movie.deleteMany({
        where: { id, userId: ctx.user.id }
      });
      if (deleted.count === 0) {
        throw new Error('Movie not found');
      }
      return { success: true };
    },
  }
}