import { AuthenticationError } from "apollo-server";

export const requireAuth = (resolver: any) => {
return (parent: any, args: any, ctx: any, info: any) => {
    if (!ctx.userId) {
        throw new AuthenticationError('Not authenticated');
    }
    return resolver(parent, args, ctx, info);
  };
};