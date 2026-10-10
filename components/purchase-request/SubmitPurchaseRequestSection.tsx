"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowLeft, ClipboardList } from "lucide-react";
import PurchaseRequestForm from "@/components/purchase-request/PurchaseRequestForm";
import { Locale } from "@/types";

interface SubmitPurchaseRequestSectionProps {
  productOptions: { value: string; label: string }[];
  initialProductId?: string;
  locale: Locale;
}

export default function SubmitPurchaseRequestSection({
  productOptions,
  initialProductId,
  locale,
}: SubmitPurchaseRequestSectionProps) {
  const t = useTranslations("PurchaseRequestPage");
  const isAr = locale === "ar";

  return (
    <section className="py-12 sm:py-16 bg-[#f0fafb] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Back Link Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0b8b99] hover:text-[#062b56] transition-colors"
          >
            <ArrowLeft className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
            <span>{t("BACK_TO_PRODUCTS")}</span>
          </Link>
        </div>

        {/* Header Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#062b56] to-[#0b8b99] text-white flex items-center justify-center shrink-0 shadow-md">
            <ClipboardList className="w-7 h-7 stroke-1.5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062b56]">
              {t("PAGE_TITLE")}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              {t("PAGE_SUBTITLE")}
            </p>
          </div>
        </motion.div>

        {/* Purchase Request Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <PurchaseRequestForm
            productOptions={productOptions}
            initialProductId={initialProductId}
            locale={locale}
          />
        </motion.div>
      </div>
    </section>
  );
}
