import express from 'express';
import { getAdminStatsController } from '../controllers/adminController.js';
import { protect, isAdmin } from '../middlewares/index.js';

const router = express.Router();

// Admin-only stats route
router.get('/stats', protect, isAdmin, getAdminStatsController);

export default router;
