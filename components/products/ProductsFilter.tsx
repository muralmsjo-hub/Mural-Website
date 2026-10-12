"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Filter, Check, RotateCcw, ChevronDown } from "lucide-react";
import { CategoryFilterItem } from "@/server/categories/types";

interface ProductsFilterProps {
  categories: CategoryFilterItem[];
  selectedCategoryIds: string[];
  onToggleCategory: (categoryId: string) => void;
  onClearFilters: () => void;
  isPending?: boolean;
}

export default function ProductsFilter({
  categories = [],
  selectedCategoryIds = [],
  onToggleCategory,
  onClearFilters,
  isPending = false,
}: ProductsFilterProps) {
  const t = useTranslations("ProductsPage.Filter");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const selectedCount = selectedCategoryIds.length;

  return (
    <div className="w-full lg:sticky lg:top-24 lg:self-start z-20">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="w-full py-3 px-4 rounded-xl bg-white border border-slate-200 text-[#062b56] font-semibold text-sm flex items-center justify-between shadow-xs hover:border-[#0b8b99]/40 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#0b8b99]" />
            <span>{t("title")}</span>
            {selectedCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#0b8b99] text-white text-[11px] font-bold flex items-center justify-center">
                {selectedCount}
              </span>
            )}
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              mobileFilterOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Filter Body Container */}
      <div
        className={`${
          mobileFilterOpen ? "block" : "hidden"
        } lg:block bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-5`}
      >
        {/* Filter Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0b8b99]/10 text-[#0b8b99] flex items-center justify-center">
              <Filter className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#062b56]">{t("title")}</h3>
          </div>

          {selectedCount > 0 && (
            <button
              type="button"
              onClick={onClearFilters}
              disabled={isPending}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0b8b99] hover:text-[#062b56] transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t("clearAll")}</span>
            </button>
          )}
        </div>

        {/* Categories Checkboxes List */}
        <div className="space-y-2 max-h-110 overflow-y-auto pr-1 rtl:pl-1">
          {categories.length > 0 ? (
            categories.map((cat) => {
              const isChecked = selectedCategoryIds.includes(cat.id);
              return (
                <div
                  key={cat.id}
                  onClick={() => onToggleCategory(cat.id)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                    isChecked
                      ? "bg-[#0b8b99]/5 border-[#0b8b99]/40 text-[#062b56] font-semibold"
                      : "bg-white border-transparent hover:bg-slate-50 text-slate-700 hover:text-[#062b56]"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isChecked
                        ? "bg-[#0b8b99] border-[#0b8b99] text-white"
                        : "bg-white border-slate-300"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-3" />}
                  </div>
                  <span className="text-xs sm:text-sm leading-tight flex-1 line-clamp-1">
                    {cat.name}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="py-6 text-center text-xs text-slate-400">
             {t("noCategories")}
            </div>
          )}
        </div>

        {/* Selected Count Footer Bar */}
        {selectedCount > 0 && (
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{t("selectedCount", { count: selectedCount })}</span>
            
          </div>
        )}
      </div>
    </div>
  );
}
