import { z } from "zod";

/**
 * Normalizes company names for consistency
 * Trims whitespace and ensures consistent casing
 */
const normalizeCompanyName = (val: string) => 
  val.trim().split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

// Core Salary Validator
export const salaryCreateSchema = z.object({
  company: z.string()
    .min(1, "Company name is required")
    .transform(normalizeCompanyName),
  
  role: z.string()
    .min(1, "Role is required")
    .trim(),
  
  level: z.string()
    .trim()
    .optional(),
  
  location: z.string()
    .min(1, "Location is required")
    .trim(),
  
  experienceYears: z.number({
    required_error: "Experience years is required",
    invalid_type_error: "Experience years must be a number",
  })
    .nonnegative("Experience cannot be negative"),
  
  baseSalary: z.number({
    required_error: "Base salary is required",
  })
    .positive("Salary must be greater than 0"),
  
  bonus: z.number()
    .nonnegative("Bonus cannot be negative")
    .default(0),
  
  stock: z.number()
    .nonnegative("Stock cannot be negative")
    .default(0),
  
  confidenceScore: z.number()
    .min(0, "Confidence score must be at least 0")
    .max(1, "Confidence score cannot exceed 1")
    .default(0),
});

// Search Query Validator
export const salaryQuerySchema = z.object({
  search: z.string().trim().optional(),
  company: z.string().trim().optional(),
  role: z.string().trim().optional(),
  level: z.string().trim().optional(),
  location: z.string().trim().optional(),
  minTotalComp: z.coerce.number().nonnegative().optional(),
  maxTotalComp: z.coerce.number().nonnegative().optional(),
  experienceYears: z.coerce.number().nonnegative().optional(),
  sortBy: z.enum(["totalCompensation", "experienceYears", "createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

// Types derived from schemas
export type SalaryCreateInput = z.infer<typeof salaryCreateSchema>;
export type SalaryQueryInput = z.infer<typeof salaryQuerySchema>;
