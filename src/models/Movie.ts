import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
title: String,
rating: Number,
description: String,
year: Number,
director: String,
genre: String,
}, { timestamps: true });

export const Movie = mongoose.model('Movie', movieSchema, 'movies');