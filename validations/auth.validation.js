const Joi = require('joi');

const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)  
        .required()
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
        }),
    role: Joi.string().valid('user', 'admin').default('user')
});

const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()  // Don't validate strength on login
});

module.exports = {
    registerUserSchema,
    loginUserSchema
};