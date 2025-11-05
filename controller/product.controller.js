const Product = require('../models/product.model.js')
const { validateSortQueries } = require('../utils/queryHelper.js')

const getProducts = async (req, res) => {
    try {
        const { page, limit, skip } = req.pagination;
        const { search, minPrice, maxPrice, inStock } = req.query;

        const filter = {
            ...(inStock && {
                quantity: {
                    $gt: 0 // in stock
                },
            }),
            ...(search && {
                name: {
                    $regex: search, 
                    $options: 'i' // case insensitive
                }
            }),
            ...((minPrice || maxPrice) && { 
                price: {
                    ...(minPrice && { $gte: Number(minPrice) }),
                    ...(maxPrice && { $lte: Number(maxPrice) }),
                }
            }),
        };
        
        const sort = validateSortQueries(req.query);
        const products = await Product.find(filter).skip(skip).limit(limit).sort(sort);
        const total = await Product.countDocuments();

        res.status(200).json({
            total,
            page,
            pages: Math.ceil(total / limit),
            data: products
        });
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({message: "Product not found"});
        }
        
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            res.send(404).json({message: "Product not found"});
        }

        res.status(200).json({message: "Product deleted succesfully!"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}