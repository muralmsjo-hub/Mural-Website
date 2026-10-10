"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowRight, FolderOpen } from "lucide-react";
import { CategoryItem } from "@/server/categories/types";

interface CategoriesBentoGridProps {
  categories: CategoryItem[];
}

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 2,
      ease: EASE_EXPO,
    },
  },
};

// Editorial Bento layout span pattern definitions
const BENTO_SPANS = [
  { col: "md:col-span-8", height: "h-[400px] sm:h-[460px]", isHero: true },
  { col: "md:col-span-4", height: "h-[400px] sm:h-[460px]", isHero: false },
  { col: "md:col-span-4", height: "h-[320px] sm:h-[350px]", isHero: false },
  { col: "md:col-span-4", height: "h-[320px] sm:h-[350px]", isHero: false },
  { col: "md:col-span-4", height: "h-[320px] sm:h-[350px]", isHero: false },
  { col: "md:col-span-7", height: "h-[360px] sm:h-[420px]", isHero: true },
  { col: "md:col-span-5", height: "h-[360px] sm:h-[420px]", isHero: false },
  { col: "md:col-span-5", height: "h-[340px] sm:h-[380px]", isHero: false },
  { col: "md:col-span-7", height: "h-[340px] sm:h-[380px]", isHero: true },
];

export function CategoriesBentoGrid({
  categories = [],
}: CategoriesBentoGridProps) {
  const t = useTranslations("CategoriesPage.Bento");

  if (!categories || categories.length === 0) {
    return (
      <section className="py-20 bg-slate-50 min-h-[400px] flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-white border border-slate-200 max-w-md mx-auto shadow-xs">
          <FolderOpen className="w-12 h-12 text-[#0b8b99] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#062b56]">{t("noCategories")}</h3>
          <p className="text-sm text-slate-500 mt-2">{t("noCategoriesDesc")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-[#f0fafb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Bento Grid Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categories.map((category, idx) => {
            const layoutStyle = BENTO_SPANS[idx % BENTO_SPANS.length];
            const isHero = layoutStyle.isHero || category.isFeatured;

            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className={`${layoutStyle.col} ${layoutStyle.height} group relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end`}
              >
                <Link
                  href={`/products?categories=${category.id}`}
                  className="absolute inset-0 z-10"
                  aria-label={category.name}
                >
                  <span className="sr-only">{category.name}</span>
                </Link>

                {/* Background Image with Hover Zoom */}
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#062b56] to-[#041d3c]" />
                )}

                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#062b56]/95 via-[#062b56]/40 to-transparent transition-opacity duration-300 group-hover:opacity-90 pointer-events-none" />

                {/* Bottom Content Area */}
                <div className="relative z-20 p-6 sm:p-8 flex flex-col gap-2.5 pointer-events-none">
                  <h3
                    className={`${
                      isHero
                        ? "text-xl sm:text-2xl lg:text-2xl font-bold text-white"
                        : "text-xl sm:text-2xl font-bold text-white"
                    } group-hover:text-[#0b8b99] transition-colors duration-300 leading-tight tracking-tight`}
                  >
                    {category.name}
                  </h3>

                  {category.description && (
                    <p
                      className={`${
                        isHero
                          ? "line-clamp-3 text-slate-200"
                          : "line-clamp-2 text-slate-300"
                      } text-xs sm:text-sm font-light leading-relaxed max-w-xl`}
                    >
                      {category.description}
                    </p>
                  )}

                  {/* Explore Action Link */}
                  <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0b8b99] group-hover:text-white transition-colors duration-200">
                    <span>{t("explore")}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 rtl:rotate-180 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
