import { z } from "zod";

export const salaryQuerySchema = z.object({
  company: z.string().optional(),
  role: z.string().optional(),
  location: z.string().optional(),
  minTotalComp: z.coerce.number().optional(),
  maxTotalComp: z.coerce.number().optional(),
  experienceYears: z.coerce.number().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(20),
});

export type SalaryQuery = z.infer<typeof salaryQuerySchema>;

export const salaryCreateSchema = z.object({
  company: z.string().min(2),
  role: z.string().min(2),
  level: z.string().optional(),
  location: z.string().min(2),
  experienceYears: z.number().nonnegative(),
  baseSalary: z.number().positive(),
  bonus: z.number().nonnegative().default(0),
  stock: z.number().nonnegative().default(0),
  confidenceScore: z.number().min(0).max(1).default(0),
});
