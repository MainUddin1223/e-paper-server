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

export const createNewsSchema = Joi.object({
  order: Joi.number().required().messages({
    'string.pattern.base': 'Invalid order',
    'any.required': 'Order is required',
  }),
  pageId: Joi.number().required().messages({
    'string.pattern.base': 'Invalid pageId',
    'any.required': 'Page id is required',
  }),
  referencePage: Joi.number().required().messages({
    'string.pattern.base': 'Invalid reference page id',
    'any.required': 'Reference page id is required',
  }),
});

export const updateNewsSchema = Joi.object({
  order: Joi.number().optional().messages({
    'string.pattern.base': 'Invalid order',
  }),
  pageId: Joi.number().optional().messages({
    'string.pattern.base': 'Invalid pageId',
  }),
  referencePage: Joi.number().optional().messages({
    'string.pattern.base': 'Invalid reference page id',
  }),
  images: Joi.array().items(Joi.string().optional()).optional().messages({
    'array.base': 'Images must be an array',
    'string.pattern.base': 'Invalid image in the array',
  }),
});
