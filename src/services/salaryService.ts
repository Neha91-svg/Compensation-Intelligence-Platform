import prisma from "@/lib/prisma";
import { SalaryQuery, normalizeCompanyName } from "@/validators/salary";

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

  static async getCompanyData(companyName: string) {
    const normalizedName = normalizeCompanyName(companyName);

    const [salaries, levelDist] = await Promise.all([
      prisma.salary.findMany({
        where: {
          company: { equals: normalizedName, mode: "insensitive" },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.salary.groupBy({
        by: ['level'],
        where: {
          company: { equals: normalizedName, mode: "insensitive" },
        },
        _count: {
          id: true,
        },
        _avg: {
          totalCompensation: true,
        },
      }),
    ]);

    if (salaries.length === 0) return null;

    // Calculate median compensation
    const sortedComp = salaries
      .map(s => s.totalCompensation)
      .sort((a, b) => a - b);
    
    const mid = Math.floor(sortedComp.length / 2);
    const medianComp = sortedComp.length % 2 !== 0 
      ? sortedComp[mid] 
      : (sortedComp[mid - 1] + sortedComp[mid]) / 2;

    return {
      company: salaries[0].company,
      stats: {
        count: salaries.length,
        medianCompensation: medianComp,
        averageCompensation: sortedComp.reduce((a, b) => a + b, 0) / sortedComp.length,
      },
      levelDistribution: levelDist.map(d => ({
        level: d.level || "Unknown",
        count: d._count.id,
        averageComp: d._avg.totalCompensation,
      })),
      recentSalaries: salaries.slice(0, 10),
    };
  }

  static async compareSalaries(id1: string, id2: string) {
    const [s1, s2] = await Promise.all([
      prisma.salary.findUnique({ where: { id: id1 } }),
      prisma.salary.findUnique({ where: { id: id2 } }),
    ]);

    if (!s1 || !s2) {
      throw new Error("One or both salary entries not found.");
    }

    const calculateDiff = (v1: number, v2: number) => ({
      absolute: v2 - v1,
      percentage: v1 !== 0 ? ((v2 - v1) / v1) * 100 : (v2 !== 0 ? 100 : 0),
    });

    return {
      entry1: {
        company: s1.company,
        role: s1.role,
        level: s1.level,
        baseSalary: s1.baseSalary,
        bonus: s1.bonus,
        stock: s1.stock,
        totalCompensation: s1.totalCompensation,
      },
      entry2: {
        company: s2.company,
        role: s2.role,
        level: s2.level,
        baseSalary: s2.baseSalary,
        bonus: s2.bonus,
        stock: s2.stock,
        totalCompensation: s2.totalCompensation,
      },
      differences: {
        baseSalary: calculateDiff(s1.baseSalary, s2.baseSalary),
        bonus: calculateDiff(s1.bonus, s2.bonus),
        stock: calculateDiff(s1.stock, s2.stock),
        totalCompensation: calculateDiff(s1.totalCompensation, s2.totalCompensation),
      },
      levelComparison: {
        level1: s1.level,
        level2: s2.level,
        isSame: s1.level === s2.level,
      }
    };
  }
}
