import { Cart } from '../models/index.js';

export const getCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }
    return cart;
};

export const addToCart = async (userId, productId, quantity) => {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
        existingItem.qty += quantity; // Increment by the provided quantity
    } else {
        cart.items.push({ product: productId, qty: quantity }); // Use `quantity` here
    }

    return await cart.save();
};


export const removeFromCart = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error('Cart not found');

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    return await cart.save();
};

export const clearCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error('Cart not found');

    cart.items = [];
    return await cart.save();
};
