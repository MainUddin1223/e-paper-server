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

export const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('^\\S+@\\S+\\.\\S+$'))
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().required().messages({
    'string.pattern.base': 'Invalid password',
    'any.required': 'Password is required',
  }),
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    'string.pattern.base': 'Invalid old password',
    'any.required': 'Old password is required',
  }),
  newPassword: Joi.string().required().messages({
    'string.pattern.base': 'Invalid new password',
    'any.required': 'New password is required',
  }),
  confirmPassword: Joi.string().required().messages({
    'string.pattern.base': 'Invalid confirm password',
    'any.required': 'Confirm password is required',
  }),
});
