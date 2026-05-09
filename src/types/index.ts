export interface SalaryEntry {
  id: string;
  companyName: string;
  companyId: string;
  jobTitle: string;
  level?: string;
  baseSalary: number;
  bonus?: number;
  stock?: number;
  location: string;
  yearsExperience: number;
  yearsAtCompany?: number;
  employmentType: string;
  currency: string;
  verified: boolean;
  createdAt: Date;
}

export interface Company {
  id: string;
  name: string;
  industry?: string;
  website?: string;
  logoUrl?: string;
  location?: string;
}

export interface SalaryFilters {
  company?: string;
  jobTitle?: string;
  location?: string;
  minBaseSalary?: number;
  maxBaseSalary?: number;
  yearsExperience?: number;
}
