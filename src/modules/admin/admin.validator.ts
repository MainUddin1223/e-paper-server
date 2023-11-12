import Joi from 'joi';

export const createPageSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.pattern.base': 'Invalid title',
    'any.required': 'Title is required',
  }),
  pageId: Joi.number().required().messages({
    'string.pattern.base': 'Invalid pageId',
    'any.required': 'Page id is required',
  }),
  newsDate: Joi.date().required().messages({
    'string.pattern.base': 'Invalid news date',
    'any.required': 'News date is required',
  }),
  pageImg: Joi.string().optional().messages({
    'string.pattern.base': 'Invalid page image',
  }),
});
