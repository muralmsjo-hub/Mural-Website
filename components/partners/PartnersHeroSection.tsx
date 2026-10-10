"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Handshake, Globe2 } from "lucide-react";

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function PartnersHeroSection() {
  const t = useTranslations("PartnersPage.Hero");

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#062b56] via-[#08386e] to-[#0b8b99] text-white py-16 sm:py-24">
      {/* Ambient Glows */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0b8b99]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-80 h-80 bg-[#062b56]/40 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration:2, ease: EASE_EXPO }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0b8b99]/20 text-[#0b8b99] border border-[#0b8b99]/30 mb-4"
        >
          <Handshake className="w-4 h-4" />
          <span>{t("badge")}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.1, ease: EASE_EXPO }}
          className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight max-w-3xl"
        >
          {t("title")}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.2, ease: EASE_EXPO }}
          className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl"
        >
          {t("description")}
        </motion.p>
      </div>
    </section>
  );
}
