import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validation.middleware';
import { registerSchema, loginSchema } from '../utils/validators';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/register', validate(registerSchema), authController.register.bind(authController));
router.post('/login', validate(loginSchema), authController.login.bind(authController));

// Protected routes (require authentication)
router.get('/me', authenticate, authController.getCurrentUser.bind(authController));

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes are working!' });
});

export default router;
