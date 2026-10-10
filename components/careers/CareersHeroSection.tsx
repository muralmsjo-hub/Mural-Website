"use client";

import React from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Briefcase } from "lucide-react";

export default function CareersHeroSection() {
  const t = useTranslations("CareersPage");

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#062b56] via-[#08386e] to-[#0b8b99] text-white pt-20 pb-12">
      {/* Ambient Glows */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0b8b99]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-80 h-80 bg-[#062b56]/40 rounded-full blur-2xl pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#0b8b99] backdrop-blur-md border border-white/10 text-xs font-semibold uppercase tracking-wider mb-4">
            <Briefcase className="w-3.5 h-3.5 text-[#0b8b99]" />
            <span>{t("BADGE")}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {t("TITLE")}
          </h1>

          {/* Subtitle / Description */}
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {t("DESCRIPTION")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
