"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import {
  Package,
  Building2,
  ArrowLeft,
  FileCheck2,
  Tag,
  ShieldCheck,
} from "lucide-react";
import { PrimaryButton } from "@/components/common";
import { ProductDetails } from "@/server/products/types";

interface ProductDetailsSectionProps {
  product: ProductDetails;
}

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ProductDetailsSection({
  product,
}: ProductDetailsSectionProps) {
  const t = useTranslations("ProductDetailsPage");

  const allImages = React.useMemo(() => {
    const list: string[] = [];
    if (product.productCardImage) list.push(product.productCardImage);
    if (product.productImages && product.productImages.length > 0) {
      product.productImages.forEach((img) => {
        if (img && !list.includes(img)) {
          list.push(img);
        }
      });
    }
    return list;
  }, [product.productCardImage, product.productImages]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const activeImage = allImages[selectedImageIndex] || product.productCardImage;

  return (
    <section className="bg-white py-12 lg:py-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0b8b99] transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{t("backToProducts")}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Gallery (5 cols on lg) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Main Image Display */}
            <div className="relative w-full h-[360px] sm:h-[460px] rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden shadow-xs">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE_EXPO }}
                  className="relative w-full h-full"
                >
                  {activeImage ? (
                    <Image
                      src={activeImage}
                      alt={product.productName}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Package className="w-20 h-20 stroke-1" />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Category Floating Pill */}
              <span className="absolute top-4 left-4 rtl:right-4 rtl:left-auto px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 text-[#062b56] backdrop-blur-md shadow-xs border border-slate-200/80 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#0b8b99]" />
                {product.categoryName}
              </span>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {allImages.map((img, idx) => {
                  const isSelected = idx === selectedImageIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "border-[#0b8b99] shadow-md scale-105"
                          : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.productName} preview ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Details Info (6 cols on lg) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Header Badge & Title */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#0b8b99]/10 text-[#0b8b99] mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t("badge")}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#062b56] leading-tight">
                {product.productName}
              </h1>
            </div>

            {/* Manufacturer Badge */}
            {product.manufacturerName && (
              <div className="inline-flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                {product.manufacturerLogo ? (
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-white">
                    <Image
                      src={product.manufacturerLogo}
                      alt={product.manufacturerName}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-[#0b8b99]/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-[#0b8b99]" />
                  </div>
                )}
                <div className="text-xs">
                  <span className="text-slate-400 block font-normal">
                    {t("manufacturer")}
                  </span>
                  <span className="font-bold text-[#062b56] text-sm">
                    {product.manufacturerName}
                  </span>
                </div>
              </div>
            )}

            {/* Category Banner & Description Card */}
            <div className="rounded-xl p-5 bg-[#f0fafb] border border-[#0b8b99]/20 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#062b56] font-bold text-sm">
                <Tag className="w-4 h-4 text-[#0b8b99]" />
                <span>{product.categoryName}</span>
              </div>
              {product.categoryDescription && (
                <p className="text-xs text-slate-600 leading-relaxed">
                  {product.categoryDescription}
                </p>
              )}
            </div>

            {/* Product Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-[#062b56]  tracking-wider">
                {t("badge")}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {product.productDescription}
              </p>
            </div>

            {/* Action CTA Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              <PrimaryButton
                href={`/submit-purchase-request?productId=${product.id}`}
                size="lg"
                icon={<FileCheck2 className="w-5 h-5" />}
              >
                {t("requestQuote")}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
