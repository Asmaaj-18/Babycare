import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { registerSchema, loginSchema } from '../utils/validators';
import { AuthRequest } from '../middleware/auth.middleware';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {   
    try {
      // req.body est déjà validé par le middleware
      const { email, password, firstName, lastName, userType } = req.body;
      
      const result = await authService.register(
        email,
        password,
        firstName,
        lastName,
        userType
      );

      res.status(201).json({
        status: 'success',
        data: result,
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      res.status(error.statusCode || 500).json({  
        status: 'error',
        message: error.message || 'Registration failed',
      });
    }
  }

  async login(req: Request, res: Response) {      
    try {
      // req.body est déjà validé par le middleware
      const { email, password } = req.body;
      
      const result = await authService.login(
        email,
        password
      );

      res.json({
        status: 'success',
        data: result,
      });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(error.statusCode || 500).json({  
        status: 'error',
        message: error.message || 'Login failed', 
      });
    }
  }

  async getCurrentUser(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          status: 'error',
          message: 'Not authenticated',
        });
      }

      const user = await authService.getCurrentUser(req.user.id);

      res.json({
        status: 'success',
        data: { user },
      });
    } catch (error: any) {
      console.error('Get current user error:', error);
      res.status(error.statusCode || 500).json({  
        status: 'error',
        message: error.message || 'Failed to get user',
      });
    }
  }
}
