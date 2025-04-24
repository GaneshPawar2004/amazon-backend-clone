import { Order } from '../models/index.js';
import User from '../models/User.js';

export const getUserDashboardData = async (userId) => {
    const orders = await Order.find({ user: userId });

    const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const orderSummary = orders.map(order => ({
        orderId: order._id,
        status: order.status,
        total: order.totalPrice,
        createdAt: order.createdAt
    }));

    // Add wishlist logic if implemented (assuming user has a wishlist field)
    const user = await User.findById(userId).populate('wishlist', 'name price image');
    const wishlist = user?.wishlist || [];

    return {
        totalOrders: orders.length,
        totalSpent,
        orders: orderSummary,
        wishlist
    };
};

export const addToWishlistService = async (userId, productId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    if (!user.wishlist.includes(productId)) {
        user.wishlist.push(productId);
        await user.save();
    }

    return await user.populate('wishlist', 'name price image');
};

export const removeFromWishlistService = async (userId, productId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    user.wishlist = user.wishlist.filter(id => id.toString() !== productId.toString());
    await user.save();

    return await user.populate('wishlist', 'name price image');
};