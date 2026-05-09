import prisma from "@/lib/prisma";
import { SalaryQuery } from "@/validators/salary";

export class SalaryService {
  static async getSalaries(query: any) {
    const { 
      search, company, role, level, location, 
      minTotalComp, maxTotalComp, experienceYears, 
      sortBy, sortOrder, page, limit 
    } = query;
    const skip = (page - 1) * limit;

    const where: any = { AND: [] };

    // Search across company and role
    if (search) {
      where.AND.push({
        OR: [
          { company: { contains: search, mode: "insensitive" } },
          { role: { contains: search, mode: "insensitive" } },
        ],
      });
    }

    // Specific Filters
    if (company) where.AND.push({ company: { contains: company, mode: "insensitive" } });
    if (role) where.AND.push({ role: { contains: role, mode: "insensitive" } });
    if (level) where.AND.push({ level: { contains: level, mode: "insensitive" } });
    if (location) where.AND.push({ location: { contains: location, mode: "insensitive" } });

    if (minTotalComp || maxTotalComp) {
      const tc: any = {};
      if (minTotalComp) tc.gte = minTotalComp;
      if (maxTotalComp) tc.lte = maxTotalComp;
      where.AND.push({ totalCompensation: tc });
    }

    if (experienceYears !== undefined) {
      where.AND.push({ experienceYears: { gte: experienceYears } });
    }

    // Optimization: If AND is empty, remove it to simplify query
    if (where.AND.length === 0) delete where.AND;

    const [salaries, total] = await Promise.all([
      prisma.salary.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
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

    // Reject duplicates: Check if same entry exists within the last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const existingEntry = await prisma.salary.findFirst({
      where: {
        company: data.company,
        role: data.role,
        level: data.level,
        location: data.location,
        totalCompensation: totalCompensation,
        createdAt: { gte: oneHourAgo },
      },
    });

    if (existingEntry) {
      throw new Error("Duplicate entry detected. Please wait before submitting again.");
    }
    
    return prisma.salary.create({
      data: {
        ...data,
        totalCompensation,
      },
    });
  }
}
