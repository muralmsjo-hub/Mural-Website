"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { PackageSearch } from "lucide-react";
import ProductCard from "./ProductCard";
import { ProductItem } from "@/server/products/types";
import { Locale } from "@/types";

interface ProductsGridProps {
  products: ProductItem[];
  totalItems: number;
  locale: Locale;
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ProductsGrid({
  products = [],
  totalItems = 0,
  locale,
}: ProductsGridProps) {
  const t = useTranslations("ProductsPage.Grid");

  if (products.length === 0) {
    return (
      <div className="py-16 px-6 text-center bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-[#0b8b99]/10 text-[#0b8b99] flex items-center justify-center mb-4">
          <PackageSearch className="w-8 h-8 stroke-1.5" />
        </div>
        <h3 className="text-lg font-bold text-[#062b56]">
          {t("noProductsFound")}
        </h3>
        <p className="text-sm text-slate-500 mt-2 max-w-md leading-relaxed">
          {t("noProductsDesc")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grid Summary Header */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-1">
        <span>
          {t("showingCountOfTotal", {
            count: products.length,
            total: totalItems,
          })}
        </span>
      </div>

      {/* 3 Columns Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={cardVariants}
            className="h-full"
          >
            <ProductCard product={product} locale={locale} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
