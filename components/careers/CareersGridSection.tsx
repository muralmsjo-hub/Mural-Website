"use client";

import React from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Briefcase } from "lucide-react";
import CareerCard from "./CareerCard";
import { CareerItem } from "@/server/careers/types";
import { Locale } from "@/types";

interface CareersGridSectionProps {
  careers: CareerItem[];
  locale: Locale;
}

export default function CareersGridSection({
  careers,
  locale,
}: CareersGridSectionProps) {
  const t = useTranslations("CareersPage");

  if (!careers || careers.length === 0) {
    return (
      <section className="py-20 bg-[#f0fafb]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-[#0b8b99]/10 text-[#0b8b99] flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 stroke-1.5" />
            </div>
            <h3 className="text-xl font-bold text-[#062b56]">
              {t("EMPTY_TITLE")}
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              {t("EMPTY_DESCRIPTION")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#f0fafb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* 3 cards per row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careers.map((career, index) => (
            <motion.div
              key={career.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <CareerCard career={career} locale={locale} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
