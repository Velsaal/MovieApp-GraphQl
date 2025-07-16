import { makeSchema } from 'nexus';
import { Query } from './queries';
import { Mutation } from './mutations';
import { Movie } from './types/movie/object';
import { User } from './types/user/object';
import { DeleteMovie } from './types/movie/mutation';

export const schema = makeSchema({
  types: [Query, Mutation, User, Movie, DeleteMovie],
}) 