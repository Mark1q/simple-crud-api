const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controller/product.controller.js');
const { auth } = require('../middleware/authentication.js');
const { authorize } = require('../middleware/authorize.js');
const { validate } = require('./../middleware/validate.js');
const { createProductSchema, updateProductSchema } = require('./../validations/product.validation.js');


router.get('/', getProducts);
router.get('/:id', getProduct);

router.post('/', auth, authorize('admin'), validate(createProductSchema),  createProduct);

// update a product

router.put('/:id', auth, authorize('user'), validate(updateProductSchema), updateProduct);

// delete a product

router.delete('/:id', auth, authorize('admin'), deleteProduct);

module.exports = router;
