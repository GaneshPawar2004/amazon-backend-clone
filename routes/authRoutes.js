import express from 'express';
import { register, login, updateProfile, forgotPassword, updateUser, deleteUser } from '../controllers/index.js';
import { protect } from '../middlewares/index.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Protected route
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'Welcome to protected route', user: req.user });
});

// Forgot password route (structure only)
router.post('/forgot-password', forgotPassword);

// Update profile route
router.put('/profile', protect, updateProfile);

// Admin routes
router.put('/admin/user/:id', protect, isAdmin, updateUser);  // Admin can update any user
router.delete('/admin/user/:id', protect, isAdmin, deleteUser);  // Admin can delete any user

export default router;
