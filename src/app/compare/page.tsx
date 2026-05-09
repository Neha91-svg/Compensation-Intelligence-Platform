import { SalaryService } from "@/services/salaryService";
import { CompareCard } from "@/components/salary/CompareCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Link from "next/link";

interface ComparePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const resolvedParams = await searchParams;
  const id1 = resolvedParams.id1 as string;
  const id2 = resolvedParams.id2 as string;

  if (!id1 || !id2) {
    return (
      <div className="container mx-auto max-w-4xl py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Compare Compensations</h1>
        <p className="text-slate-500 mb-8">Select two salary entries from the database to compare them head-to-head.</p>
        <Link 
          href="/salaries" 
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-8 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700"
        >
          Go to Salary Database
        </Link>
      </div>
    );
  }

  try {
    const comparison = await SalaryService.compareSalaries(id1, id2);

    return (
      <div className="container mx-auto max-w-6xl py-12 px-4">
        <Link 
          href="/salaries" 
          className="flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Salaries
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Head-to-Head Comparison
          </h1>
          <div className="flex justify-center gap-2">
            <Badge variant="outline" className="text-slate-500">
              {comparison.entry1.role} vs {comparison.entry2.role}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 items-center gap-4 lg:gap-8">
          <div className="lg:col-span-3">
            <CompareCard entry={comparison.entry1} title="Entry #1" />
          </div>

          <div className="lg:col-span-1 flex flex-col items-center justify-center gap-6">
            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
              <span className="text-xl font-bold text-slate-400">VS</span>
            </div>
            
            <div className="w-full space-y-4">
              <DiffIndicator 
                label="TC Diff" 
                value={comparison.differences.totalCompensation.absolute} 
                percent={comparison.differences.totalCompensation.percentage} 
              />
              <div className="text-center">
                {comparison.levelComparison.isSame ? (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Same Level</Badge>
                ) : (
                  <Badge variant="outline" className="text-slate-400">Different Levels</Badge>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <CompareCard entry={comparison.entry2} title="Entry #2" />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto max-w-4xl py-20 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error loading comparison</h1>
        <p className="text-slate-500 mb-8">One or both salary entries could not be found.</p>
        <Link href="/salaries" className="text-indigo-600 hover:underline">Return to Database</Link>
      </div>
    );
  }
}

function DiffIndicator({ label, value, percent }: { label: string, value: number, percent: number }) {
  const isPositive = value > 0;
  const isZero = value === 0;

  return (
    <Card className="border-slate-100 shadow-sm bg-white overflow-hidden">
      <CardContent className="p-4 text-center space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <div className={`flex items-center justify-center gap-1 font-black text-lg ${isPositive ? 'text-green-600' : isZero ? 'text-slate-400' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp className="h-4 w-4" /> : isZero ? <Minus className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          ${Math.abs(value).toLocaleString()}
        </div>
        <p className={`text-xs font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{percent.toFixed(1)}%
        </p>
      </CardContent>
    </Card>
  );
}
