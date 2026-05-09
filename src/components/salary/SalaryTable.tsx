"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SalaryTableProps {
  salaries: any[];
}

export function SalaryTable({ salaries }: SalaryTableProps) {
  return (
    <Card className="w-full shadow-sm border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold">Recent Salaries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-slate-100 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold">Company</TableHead>
                <TableHead className="font-semibold">Role</TableHead>
                <TableHead className="font-semibold">Level</TableHead>
                <TableHead className="font-semibold text-right">Total Comp</TableHead>
                <TableHead className="font-semibold">Location</TableHead>
                <TableHead className="font-semibold">Exp.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salaries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                    No salary data found.
                  </TableCell>
                </TableRow>
              ) : (
                salaries.map((salary) => (
                  <TableRow key={salary.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-medium text-slate-900">
                      {salary.company.name}
                    </TableCell>
                    <TableCell className="text-slate-600">{salary.jobTitle}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal border-slate-200 bg-white">
                        {salary.level || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold text-indigo-600">
                      ${((salary.baseSalary + (salary.bonus || 0) + (salary.stock || 0)) / 1000).toFixed(0)}k
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">{salary.location}</TableCell>
                    <TableCell className="text-slate-500 text-sm">{salary.yearsExperience}y</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
