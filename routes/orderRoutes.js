import express from 'express';
import {
    placeOrderController,
    getMyOrdersController,
    getAllOrdersController,
    getOrderByIdController,
    updateOrderStatusController,
    deleteOrderController
} from '../controllers/index.js';
import { protect, isAdmin } from '../middlewares/index.js';

const router = express.Router();

// USER ROUTES
router.post('/', protect, placeOrderController);                // Place order from cart
router.get('/my', protect, getMyOrdersController);              // Get my orders

// ADMIN ROUTES
router.get('/', protect, isAdmin, getAllOrdersController);      // Get all orders
router.get('/:orderId', protect, isAdmin, getOrderByIdController);  // Get single order by ID
router.patch('/:orderId', protect, isAdmin, updateOrderStatusController); // Update order status
router.delete('/:orderId', protect, isAdmin, deleteOrderController);     // Delete order

export default router;
