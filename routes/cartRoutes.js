import express from 'express';
import {
    getCartController,
    addToCartController,
    removeFromCartController,
    clearCartController,
} from '../controllers/index.js';
import { protect } from '../middlewares/index.js';

const router = express.Router();

router.get('/', protect, getCartController);
router.post('/', protect, addToCartController);
router.delete('/clear', protect, clearCartController);
router.delete('/:productId', protect, removeFromCartController);

export default router;
