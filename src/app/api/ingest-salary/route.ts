import { NextRequest, NextResponse } from "next/server";
import { SalaryService } from "@/services/salaryService";
import { salaryCreateSchema } from "@/validators/salary";
import { ZodError } from "zod";

/**
 * Controller for ingesting salary data
 * POST /api/ingest-salary
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 1. Validate and Normalize with Zod
    // Normalization logic is built into the schema's transform functions
    const validatedData = salaryCreateSchema.parse(body);
    
    // 2. Process via Service (handles duplicates and calculation)
    const result = await SalaryService.createSalary(validatedData);
    
    // 3. Return Structured Response
    return NextResponse.json({
      success: true,
      message: "Salary data ingested successfully",
      data: result,
    }, { status: 201 });

  } catch (error: any) {
    // 4. Proper Try/Catch with Structured JSON Responses
    if (error instanceof ZodError) {
      return NextResponse.json({
        success: false,
        error: "Validation Error",
        details: error.flatten().fieldErrors,
      }, { status: 400 });
    }

    if (error.message && error.message.includes("Duplicate entry")) {
      return NextResponse.json({
        success: false,
        error: "Conflict",
        message: error.message,
      }, { status: 409 });
    }

    console.error("Ingestion API Error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    }, { status: 500 });
  }
}
