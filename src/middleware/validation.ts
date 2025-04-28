import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { authorExists } from '../services/bookService';

// authorSchema for creation (all required)
export const createAuthorSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
  }),
  bio: Joi.string().allow(null, ''),
  birthdate: Joi.date().required().messages({
    'date.base': 'Birthdate must be a valid date',
    'any.required': 'Birthdate is required',
  }),
});

// authorSchema for updates (all optional)
export const updateAuthorSchema = Joi.object({
  name: Joi.string().messages({
    'string.empty': 'Name cannot be empty',
  }),
  bio: Joi.string().allow(null, ''),
  birthdate: Joi.date().messages({
    'date.base': 'Birthdate must be a valid date',
  }),
});

export const createBookSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required',
  }),
  description: Joi.string().allow(null, ''),
  published_date: Joi.date().required().messages({
    'date.base': 'Published date must be a valid date',
    'any.required': 'Published date is required',
  }),
  author_id: Joi.number().integer().required().messages({
    'number.base': 'Author ID must be a number',
    'any.required': 'Author ID is required',
  }),
});

export const updateBookSchema = Joi.object({
  title: Joi.string().messages({
    'string.empty': 'Title cannot be empty',
  }),
  description: Joi.string().allow(null, ''),
  published_date: Joi.date().messages({
    'date.base': 'Published date must be a valid date',
  }),
  author_id: Joi.number().integer().messages({
    'number.base': 'Author ID must be a number',
  }),
});

type ValidatorOptions = {
  checkAuthorExists?: boolean;
};

export const validateRequest = (schema: Joi.ObjectSchema, options: ValidatorOptions = {}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

    if (options.checkAuthorExists && req.body.author_id !== undefined) {
      const exists = await authorExists(req.body.author_id);
      if (!exists) {
        return res.status(400).json({ errors: ['Author with the provided ID does not exist'] });
      }
    }

    next();
  };
};
