import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  emailVerified: z.boolean(),
  name: z.string().nullable().optional(),
  image: z.string().url().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const sessionSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  expiresAt: z.date(),
  createdAt: z.date()
});

export const accountSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  providerId: z.string().min(1),
  providerAccountId: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const verificationSchema = z.object({
  id: z.string().min(1),
  identifier: z.string().min(1),
  token: z.string().min(1),
  expiresAt: z.date()
});
