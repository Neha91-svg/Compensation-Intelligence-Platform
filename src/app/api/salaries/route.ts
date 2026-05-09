import { NextRequest, NextResponse } from "next/server";
import { SalaryService } from "@/services/salaryService";
import { salaryQuerySchema } from "@/validators/salary";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryParams = Object.fromEntries(searchParams.entries());
    
    const validatedQuery = salaryQuerySchema.parse(queryParams);
    const result = await SalaryService.getSalaries(validatedQuery);
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.name === "ZodError" ? 400 : 500 }
    );
  }
}
