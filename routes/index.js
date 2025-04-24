import express from 'express';
import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';
import cartRoutes from './cartRoutes.js';
import orderRoutes from './orderRoutes.js';
import adminRoutes from './adminRoutes.js';
import userRoutes from './userRoutes.js'; // 👈 Import user routes

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);        // 👈 Mount cart routes
router.use('/orders', orderRoutes);     // 👈 Mount order routes
router.use('/admin', adminRoutes);
router.use('/users', userRoutes);     // 👈 Mount user routes

export default router;
