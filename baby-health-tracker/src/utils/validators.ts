import { z } from 'zod';

// User validators
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  userType: z.enum(['PARENT', 'HEALTH_PROFESSIONAL', 'CAREGIVER']),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Baby validators
export const createBabySchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  birthDate: z.string().datetime('Invalid date format'),
  birthWeight: z.number().positive('Birth weight must be positive'),
  birthHeight: z.number().positive('Birth height must be positive'),
  gender: z.string().min(1, 'Gender is required'),
});

// Sleep record validators
export const createSleepRecordSchema = z.object({
  babyId: z.string().uuid('Invalid baby ID'),
  startTime: z.string().datetime('Invalid start time'),
  endTime: z.string().datetime('Invalid end time'),
  sleepQuality: z.enum(['good', 'average', 'poor']),
  notes: z.string().optional(),
});

// Feeding record validators
export const createFeedingRecordSchema = z.object({
  babyId: z.string().uuid('Invalid baby ID'),
  type: z.enum(['breast', 'bottle', 'solid']),
  amountMl: z.number().positive().optional(),
  foodDescription: z.string().optional(),
  startTime: z.string().datetime('Invalid start time'),
  endTime: z.string().datetime('Invalid end time'),
  notes: z.string().optional(),
});

// Growth record validators
export const createGrowthRecordSchema = z.object({
  babyId: z.string().uuid('Invalid baby ID'),
  recordDate: z.string().datetime('Invalid record date'),
  weightKg: z.number().positive('Weight must be positive'),
  heightCm: z.number().positive('Height must be positive'),
  headCircumferenceCm: z.number().positive().optional(),
  notes: z.string().optional(),
});

// Vaccine record validators
export const createVaccineRecordSchema = z.object({
  babyId: z.string().uuid('Invalid baby ID'),
  vaccineName: z.string().min(1, 'Vaccine name is required'),
  administeredDate: z.string().datetime('Invalid administered date'),
  nextDueDate: z.string().datetime('Invalid next due date').optional(),
  lotNumber: z.string().optional(),
  notes: z.string().optional(),
});

// Health check validators
export const createHealthCheckSchema = z.object({
  babyId: z.string().uuid('Invalid baby ID'),
  checkDate: z.string().datetime('Invalid check date'),
  healthProfessionalId: z.string().min(1, 'Health professional ID is required'),
  checkType: z.enum(['routine', 'sick', 'emergency']),
  diagnosis: z.string().optional(),
  prescription: z.string().optional(),
  recommendations: z.string().optional(),
});

// Types
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateBabyInput = z.infer<typeof createBabySchema>;
export type CreateSleepRecordInput = z.infer<typeof createSleepRecordSchema>;
export type CreateFeedingRecordInput = z.infer<typeof createFeedingRecordSchema>;
export type CreateGrowthRecordInput = z.infer<typeof createGrowthRecordSchema>;
export type CreateVaccineRecordInput = z.infer<typeof createVaccineRecordSchema>;
export type CreateHealthCheckInput = z.infer<typeof createHealthCheckSchema>;
