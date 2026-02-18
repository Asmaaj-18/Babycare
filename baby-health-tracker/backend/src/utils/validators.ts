import { z } from 'zod';

// ======================
// AUTH VALIDATORS
// ======================

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  role: z.enum(['PARENT', 'MEDECIN']), // 👈 aligné avec Prisma
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// ======================
// BABY VALIDATORS
// ======================

export const createBabySchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  birthDate: z.string().datetime(),
  gender: z.string().min(1),
});

// ======================
// SLEEP VALIDATORS
// ======================

export const createSleepRecordSchema = z.object({
  babyId: z.string().uuid(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
});

// ======================
// GROWTH VALIDATORS
// ======================

export const createGrowthRecordSchema = z.object({
  babyId: z.string().uuid(),
  recordDate: z.string().datetime(),
  weightKg: z.number().positive(),
  heightCm: z.number().positive(),
});

// ======================
// VACCINE VALIDATORS
// ======================

export const createVaccineRecordSchema = z.object({
  babyId: z.string().uuid(),
  name: z.string().min(1),
  administeredDate: z.string().datetime().optional(),
  nextDueDate: z.string().datetime().optional(),
});

// ======================
// TYPES
// ======================

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateBabyInput = z.infer<typeof createBabySchema>;
export type CreateSleepRecordInput = z.infer<typeof createSleepRecordSchema>;
export type CreateGrowthRecordInput = z.infer<typeof createGrowthRecordSchema>;
export type CreateVaccineRecordInput = z.infer<typeof createVaccineRecordSchema>;
