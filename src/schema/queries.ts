import { queryType } from 'nexus';
import { movieQueries } from './types/movie/query';

export const Query = queryType({
  definition(t) {
    t.list.field('movies', {
      type: 'Movie',
      resolve: movieQueries.movies.resolve,
    });
    t.field('movie', movieQueries.movie);
  }
}) 