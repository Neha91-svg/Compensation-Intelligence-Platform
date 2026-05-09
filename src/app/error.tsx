"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[FRONTEND_ERROR]:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Something went wrong
        </h1>
        
        <p className="text-slate-500 text-lg">
          We encountered an unexpected error. This might be a temporary issue.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button 
            onClick={() => reset()}
            className="bg-slate-900 hover:bg-slate-800"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-slate-50 rounded-lg text-left overflow-auto max-h-40 border border-slate-100">
            <p className="text-xs font-mono text-red-600">{error.message}</p>
            {error.stack && (
              <pre className="text-[10px] mt-2 text-slate-400 font-mono">
                {error.stack}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
