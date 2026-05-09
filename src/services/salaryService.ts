import prisma from "@/lib/prisma";
import { SalaryQuery } from "@/validators/salary";

export class SalaryService {
  static async getSalaries(query: SalaryQuery) {
    const { company, role, location, minTotalComp, maxTotalComp, experienceYears, page, limit } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (company) {
      where.company = { contains: company, mode: "insensitive" };
    }

    if (role) {
      where.role = { contains: role, mode: "insensitive" };
    }

    if (location) {
      where.location = { contains: location, mode: "insensitive" };
    }

    if (minTotalComp || maxTotalComp) {
      where.totalCompensation = {};
      if (minTotalComp) where.totalCompensation.gte = minTotalComp;
      if (maxTotalComp) where.totalCompensation.lte = maxTotalComp;
    }

    if (experienceYears !== undefined) {
      where.experienceYears = { gte: experienceYears };
    }

    const [salaries, total] = await Promise.all([
      prisma.salary.findMany({
        where,
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

  static async createSalary(data: any) {
    const totalCompensation = data.baseSalary + (data.bonus || 0) + (data.stock || 0);
    
    return prisma.salary.create({
      data: {
        ...data,
        totalCompensation,
      },
    });
  }
}
