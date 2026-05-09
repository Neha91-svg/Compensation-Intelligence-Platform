import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Briefcase, MapPin } from "lucide-react";

interface CompareCardProps {
  entry: {
    company: string;
    role: string;
    level: string | null;
    baseSalary: number;
    bonus: number;
    stock: number;
    totalCompensation: number;
  };
  title: string;
}

export function CompareCard({ entry, title }: CompareCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden h-full">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-3">
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">{title}</p>
        <CardTitle className="text-2xl font-extrabold text-slate-900">{entry.company}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center text-slate-600">
            <Briefcase className="h-4 w-4 mr-3 text-slate-400" />
            <span className="font-medium">{entry.role}</span>
          </div>
          <div className="flex items-center text-slate-600">
            <MapPin className="h-4 w-4 mr-3 text-slate-400" />
            <span>{entry.location || "Remote"}</span>
          </div>
          {entry.level && (
            <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100">
              {entry.level}
            </Badge>
          )}
        </div>

        <div className="pt-4 border-t border-slate-50 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Base Salary</span>
            <span className="font-semibold text-slate-900">${entry.baseSalary.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Bonus</span>
            <span className="font-semibold text-slate-900">${entry.bonus.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Stock</span>
            <span className="font-semibold text-slate-900">${entry.stock.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-100">
            <span className="text-lg font-bold text-slate-900">Total Comp</span>
            <span className="text-2xl font-black text-indigo-600">${entry.totalCompensation.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
