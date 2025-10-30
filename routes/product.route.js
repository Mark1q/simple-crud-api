const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controller/product.controller.js');
const { auth } = require('../middlware/authentication.js');
const { authorize } = require('../middlware/authorize.js');

router.get('/', getProducts);
router.get('/:id', getProduct);

router.post('/', auth, authorize('admin'), createProduct);

// update a product

router.put('/:id', auth, authorize('user'), updateProduct);

// delete a product

router.delete('/:id', auth, authorize('admin'), deleteProduct);

module.exports = router;
