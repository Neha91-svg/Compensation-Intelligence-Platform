import { NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Standardized API Error Response
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Global API Error Handler Wrapper
 */
export async function handleApiError(error: unknown) {
  // 1. Zod Validation Errors
  if (error instanceof ZodError) {
    return NextResponse.json({
      success: false,
      error: "Validation Error",
      details: error.flatten().fieldErrors,
    }, { status: 400 });
  }

  // 2. Custom API Errors
  if (error instanceof ApiError) {
    return NextResponse.json({
      success: false,
      error: error.message,
      details: error.details,
    }, { status: error.statusCode });
  }

  // 3. Database / Prisma Errors (Basic mapping)
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const prismaError = error as { code: string; message: string };
    if (prismaError.code === 'P2002') {
      return NextResponse.json({
        success: false,
        error: "Conflict",
        message: "A record with this unique value already exists.",
      }, { status: 409 });
    }
  }

  // 4. Fallback for unexpected errors
  // In production, we don't leak the exact message unless it's safe
  console.error("[API_ERROR]:", error);
  
  return NextResponse.json({
    success: false,
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" 
      ? (error instanceof Error ? error.message : String(error))
      : "An unexpected error occurred. Please try again later.",
  }, { status: 500 });
}

/**
 * Helper to ensure safe JSON parsing
 */
export async function getSafeBody(request: Request) {
  try {
    return await request.json();
  } catch {
    throw new ApiError(400, "Malformed JSON body");
  }
}
