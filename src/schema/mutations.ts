import { mutationType } from 'nexus';
import { movieMutations } from './types/movie/mutation';
import { userMutations } from './types/user/mutation';

export const Mutation = mutationType({
  definition(t) {
    t.field('register', userMutations.register);
    t.field('login', userMutations.login);
    t.field('logout', userMutations.logout);
    
    t.field('createMovie', movieMutations.createMovie);
    t.field('updateMovie', movieMutations.updateMovie);
    t.field('deleteMovie', movieMutations.deleteMovie);
  }
})
