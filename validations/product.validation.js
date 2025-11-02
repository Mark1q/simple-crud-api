const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(0).default(0),
  image: Joi.string().uri().optional()
});

module.exports = {
  createProductSchema
}