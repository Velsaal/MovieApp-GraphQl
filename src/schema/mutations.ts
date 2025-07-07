import { objectType, mutationType, stringArg, floatArg, intArg } from 'nexus';
import { Movie } from '../models/Movie';

export const DeleteMovie = objectType({
  name: 'DeleteMovie',
  definition(t) {
    t.boolean('success');
  },
});

export const Mutation = mutationType({  
  definition(t) {
    t.field('createMovie', {
      type: 'Movie',
      args: {
        title: stringArg(),
        rating: floatArg(),
        description: stringArg(),
        director: stringArg(),
        year: intArg(),
        genre: stringArg(),
      },
      resolve: async (_, { title, rating, description, director, year, genre }) => {
        const movie = new Movie({
        id: Math.floor(Math.random() * 1000),
        title: title,
        rating: rating,
        description: description,
        director: director,
        year: year,
        genre: genre,
        })
      await movie.save()
      return movie
    },
    })
    t.field('deleteMovie', {
      type: 'DeleteMovie',
      args: {
        id: stringArg(),
      },
      resolve: async (_, { id }) => {
        const deleted = await Movie.findByIdAndDelete(id)
        return { success: deleted ? true : false };
      },
    })
  },
})
