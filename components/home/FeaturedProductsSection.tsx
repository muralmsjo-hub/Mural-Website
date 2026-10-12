"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Package, Building2 } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/common";
import { FeaturedProduct } from "@/server/products/types";

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface FeaturedProductsSectionProps {
  products: FeaturedProduct[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_EXPO,
    },
  },
};

function getGridClasses(count: number): string {
  switch (count) {
    case 1:
      return "max-w-md mx-auto grid-cols-1";
    case 2:
      return "max-w-3xl mx-auto grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8";
    case 3:
      return "max-w-5xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8";
    case 4:
    default:
      return "max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6";
  }
}

export default function FeaturedProductsSection({
  products = [],
}: FeaturedProductsSectionProps) {
  const t = useTranslations("HomePage.FeaturedProducts");

  if (!products || products.length === 0) {
    return null;
  }

  const displayedProducts = products.slice(0, 4);
  const gridClasses = getGridClasses(displayedProducts.length);

  return (
    <section className="py-16 sm:py-24 bg-[#f0fafb] border-y border-teal-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Centered Header */}
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0b8b99]/10 text-[#0b8b99] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("badge")}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#062b56] tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5 max-w-xl leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        {/* Dynamic Products Grid (1 to 4 products) */}
        <motion.div
          className={`grid ${gridClasses}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {displayedProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className="group relative rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:shadow-[#0b8b99]/10 transition-all duration-300 flex flex-col justify-between"
              style={{ borderTopColor: "transparent", borderTopWidth: "3px" }}
              whileHover={{ borderTopColor: "#0b8b99", y: -5 }}
              transition={{ duration: 0.25, ease: EASE_EXPO }}
            >
              <div className="flex-1 flex flex-col">
                {/* Product Image Container */}
                <Link
                  href={`/products/${product.slug}`}
                  className="relative block w-full h-56 bg-gradient-to-b from-slate-50 to-slate-100/60 overflow-hidden border-b border-slate-100 shrink-0"
                >
                  {product.productCardImage ? (
                    <Image
                      src={product.productCardImage}
                      alt={product.productName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Package className="w-12 h-12 stroke-1" />
                    </div>
                  )}

                  {/* Category Pill Tag */}
                  {product.categoryName && (
                    <span className="absolute top-3.5 left-3.5 rtl:right-3.5 rtl:left-auto px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/95 text-[#062b56] backdrop-blur-md shadow-xs border border-slate-200/80">
                      {product.categoryName}
                    </span>
                  )}

                
                </Link>

                {/* Product Content */}
                <div className="p-5 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#062b56] group-hover:text-[#0b8b99] transition-colors duration-200 line-clamp-1">
                      <Link
                        href={`/products/${product.slug}`}
                        className="hover:underline focus:outline-hidden"
                      >
                        {product.productName}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                      {product.productDescription}
                    </p>
                  </div>

                  {/* Manufacturer Row */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-600 min-h-[38px]">
                    {product.manufacturerName ? (
                      <>
                        {product.manufacturerLogo ? (
                          <div className="relative w-5 h-5 shrink-0 rounded bg-slate-50 border border-slate-200/60 overflow-hidden flex items-center justify-center p-0.5">
                            <Image
                              src={product.manufacturerLogo}
                              alt={product.manufacturerName}
                              fill
                              className="object-contain"
                              sizes="20px"
                            />
                          </div>
                        ) : (
                          <Building2 className="w-3.5 h-3.5 text-[#0b8b99] shrink-0" />
                        )}
                        <span className="truncate max-w-[220px]">
                          <span className="text-slate-400 font-normal mr-1 rtl:ml-1">
                            {t("manufacturer")}:
                          </span>
                          <span className="font-semibold text-slate-700">
                            {product.manufacturerName}
                          </span>
                        </span>
                      </>
                    ) : (
                      <span className="text-slate-400 text-xs">&nbsp;</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0 text-center mt-auto">
                <SecondaryButton
                  href={`/products/${product.slug}`}
                  size="sm"
                  fullWidth
                  icon={
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
                  }
                >
                  {t("viewDetails")}
                </SecondaryButton>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Products Action Button */}
        <motion.div
          className="mt-12 sm:mt-14 flex justify-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.15, ease: EASE_EXPO }}
        >
          <PrimaryButton
            href="/products"
            size="md"
            icon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
          >
            {t("viewAllProducts")}
          </PrimaryButton>
        </motion.div>
      </div>
    </section>
  );
}
