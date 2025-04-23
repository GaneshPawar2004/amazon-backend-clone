import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Get the cart for a user
export const getCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }
    return cart;
};

// Add or update product in the cart
export const addToCart = async (userId, productId, quantity) => {
    if (quantity <= 0) throw new Error('Quantity must be greater than 0');

    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
        existingItem.qty += quantity;
    } else {
        cart.items.push({ product: productId, qty: quantity });
    }

    await cart.save();
    return await cart.populate('items.product');
};

// Remove a specific product from cart
export const removeFromCart = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error('Cart not found');

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    return await cart.populate('items.product');
};

// Clear the cart
export const clearCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error('Cart not found');

    cart.items = [];
    await cart.save();
    return await cart.populate('items.product');
};
