import { NextRequest, NextResponse } from "next/server";
import { SalaryService } from "@/services/salaryService";
import { salaryQuerySchema, salaryCreateSchema } from "@/validators/salary";
import { handleApiError, getSafeBody } from "@/lib/api-error";

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
    const body = await getSafeBody(request);
    const validatedData = salaryCreateSchema.parse(body);
    const result = await SalaryService.createSalary(validatedData);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
