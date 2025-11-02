const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(0).default(0),
  image: Joi.string().uri().optional()
}).min(1);

const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  price: Joi.number().positive().optional(),
  quantity: Joi.number().integer().min(0).optional(),
  image: Joi.string().uri().optional()
}).min(1);

module.exports = {
  createProductSchema,
  updateProductSchema
}