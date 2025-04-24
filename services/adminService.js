import { User, Order } from '../models/index.js';

export const getAdminStats = async () => {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    const ordersByStatus = {
        Pending: orders.filter(o => o.status === 'Pending').length,
        Shipped: orders.filter(o => o.status === 'Shipped').length,
        Delivered: orders.filter(o => o.status === 'Delivered').length
    };

    return {
        totalUsers,
        totalOrders,
        totalRevenue,
        ordersByStatus
    };
};
