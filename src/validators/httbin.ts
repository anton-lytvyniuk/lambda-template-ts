/* eslint-disable import/prefer-default-export */
import { Joi } from 'express-validation';

export const get = {
  query: Joi.object({
    somefield: Joi.string(),
  }),
};
