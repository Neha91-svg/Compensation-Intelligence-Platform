import { SalaryService } from "@/services/salaryService";
import { SalaryTable } from "@/components/salary/SalaryTable";
import { SalaryFilters } from "@/components/salary/SalaryFilters";
import { SalaryPagination } from "@/components/salary/SalaryPagination";
import { salaryQuerySchema } from "@/validators/salary";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SalariesPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SalariesPage({ searchParams }: SalariesPageProps) {
  // 1. Resolve search params
  const resolvedParams = await searchParams;
  
  // 2. Validate query with Zod
  const query = salaryQuerySchema.parse({
    ...resolvedParams,
    page: resolvedParams.page || "1",
    limit: resolvedParams.limit || "15",
  });

  // 3. Fetch data from Service
  const { salaries, pagination } = await SalaryService.getSalaries(query);

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4 min-h-screen">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Salary Database
        </h1>
        <p className="text-lg text-slate-500">
          Explore {pagination.total} verified compensation entries across the globe.
        </p>
      </div>

      <SalaryFilters />

      <Suspense fallback={<TableSkeleton />}>
        <SalaryTable salaries={salaries} />
      </Suspense>

      <SalaryPagination 
        totalPages={pagination.totalPages} 
        currentPage={pagination.page} 
      />
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[400px] w-full rounded-xl" />
    </div>
  );
}
