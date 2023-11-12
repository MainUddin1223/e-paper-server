import Joi from 'joi';

export const createAdminSchema = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
});
