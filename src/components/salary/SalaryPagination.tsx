"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface SalaryPaginationProps {
  totalPages: number;
  currentPage: number;
}

export function SalaryPagination({ totalPages, currentPage }: SalaryPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function createPageURL(pageNumber: number | string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `/salaries?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  return (
    <div className="py-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"} 
              aria-disabled={currentPage <= 1}
              className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            // Simple logic: show first, last, and current if many pages
            // For now, just show all if small, or a range
            if (totalPages > 7 && page > 2 && page < totalPages - 1 && Math.abs(page - currentPage) > 1) {
              if (page === 3 || page === totalPages - 2) return <PaginationEllipsis key={page} />;
              return null;
            }

            return (
              <PaginationItem key={page}>
                <PaginationLink 
                  href={createPageURL(page)} 
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext 
              href={currentPage < totalPages ? createPageURL(currentPage + 1) : "#"}
              aria-disabled={currentPage >= totalPages}
              className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
