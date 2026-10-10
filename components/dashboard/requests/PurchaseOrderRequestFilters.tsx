"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, Filter, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductOption {
  id: string;
  name: string;
}

interface PurchaseOrderRequestFiltersProps {
  products: ProductOption[];
}

export default function PurchaseOrderRequestFilters({
  products,
}: PurchaseOrderRequestFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [companyName, setCompanyName] = useState(
    searchParams.get("companyName") ?? "",
  );
  const [productId, setProductId] = useState(
    searchParams.get("productId") ?? "",
  );

  const applyFilters = (newCompany: string, newProduct: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (newCompany.trim()) {
      params.set("companyName", newCompany.trim());
    } else {
      params.delete("companyName");
    }

    if (newProduct) {
      params.set("productId", newProduct);
    } else {
      params.delete("productId");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(companyName, productId);
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setProductId(selected);
    applyFilters(companyName, selected);
  };

  const handleReset = () => {
    setCompanyName("");
    setProductId("");
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const hasActiveFilters = Boolean(
    searchParams.get("companyName") || searchParams.get("productId"),
  );

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-500 pb-1 border-b border-slate-100">
        <Filter className="w-3.5 h-3.5 text-[#0b8b99]" />
        <span>Filter Requests</span>
        {isPending && (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400 ml-auto" />
        )}
      </div>

      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-wrap items-center gap-3"
      >
        {/* Search by Company Name */}
        <div className="relative flex-1 min-w-55">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Search by company name..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b8b99]/30 focus:border-[#0b8b99] transition-all"
          />
        </div>

        {/* Filter by Product */}
        <div className="min-w-50">
          <select
            value={productId}
            onChange={handleProductChange}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b8b99]/30 focus:border-[#0b8b99] text-slate-700 font-medium transition-all"
          >
            <option value="">All Products</option>
            {products.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Search Button */}
        <Button
          type="submit"
          size="sm"
          className="bg-[#062b56] hover:bg-[#041d3b] text-white text-xs font-semibold px-4 py-2"
        >
          Search
        </Button>

        {/* Clear/Reset Button */}
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Reset
          </Button>
        )}
      </form>
    </div>
  );
}
