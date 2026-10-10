"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { PackageSearch } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { ProductItem } from "@/server/products/types";

import { Locale } from "@/types";

interface RelatedProductsSectionProps {
  products: ProductItem[];
  locale: Locale;
}

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASE_EXPO,
    },
  },
};

export default function RelatedProductsSection({
  products,
  locale,
}: RelatedProductsSectionProps) {
  const t = useTranslations("ProductDetailsPage");

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#f0fafb] py-16 lg:py-24 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Center-Aligned Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0b8b99]/10 text-[#0b8b99]">
            <PackageSearch className="w-4 h-4" />
            <span>{t("badge")}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#062b56] tracking-tight">
            {t("discoverMoreProducts")}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t("discoverMoreDesc")}
          </p>
        </div>

        {/* 3-Column Grid of Related Product Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} locale={locale} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
