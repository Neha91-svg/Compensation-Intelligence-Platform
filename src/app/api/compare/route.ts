import { NextRequest, NextResponse } from "next/server";
import { SalaryService } from "@/services/salaryService";
import { z } from "zod";
import { handleApiError, ApiError } from "@/lib/api-error";

const compareQuerySchema = z.object({
  id1: z.string().min(1, "First salary ID is required"),
  id2: z.string().min(1, "Second salary ID is required"),
});

/**
 * GET /api/compare
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryParams = Object.fromEntries(searchParams.entries());
    
    // 1. Validate Query Params
    const validated = compareQuerySchema.parse(queryParams);
    
    // 2. Fetch Comparison via Service
    const result = await SalaryService.compareSalaries(validated.id1, validated.id2);
    
    return NextResponse.json(result);

  } catch (error: any) {
    // Map service errors to ApiErrors for standard handling
    if (error instanceof Error && error.message.includes("not found")) {
      return handleApiError(new ApiError(404, error.message));
    }
    
    return handleApiError(error);
  }
}
