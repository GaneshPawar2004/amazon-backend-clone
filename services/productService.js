import { Product } from '../models/index.js';

// CREATE PRODUCT
export const createProduct = async (productData, userId) => {
    const product = new Product({ ...productData, createdBy: userId });
    return await product.save();
};

// GET ALL PRODUCTS
export const getAllProducts = async () => {
    return await Product.find().populate('createdBy', 'name email');
};

// GET PRODUCT BY ID
export const getProductById = async (id) => {
    return await Product.findById(id).populate('createdBy', 'name email');
};

//GET PRODUCT BY ADMIN
export const getProductsByAdmin = async (adminId) => {
    return await Product.find({ createdBy: adminId });
};

// UPDATE PRODUCT - only by owner
export const updateProduct = async (id, updateData, userId) => {
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');

    if (product.createdBy.toString() !== userId.toString()) {
        const err = new Error('Access denied: Only owner can update this product');
        err.statusCode = 403;
        throw err;
    }

    Object.assign(product, updateData);
    return await product.save();
};

// DELETE PRODUCT - only by owner
export const deleteProduct = async (id, userId) => {
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');

    if (product.createdBy.toString() !== userId.toString()) {
        const err = new Error('Access denied: Only owner can delete this product');
        err.statusCode = 403;
        throw err;
    }

    await product.deleteOne();
    return { message: 'Product deleted successfully' };
};
