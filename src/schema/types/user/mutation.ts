import { stringArg, nonNull } from 'nexus';
import { registerUser, loginUser } from '../../../auth/authController';

export const userMutations = {
  register: {
    type: 'User',
    args: {
      username: nonNull(stringArg()),
      password: nonNull(stringArg()),
    },
    resolve: async (_: any, { username, password }: any) => {
      const user = await registerUser(username, password);
      return user;
    },
  },
  
  login: {
    type: 'String',
    args: {
      username: nonNull(stringArg()),
      password: nonNull(stringArg()),
    },
    resolve: async (_: any, { username, password }: any) => {
      return await loginUser(username, password);
    },
  }
} 