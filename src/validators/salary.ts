import { z } from "zod";

export const salaryQuerySchema = z.object({
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  location: z.string().optional(),
  minBaseSalary: z.coerce.number().optional(),
  maxBaseSalary: z.coerce.number().optional(),
  yearsExperience: z.coerce.number().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(20),
});

export type SalaryQuery = z.infer<typeof salaryQuerySchema>;

export const salaryCreateSchema = z.object({
  companyName: z.string().min(2),
  jobTitle: z.string().min(2),
  level: z.string().optional(),
  baseSalary: z.number().positive(),
  bonus: z.number().nonnegative().optional(),
  stock: z.number().nonnegative().optional(),
  location: z.string().min(2),
  yearsExperience: z.number().nonnegative(),
  yearsAtCompany: z.number().nonnegative().optional(),
  employmentType: z.enum(["Full-time", "Contract", "Internship", "Part-time"]).default("Full-time"),
  currency: z.string().length(3).default("USD"),
});
