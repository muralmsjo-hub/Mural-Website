"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isPending?: boolean;
}

export default function ProductsPagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  isPending = false,
}: ProductsPaginationProps) {
  const t = useTranslations("ProductsPage.Pagination");
  const locale = useLocale();
  const isRtl = locale === "ar";

  if (totalPages <= 1) return null;

  // Generate page numbers array
  const pages: number[] = [];
  const maxDisplayedPages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
  let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

  if (endPage - startPage + 1 < maxDisplayedPages) {
    startPage = Math.max(1, endPage - maxDisplayedPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200/80">
      {/* Page indicator info */}
      <span className="text-xs sm:text-sm text-slate-500 font-medium">
        {t("pageOf", { current: currentPage, total: totalPages })}
      </span>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          disabled={currentPage <= 1 || isPending}
          onClick={() => onPageChange(currentPage - 1)}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-[#062b56] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform ${isRtl ? "rotate-180" : ""}`} />
          <span>{t("previous")}</span>
        </button>

        {/* Page Numbers */}
        {startPage > 1 && (
          <>
            <button
              type="button"
              disabled={isPending}
              onClick={() => onPageChange(1)}
              className="w-9 h-9 rounded-xl text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
            >
              1
            </button>
            {startPage > 2 && <span className="px-1 text-slate-400 text-xs">...</span>}
          </>
        )}

        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              disabled={isPending}
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isActive
                  ? "bg-[#0b8b99] border-[#0b8b99] text-white shadow-xs"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#062b56]"
              }`}
            >
              {p}
            </button>
          );
        })}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-1 text-slate-400 text-xs">...</span>}
            <button
              type="button"
              disabled={isPending}
              onClick={() => onPageChange(totalPages)}
              className="w-9 h-9 rounded-xl text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          type="button"
          disabled={currentPage >= totalPages || isPending}
          onClick={() => onPageChange(currentPage + 1)}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-[#062b56] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
        >
          <span>{t("next")}</span>
          <ChevronRight className={`w-4 h-4 transition-transform ${isRtl ? "rotate-180" : ""}`} />
        </button>
      </div>
    </nav>
  );
}
