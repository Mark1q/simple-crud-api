const express = require('express');

const { registerUser, loginUser, refreshToken, logoutUser } = require('./../controller/auth.controller');
const { validate } = require('./../middleware/validate.js');
const { registerUserSchema, loginUserSchema } = require('./../validations/auth.validation.js');

const router = express.Router();

router.post('/', validate(registerUserSchema), registerUser);
router.post('/login', validate(loginUserSchema), loginUser);
router.post('/logout', logoutUser);
router.post('/refresh', refreshToken);

module.exports = router;