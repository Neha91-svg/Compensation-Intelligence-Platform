import prisma from "@/lib/prisma";
import { SalaryQuery } from "@/validators/salary";

export class SalaryService {
  static async getSalaries(query: SalaryQuery) {
    const { company, jobTitle, location, minBaseSalary, maxBaseSalary, yearsExperience, page, limit } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (company) {
      where.company = {
        name: { contains: company, mode: "insensitive" },
      };
    }

    if (jobTitle) {
      where.jobTitle = { contains: jobTitle, mode: "insensitive" };
    }

    if (location) {
      where.location = { contains: location, mode: "insensitive" };
    }

    if (minBaseSalary || maxBaseSalary) {
      where.baseSalary = {};
      if (minBaseSalary) where.baseSalary.gte = minBaseSalary;
      if (maxBaseSalary) where.baseSalary.lte = maxBaseSalary;
    }

    if (yearsExperience !== undefined) {
      where.yearsExperience = { gte: yearsExperience };
    }

    const [salaries, total] = await Promise.all([
      prisma.salary.findMany({
        where,
        include: { company: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.salary.count({ where }),
    ]);

    return {
      salaries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getStats() {
    const stats = await prisma.salary.aggregate({
      _avg: {
        baseSalary: true,
      },
      _count: {
        id: true,
      },
      _min: {
        baseSalary: true,
      },
      _max: {
        baseSalary: true,
      },
    });

    return stats;
  }
}
