import { NextRequest, NextResponse } from "next/server";
import { SalaryService } from "@/services/salaryService";

/**
 * GET /api/company/[company]
 * Retrieves aggregated salary data for a specific company
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { company: string } }
) {
  try {
    const { company } = params;
    
    if (!company) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }

    const data = await SalaryService.getCompanyData(company);

    if (!data) {
      return NextResponse.json({ 
        error: "Not Found",
        message: `No salary data found for company: ${company}` 
      }, { status: 404 });
    }

    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Company API Error:", error);
    return NextResponse.json({ 
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "An unexpected error occurred"
    }, { status: 500 });
  }
}
