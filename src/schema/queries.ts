import { queryType, intArg } from 'nexus';
import { Movie } from '../models/Movie';

export const Query = queryType({
  definition(t) {
    t.string('hello', {
      resolve: () => 'Hello from Nexus!',
    })
    
    t.list.field('movies', {
      type: 'Movie',
      resolve: async () => {
        return await Movie.find()
      },
    });
    
    t.field('movie', {
      type: 'Movie',
      args: { id: intArg() },
      resolve: async (_, { id }) => {
        return await Movie.findById(id)
      },
    });
  }
}) 