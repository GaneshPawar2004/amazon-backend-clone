import express from 'express';
import { getUserDashboard,addToWishlistController,removeFromWishlistController, } from '../controllers/index.js';
import { protect } from '../middlewares/index.js';

const router = express.Router();

router.get('/dashboard', protect, getUserDashboard);
router.post('/wishlist/:productId', protect, addToWishlistController);
router.delete('/wishlist/:productId', protect, removeFromWishlistController);

export default router;
