import { NextRequest, NextResponse } from "next/server";
import { SalaryService } from "@/services/salaryService";
import { handleApiError, ApiError } from "@/lib/api-error";

/**
 * GET /api/company/[company]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { company: string } }
) {
  try {
    const { company } = await params;
    
    if (!company) {
      throw new ApiError(400, "Company name is required");
    }

    const data = await SalaryService.getCompanyData(company);

    if (!data) {
      throw new ApiError(404, `No salary data found for company: ${company}`);
    }

    return NextResponse.json(data);

  } catch (error) {
    return handleApiError(error);
  }
}
