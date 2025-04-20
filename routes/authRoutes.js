import express from 'express';
import { register, login } from '../controllers/index.js';
import { protect } from '../middlewares/index.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Protected route
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'Welcome to protected route', user: req.user });
});

export default router;
