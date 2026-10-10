"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ShieldCheck, FileText, Building2, Award, Truck } from "lucide-react";
import { PrimaryButton } from "@/components/common";

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 2.5, ease: EASE_EXPO } },
};

export default function AboutHeroSection() {
  const t = useTranslations("AboutPage.Hero");

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#062b56] via-[#08386e] to-[#0b8b99] text-white py-20 lg:py-28">
      {/* Background Decorative Grid */}

      {/* Ambient Glows */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0b8b99]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-80 h-80 bg-[#062b56]/40 rounded-full blur-2xl pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.div
          className="flex flex-col items-center text-center space-y-6"
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.25 }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/10 text-teal-200 border border-white/15 backdrop-blur-md shadow-sm">
              <ShieldCheck className="w-4 h-4 text-teal-300 shrink-0" />
              <span>{t("badge")}</span>
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight max-w-4xl"
          >
            {t("title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed font-normal"
          >
            {t("description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="pt-3 flex flex-col sm:flex-row items-center gap-4 justify-center w-full"
          >
            <PrimaryButton
              href="/submit-purchase-request"
              size="lg"
              icon={<FileText className="w-4 h-4 text-black" />}
              iconPosition="left"
              className="bg-white text-[#062b56] hover:bg-slate-100 shadow-md font-semibold"
            >
              {t("requestQuote")}
            </PrimaryButton>
          </motion.div>

         
        </motion.div>
      </div>
    </section>
  );
}
