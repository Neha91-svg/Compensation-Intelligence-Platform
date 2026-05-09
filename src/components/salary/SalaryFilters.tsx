"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export function SalaryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "all");

  function handleSearch() {
    const params = new URLSearchParams(searchParams.toString());
    if (search) params.set("search", search);
    else params.delete("search");
    
    if (location && location !== "all") params.set("location", location);
    else params.delete("location");
    
    params.set("page", "1"); // Reset to page 1 on search

    startTransition(() => {
      router.push(`/salaries?${params.toString()}`);
    });
  }

  function clearFilters() {
    setSearch("");
    setLocation("all");
    router.push("/salaries");
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-white border border-slate-200 rounded-xl shadow-sm mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Search company, job title..." 
          className="pl-10 border-slate-200 focus-visible:ring-indigo-500 h-11"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-[160px] border-slate-200 h-11">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="san-francisco">San Francisco</SelectItem>
            <SelectItem value="new-york">New York</SelectItem>
            <SelectItem value="london">London</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button 
            onClick={handleSearch}
            disabled={isPending}
            className="bg-slate-900 hover:bg-slate-800 h-11 px-6 shadow-sm shadow-slate-200"
          >
            {isPending ? "Searching..." : (
              <>
                <Filter className="mr-2 h-4 w-4" />
                Apply
              </>
            )}
          </Button>
          
          {(search || (location !== "all" && location)) && (
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="h-11 px-4 border-slate-200 text-slate-500 hover:text-slate-900"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
