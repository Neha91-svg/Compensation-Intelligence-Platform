import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CompLens
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/salaries" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Salaries
          </Link>
          <Link href="/companies" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Companies
          </Link>
          <Link href="/benefits" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Benefits
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            Submit Salary
          </Button>
        </div>
      </div>
    </header>
  );
}
