import express from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);
router.get('/profile', authenticate, getProfile);

export default router;