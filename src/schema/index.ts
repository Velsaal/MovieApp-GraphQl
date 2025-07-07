import { makeSchema } from 'nexus';
import { Query } from './queries';
import { Mutation } from './mutations';
import { Movie } from './types/Movie';
import { DeleteMovie } from './mutations';

export const schema = makeSchema({
  types: [Query, Mutation, Movie, DeleteMovie],
}) 