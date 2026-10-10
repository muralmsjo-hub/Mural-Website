import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LayoutGrid, ArrowRight, Stethoscope } from "lucide-react";
import { SecondaryButton } from "@/components/common";

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  image: string;
  isFeatured: boolean;
  createdAt: Date;
  slug: string;
}

interface CategoriesSectionProps {
  categories: CategoryItem[];
}

export default async function CategoriesSection({ categories = [] }: CategoriesSectionProps) {
  const t = await getTranslations("HomePage.Categories");

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 rtl:text-right ltr:text-left">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-[#0b8b99]/10 text-[#0b8b99] mb-3">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{t("badge")}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#062b56] tracking-tight">
              {t("title")}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              {t("description")}
            </p>
          </div>

          <div>
            <SecondaryButton
              href="/products"
              size="sm"
              icon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
            >
              {t("viewAllCategories")}
            </SecondaryButton>
          </div>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group relative rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-[#0b8b99]/50 transition-all duration-200 flex flex-col h-full"
              >
                {/* Category Image */}
                <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                      <Stethoscope className="w-12 h-12 stroke-1 text-[#0b8b99]/40" />
                    </div>
                  )}

                  {category.isFeatured && (
                    <span className="absolute top-3 right-3 rtl:left-3 rtl:right-auto px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-[#062b56] text-white shadow-sm">
                      Featured
                    </span>
                  )}
                </div>

                {/* Category Info */}
                <div className="p-5 flex flex-col flex-1 justify-between rtl:text-right ltr:text-left">
                  <div>
                    <h3 className="text-base font-bold text-[#062b56] group-hover:text-[#0b8b99] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {category.description || t("description")}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0b8b99]">
                    <span>{t("viewCategory")}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center border rounded-xl bg-slate-50 text-slate-500 text-sm">
            {t("noCategories")}
          </div>
        )}

      </div>
    </section>
  );
}
