import { SalaryService } from "@/services/salaryService";
import { SalaryTable } from "@/components/salary/SalaryTable";
import { LevelDistributionChart } from "@/components/company/LevelDistributionChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CompanyPageProps {
  params: { name: string };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { name } = await params;
  const companyData = await SalaryService.getCompanyData(name);

  if (!companyData) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4 min-h-screen">
      <Link 
        href="/salaries" 
        className="flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Salaries
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            {companyData.company}
          </h1>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50">
              Verified Data
            </Badge>
            <Badge variant="outline" className="text-slate-500">
              Tech Industry
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Median TC</p>
            <p className="text-2xl font-bold text-indigo-600">${(companyData.stats.medianCompensation / 1000).toFixed(0)}k</p>
          </div>
          <div className="flex-1 md:flex-none p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Data Points</p>
            <p className="text-2xl font-bold text-slate-900">{companyData.stats.count}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card className="lg:col-span-2 border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <CardTitle className="text-lg font-bold flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-indigo-600" />
              Level Distribution (Avg. TC)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <LevelDistributionChart data={companyData.levelDistribution} />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-600 text-sm flex items-center">
                  <Users className="mr-2 h-4 w-4 text-slate-400" /> Size
                </span>
                <span className="font-semibold text-slate-900">10,000+</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-600 text-sm flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-slate-400" /> Avg. TC
                </span>
                <span className="font-semibold text-slate-900">
                  ${(companyData.stats.averageCompensation / 1000).toFixed(0)}k
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Company Salaries</h2>
        <SalaryTable salaries={companyData.recentSalaries} />
      </div>
    </div>
  );
}
