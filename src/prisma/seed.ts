import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const salaries = [
    {
      company: "Google",
      role: "Software Engineer",
      level: "L3",
      location: "Mountain View, CA",
      experienceYears: 2,
      baseSalary: 145000,
      bonus: 20000,
      stock: 40000,
      totalCompensation: 205000,
      confidenceScore: 0.95,
    },
    {
      company: "Meta",
      role: "Product Designer",
      level: "IC4",
      location: "Menlo Park, CA",
      experienceYears: 5,
      baseSalary: 185000,
      bonus: 30000,
      stock: 65000,
      totalCompensation: 280000,
      confidenceScore: 0.88,
    },
    {
      company: "Amazon",
      role: "SDE II",
      level: "L5",
      location: "Seattle, WA",
      experienceYears: 4,
      baseSalary: 160000,
      bonus: 45000,
      stock: 55000,
      totalCompensation: 260000,
      confidenceScore: 0.92,
    },
    {
      company: "Stripe",
      role: "Backend Engineer",
      level: "L2",
      location: "Remote",
      experienceYears: 3,
      baseSalary: 170000,
      bonus: 25000,
      stock: 50000,
      totalCompensation: 245000,
      confidenceScore: 0.98,
    },
    {
      company: "Netflix",
      role: "Senior Software Engineer",
      level: "Senior",
      location: "Los Gatos, CA",
      experienceYears: 8,
      baseSalary: 450000,
      bonus: 0,
      stock: 0,
      totalCompensation: 450000,
      confidenceScore: 0.99,
    },
  ];

  console.log("Cleaning up database...");
  await prisma.salary.deleteMany();

  console.log("Seeding realistic salary data...");
  for (const salary of salaries) {
    await prisma.salary.create({
      data: salary,
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
