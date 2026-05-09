import { NextRequest, NextResponse } from "next/server";
import { SalaryService } from "@/services/salaryService";
import { z } from "zod";

const compareQuerySchema = z.object({
  id1: z.string().min(1, "First salary ID is required"),
  id2: z.string().min(1, "Second salary ID is required"),
});

/**
 * GET /api/compare
 * Compares two salary entries by ID
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
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: "Validation Error",
        details: error.flatten().fieldErrors,
      }, { status: 400 });
    }

    if (error.message && error.message.includes("not found")) {
      return NextResponse.json({
        error: "Not Found",
        message: error.message
      }, { status: 404 });
    }

    console.error("Comparison API Error:", error);
    return NextResponse.json({ 
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "An unexpected error occurred"
    }, { status: 500 });
  }
}
