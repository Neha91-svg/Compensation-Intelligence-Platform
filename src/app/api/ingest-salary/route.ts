import { NextRequest, NextResponse } from "next/server";
import { SalaryService } from "@/services/salaryService";
import { salaryCreateSchema } from "@/validators/salary";
import { handleApiError, getSafeBody } from "@/lib/api-error";

/**
 * Controller for ingesting salary data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await getSafeBody(request);
    
    // 1. Validate and Normalize with Zod
    const validatedData = salaryCreateSchema.parse(body);
    
    // 2. Process via Service
    const result = await SalaryService.createSalary(validatedData);
    
    // 3. Return Structured Response
    return NextResponse.json({
      success: true,
      message: "Salary data ingested successfully",
      data: result,
    }, { status: 201 });

  } catch (error: any) {
    return handleApiError(error);
  }
}
