import { SalaryTable } from "@/components/salary/SalaryTable";
import { SalaryFilters } from "@/components/salary/SalaryFilters";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, ShieldCheck, Globe } from "lucide-react";

async function getSalaries() {
  // In a real app, we'd fetch from our API or directly from the service
  // For this demo, we'll return some mock data if the DB is empty
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/salaries`, {
      cache: 'no-store'
    });
    const data = await res.json();
    return data.salaries || [];
  } catch (e) {
    return [
      {
        id: "1",
        company: { name: "Google" },
        jobTitle: "Software Engineer",
        level: "L3",
        baseSalary: 150000,
        bonus: 25000,
        stock: 40000,
        location: "Mountain View, CA",
        yearsExperience: 2
      },
      {
        id: "2",
        company: { name: "Meta" },
        jobTitle: "Product Designer",
        level: "IC4",
        baseSalary: 180000,
        bonus: 30000,
        stock: 60000,
        location: "Menlo Park, CA",
        yearsExperience: 5
      },
      {
        id: "3",
        company: { name: "Stripe" },
        jobTitle: "Backend Engineer",
        level: "L2",
        baseSalary: 165000,
        bonus: 20000,
        stock: 50000,
        location: "Remote",
        yearsExperience: 3
      }
    ];
  }
}

export default async function Home() {
  const salaries = await getSalaries();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 border-indigo-100 px-4 py-1">
              Trusted by 50,000+ professionals
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
              Tech Compensation <br />
              <span className="text-indigo-600">Reimagined.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              The world's most accurate and transparent salary database for software engineers, 
              product managers, and designers.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 h-14 px-8 text-lg rounded-full shadow-lg shadow-indigo-200">
                Explore Salaries <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-slate-200">
                Post Your Salary
              </Button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 p-8 bg-slate-50/50 rounded-3xl border border-slate-100 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm">
                <ShieldCheck className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Verified Data</h3>
                <p className="text-slate-500 text-sm">Every entry is cross-referenced for accuracy.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm">
                <Globe className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Global Reach</h3>
                <p className="text-slate-500 text-sm">Salaries from 150+ countries and regions.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Real-time Stats</h3>
                <p className="text-slate-500 text-sm">Updated daily with the latest market trends.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-slate-50/50 flex-1">
        <div className="container mx-auto max-w-6xl px-4">
          <SalaryFilters />
          <SalaryTable salaries={salaries} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-white">
        <div className="container mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            CompLens
          </div>
          <div className="text-slate-500 text-sm">
            © 2026 CompLens. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-slate-600 font-medium">
            <Link href="#" className="hover:text-indigo-600 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-indigo-600 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-indigo-600 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Inline helper for Link since I didn't import it at top but used it in footer
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
