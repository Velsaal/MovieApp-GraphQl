import { stringArg, nonNull } from 'nexus';
import { registerUser, loginUser, logoutUser } from '../../../auth/authController';

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
  },
  
  logout: {
    type: 'Boolean',
    resolve: async (_: any, __: any, ctx: any) => {
      const auth = ctx.req.headers.authorization || '';
      if (auth.startsWith('Bearer ')) {
        const token = auth.replace('Bearer ', '');
        try {
          const { verifyToken } = await import('../../../auth/jwt');
          const decoded = verifyToken(token);
          if (typeof decoded === 'object' && 'sessionId' in decoded) {
            return await logoutUser((decoded as any).sessionId);
          }
        } catch (error) {
          return false;
        }
      }
      return false;
    },
  }
} 