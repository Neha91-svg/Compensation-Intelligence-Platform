import { NextRequest, NextResponse } from "next/server";
import { SalaryService } from "@/services/salaryService";
import { salaryQuerySchema, salaryCreateSchema } from "@/validators/salary";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryParams = Object.fromEntries(searchParams.entries());
    
    const validatedQuery = salaryQuerySchema.parse(queryParams);
    const result = await SalaryService.getSalaries(validatedQuery);
    
    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = salaryCreateSchema.parse(body);
    const result = await SalaryService.createSalary(validatedData);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Common error handler for structured validation errors
 */
function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json({
      error: "Validation failed",
      details: error.flatten().fieldErrors,
    }, { status: 400 });
  }

  console.error("API Error:", error);
  return NextResponse.json({ 
    error: "Internal Server Error",
    message: error instanceof Error ? error.message : "Unknown error"
  }, { status: 500 });
}
