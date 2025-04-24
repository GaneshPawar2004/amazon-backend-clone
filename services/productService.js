import { Product } from '../models/index.js';
import User from '../models/User.js';

// CREATE PRODUCT
export const createProduct = async (productData, userId) => {
    const product = new Product({ ...productData, createdBy: userId });
    return await product.save();
};

// GET ALL PRODUCTS
// GET ALL PRODUCTS with search, filter, sort, and pagination
export const getAllProducts = async (queryParams) => {
    const { keyword, category, sortBy, sortOrder, page = 1, limit = 10 } = queryParams;

    const filter = {};

    // Search by name
    if (keyword) {
        filter.name = { $regex: keyword, $options: 'i' }; // case-insensitive
    }

    // Filter by category
    if (category) {
        filter.category = category;
    }

    // Sorting logic
    let sortOptions = {};
    if (sortBy) {
        const order = sortOrder === 'desc' ? -1 : 1;
        sortOptions[sortBy] = order;
    }

    // Pagination logic
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(filter)
        .populate('createdBy', 'name email')
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    return {
        products,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalProducts: total,
    };
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

// Add a review to a product
export const addProductReview = async (userId, productId, rating, comment) => {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === userId.toString()
    );
    if (alreadyReviewed) {
        throw new Error('Product already reviewed by this user');
    }

    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const review = {
        user: userId,
        name: user.name,
        rating: Number(rating),
        comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
        product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.numReviews;

    return await product.save();
};

// Get all reviews for a product
export const getProductReviews = async (productId) => {
    const product = await Product.findById(productId).select('reviews');
    if (!product) throw new Error('Product not found');

    return product.reviews;
};