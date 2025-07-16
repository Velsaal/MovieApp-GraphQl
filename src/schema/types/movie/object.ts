import { objectType } from "nexus";

export const Movie = objectType({
    name: 'Movie',
    definition(t) {
        t.string('id')
        t.string('title')
        t.float('rating')
        t.string('description')
        t.string('director')
        t.int('year')
        t.string('genre')
        t.string('createdAt', {
            resolve: (parent) => parent.createdAt ? new Date(parent.createdAt).toISOString() : null,
        })
        t.string('updatedAt', {
            resolve: (parent) => parent.updatedAt ? new Date(parent.updatedAt).toISOString() : null,
        })
        t.string('userId')
        t.string('posterUrl')
    }
}) 