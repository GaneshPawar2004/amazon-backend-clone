import express from 'express';
import {
    createProductController,
    getProductsController,
    getProductController,
    updateProductController,
    deleteProductController,
    getMyProducts 
} from '../controllers/index.js';
import { protect,isAdmin } from '../middlewares/index.js';

const router = express.Router();

// Public routes
router.get('/', getProductsController);
router.get('/mine', protect, isAdmin, getMyProducts);
router.get('/:id', getProductController);

// Protected routes (optional: restrict to admin)
router.post('/', protect, isAdmin,createProductController);
router.put('/:id', protect,isAdmin, updateProductController);
router.delete('/:id', protect,isAdmin, deleteProductController);

export default router;
