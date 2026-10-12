"use client";

import React, { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ProductsFilter from "./ProductsFilter";
import ProductsGrid from "./ProductsGrid";
import ProductsPagination from "./ProductsPagination";
import ProductsSkeleton from "./ProductsSkeleton";
import { Locale, PaginationMeta } from "@/types";
import { ProductItem } from "@/server/products/types";
import { CategoryFilterItem } from "@/server/categories/types";

interface ProductsClientContainerProps {
  initialProducts: ProductItem[];
  initialPagination: PaginationMeta;
  categories: CategoryFilterItem[];
  selectedCategoryIds: string[];
  locale: Locale;
}

export default function ProductsClientContainer({
  initialProducts = [],
  initialPagination,
  categories = [],
  selectedCategoryIds = [],
  locale,
}: ProductsClientContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateQueryParams = (newCategories: string[], newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    // Handle categories array in query string (?categories=id1,id2)
    if (newCategories.length > 0) {
      params.set("categories", newCategories.join(","));
    } else {
      params.delete("categories");
      params.delete("category");
    }

    // Handle page parameter
    if (newPage > 1) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleToggleCategory = (catId: string) => {
    const exists = selectedCategoryIds.includes(catId);
    const updated = exists
      ? selectedCategoryIds.filter((id) => id !== catId)
      : [...selectedCategoryIds, catId];

    // Reset to page 1 when filter changes
    updateQueryParams(updated, 1);
  };

  const handleClearFilters = () => {
    updateQueryParams([], 1);
  };

  const handlePageChange = (newPage: number) => {
    updateQueryParams(selectedCategoryIds, newPage);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#f0fafb] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Filter (3 cols on desktop) */}

          <div className="lg:col-span-3 w-full">
            {categories.length > 0 && (
              <ProductsFilter
                categories={categories}
                selectedCategoryIds={selectedCategoryIds}
                onToggleCategory={handleToggleCategory}
                onClearFilters={handleClearFilters}
                isPending={isPending}
              />
            )}
          </div>

          {/* Right Main Content (9 cols on desktop) */}
          <div className="lg:col-span-9 space-y-8 w-full">
            {isPending ? (
              <ProductsSkeleton />
            ) : (
              <>
                <ProductsGrid
                  products={initialProducts}
                  totalItems={
                    initialPagination?.totalItems || initialProducts.length
                  }
                  locale={locale}
                />
                <ProductsPagination
                  currentPage={initialPagination?.currentPage || 1}
                  totalPages={initialPagination?.totalPages || 1}
                  onPageChange={handlePageChange}
                  isPending={isPending}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
