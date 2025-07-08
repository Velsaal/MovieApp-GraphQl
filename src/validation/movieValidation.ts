import Joi from 'joi';

function releaseDescription(value: any, helpers: any){
    const currentYear = new Date().getFullYear();
    if (value.year > currentYear) {
        const requiredNote = `in ${value.year} was released`;
        if (!value.description.includes(requiredNote)) {
            return helpers.message({ custom: 'description must include the year of release' });
        }
    }
    return value;
}

export const movieValidation = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  rating: Joi.number().min(0.1).max(10).required(),
  description: Joi.string().max(1000).allow(''),
  director: Joi.string().max(100).allow(''),
  year: Joi.number().min(1928).required(),
  genre: Joi.string().max(100).allow(''),
}).custom(releaseDescription);


export const moviePatchValidation = Joi.object({
    title: Joi.string().min(2).max(100),
    rating: Joi.number().min(0.1).max(10),
    description: Joi.string().max(1000).allow(''),
    director: Joi.string().max(100).allow(''),
    year: Joi.number().min(1928),
    genre: Joi.string().max(100).allow(''),
  }).custom(releaseDescription);