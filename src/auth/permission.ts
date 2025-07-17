import { rule, shield } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' }) (
    async (parent, args, ctx, info) => {
        return !!ctx.user;
    }
)

export const permissions = shield({
    Query: {
        movies: isAuthenticated,
        movie: isAuthenticated,
    },
    Mutation: {
        createMovie: isAuthenticated,
        updateMovie: isAuthenticated,
        deleteMovie: isAuthenticated,
    }
});