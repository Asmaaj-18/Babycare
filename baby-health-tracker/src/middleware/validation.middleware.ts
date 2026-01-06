import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: z.ZodObject<any>) => 
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('Validation middleware called for path:', req.path);
    console.log('Request body:', req.body);
    
    try {
      // Valider req.body directement
      const result = await schema.parseAsync(req.body);
      console.log('Validation passed:', result);
      
      // Stocker les données validées dans req.validatedData
      (req as any).validatedData = result;
      next();
    } catch (error: unknown) {
      console.log('Validation error:', error);
      if (error instanceof ZodError) {
        // ZodError a une propriété 'errors' dans les versions récentes
        const zodError = error as ZodError;
        const errors = 'errors' in zodError ? (zodError as any).errors : zodError.issues || [];
        
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errors.map((err: any) => ({
            field: err.path?.join('.') || 'unknown',
            message: err.message || 'Validation error',
          })),
        });
      }
      
      // Pour d'autres erreurs
      next(error);
    }
  };
