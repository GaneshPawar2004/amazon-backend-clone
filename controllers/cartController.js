import {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
} from '../services/index.js';

// @desc Get user cart
export const getCartController = async (req, res) => {
    try {
        const cart = await getCart(req.user._id);
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Add product to cart
export const addToCartController = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const cart = await addToCart(req.user._id, productId, quantity);
        res.json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc Remove product from cart
export const removeFromCartController = async (req, res) => {
    try {
        const cart = await removeFromCart(req.user._id, req.params.productId);
        res.json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc Clear cart
export const clearCartController = async (req, res) => {
    try {
        const cart = await clearCart(req.user._id);
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
