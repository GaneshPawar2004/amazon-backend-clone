import { Order, Cart } from '../models/index.js';

export const placeOrder = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) throw new Error('Cart is empty');

    const totalPrice = cart.items.reduce((acc, item) => {
        return acc + item.qty * item.product.price;
    }, 0);

    const order = await Order.create({
        user: userId,
        items: cart.items.map(item => ({
            product: item.product._id,
            qty: item.qty
        })),
        totalPrice,
    });

    cart.items = [];
    await cart.save();

    return order;
};

export const getMyOrders = async (userId) => {
    return await Order.find({ user: userId }).populate('items.product');
};

export const getAllOrders = async () => {
    return await Order.find().populate('user', 'name email').populate('items.product');
};

// ✅ Get order by ID (admin/user)
export const getOrderById = async (orderId) => {
    const order = await Order.findById(orderId).populate('user', 'name email').populate('items.product');
    if (!order) throw new Error('Order not found');
    return order;
};

// ✅ Update order status (admin only)
export const updateOrderStatus = async (orderId, status) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found');

    order.status = status;
    return await order.save();
};

// ✅ Delete an order (admin only)
export const deleteOrder = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found');

    return await order.deleteOne();
};

export const getUserOrderHistory = async (userId) => {
    return await Order.find({ user: userId }).sort({ createdAt: -1 });
};