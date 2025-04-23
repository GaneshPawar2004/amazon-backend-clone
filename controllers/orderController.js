import { placeOrder, getMyOrders, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } from '../services/index.js';

// @desc Place order from cart
export const placeOrderController = async (req, res) => {
    try {
        const order = await placeOrder(req.user._id);
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc Get logged-in user's orders
export const getMyOrdersController = async (req, res) => {
    try {
        const orders = await getMyOrders(req.user._id);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Get all orders (admin only)
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ @desc Get single order by ID (admin/user)
export const getOrderByIdController = async (req, res) => {
    try {
        const order = await getOrderById(req.params.orderId);
        res.json(order);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// ✅ @desc Update order status (admin only)
export const updateOrderStatusController = async (req, res) => {
    try {
        const order = await updateOrderStatus(req.params.orderId, req.body.status);
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ @desc Delete an order (admin only)
export const deleteOrderController = async (req, res) => {
    try {
        const result = await deleteOrder(req.params.orderId);
        res.json({ message: 'Order deleted successfully', result });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};