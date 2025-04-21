import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByAdmin,
} from '../services/index.js';

// @desc Create product
export const createProductController = async (req, res) => {
    try {
        const product = await createProduct(req.body, req.user._id);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc Get all products
export const getProductsController = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// @desc Get single product
export const getProductController = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

//@desc GET MY PRODUCT
export const getMyProducts = async (req, res) => {
    try {
        const products = await getProductsByAdmin(req.user._id);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Update product
export const updateProductController = async (req, res) => {
    try {
        const product = await updateProduct(req.params.id, req.body, req.user._id);
        res.json(product);
    } catch (err) {
        res.status(err.statusCode || 400).json({ message: err.message });
    }
};

// @desc Delete product

export const deleteProductController = async (req, res) => {
    try {
        const result = await deleteProduct(req.params.id, req.user._id);
        res.json(result);
    } catch (err) {
        res.status(err.statusCode || 400).json({ message: err.message });
    }
};
