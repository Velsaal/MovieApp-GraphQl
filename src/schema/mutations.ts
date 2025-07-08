import { objectType, mutationType, stringArg, floatArg, intArg, nonNull } from 'nexus';
import { movieValidation, moviePatchValidation } from '../validation/movieValidation';
import { registerUser, loginUser } from '../auth/authController';
import { Movie } from '../models/Movie';

export const DeleteMovie = objectType({
  name: 'DeleteMovie',
  definition(t) {
    t.boolean('success');
  },
});

export const Mutation = mutationType({  
  definition(t) {
    t.field('register', {
      type: 'User',
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { username, password }) => {
        const user = await registerUser(username, password);
        return user;
      },
    })
    t.field('login', {
      type: 'String',
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { username, password }) => {
        const token = await loginUser(username, password);
        return token;
      },
    })

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
      resolve: async (_, { title, rating, description, director, year, genre }, ctx) => {
        if (!ctx.userId) {
          throw new Error('Not authenticated');
        }
        const { error } = movieValidation.validate({ title, rating, description, director, year, genre });
        if (error) {
          throw new Error('Validation error:' + error.details[0].message);
        }
        const movie = new Movie({
        title: title,
        rating: rating,
        description: description,
        director: director,
        year: year,
        genre: genre,
        userId: ctx.userId,
        })
      await movie.save()
      return movie
    },

    })
    t.field('updateMovie', {
      type: 'Movie',
      args: {
        id: nonNull(stringArg()),
        title: stringArg(),
        rating: floatArg(),
        description: stringArg(),
        director: stringArg(),
        year: intArg(),
        genre: stringArg(),
      },
      resolve: async (_, { id, ...fields }, ctx) => {
        if (!ctx.userId) {
          throw new Error('Not authenticated');
        }
        const updateData: any = {};
        for (const key in fields) {
          if (fields[key] !== undefined) updateData[key] = fields[key];
        }
        if (Object.keys(updateData).length > 0) {
          const { error } = moviePatchValidation.validate(updateData, { presence: 'optional' });
          if (error) {
            throw new Error('Validation error: ' + error.details[0].message);
          }
        }
        const updated = await Movie.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) throw new Error('Movie not found');
        return updated;
      },
    });

    t.field('deleteMovie', {
      type: 'DeleteMovie',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx) => {
        if (!ctx.userId) {
          throw new Error('Not authenticated');
        }
        const deleted = await Movie.findByIdAndDelete(id)
        return { success: deleted ? true : false };
      },
    })
  },
})
