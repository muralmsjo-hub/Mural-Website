"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Package, ArrowRight, Building2 } from "lucide-react";
import { SecondaryButton } from "@/components/common";
import { ProductItem } from "@/server/products/types";
import { Locale } from "@/types";

interface ProductCardProps {
  product: ProductItem;
  locale: Locale;
}

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ProductCard({ product, locale }: ProductCardProps) {
  const t = useTranslations("ProductsPage.Grid");
  const isAr = locale === "ar";
  const rawDescription = product.productDescription || "";
  const maxDescLength = 80;
  const truncatedDescription =
    rawDescription.length > maxDescLength
      ? `${rawDescription.slice(0, maxDescLength).trim()}...`
      : rawDescription;

  return (
    <motion.div
      className="group relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full"
      style={{ borderTopColor: "transparent", borderTopWidth: "3px" }}
      whileHover={{ borderTopColor: "#0b8b99", y: -5 }}
      transition={{ duration: 0.25, ease: EASE_EXPO }}
    >
      <div className="flex-1 flex flex-col">
        {/* Product Image */}
        <div className="relative w-full h-52 bg-slate-50 overflow-hidden border-b border-slate-100 shrink-0">
          {product.productCardImage ? (
            <Image
              src={product.productCardImage}
              alt={product.productName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-400"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-400">
              <Package className="w-12 h-12 stroke-1 text-slate-300" />
            </div>
          )}

          {/* Category Tag Pill */}
          {product.categoryName && (
            <span className="absolute top-3 left-3 rtl:right-3 rtl:left-auto px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 text-[#062b56] backdrop-blur-md shadow-xs border border-slate-200/80">
              {product.categoryName}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5 text-center flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#062b56] group-hover:text-[#0b8b99] transition-colors duration-200 line-clamp-1 h-6 leading-6">
              {product.productName}
            </h3>
            <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed h-10 flex items-center justify-center">
              {truncatedDescription}
            </p>
          </div>

          {/* Manufacturer Sub-badge (reserved slot height for layout equality) */}
          <div
            className={`mt-4 pt-3 border-t flex items-center justify-center gap-1.5 text-xs text-slate-600 min-h-[36px] ${
              product.manufacturerName
                ? "border-slate-100"
                : "border-transparent opacity-0"
            }`}
          >
            {product.manufacturerName ? (
              <>
                <Building2 className="w-3.5 h-3.5 text-[#0b8b99] shrink-0" />
                <span className="truncate">
                  <span className="text-slate-400 font-normal mr-1 rtl:ml-1">
                    {t("manufacturer")}:
                  </span>
                  <span className="font-semibold text-slate-700">
                    {product.manufacturerName}
                  </span>
                </span>
              </>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        </div>
      </div>

      {/* Product Action */}
      <div className="p-5 pt-0 text-center mt-auto">
        <SecondaryButton
          href={`/products/${product.slug}`}
          size="sm"
          fullWidth
          icon={
            <ArrowRight
              className={`w-3.5 h-3.5  ${isAr ? "rotate-180" : ""}`}
            />
          }
        >
          {t("viewDetails")}
        </SecondaryButton>
      </div>
    </motion.div>
  );
}
