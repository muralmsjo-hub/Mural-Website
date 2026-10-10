"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Building, Globe2, ArrowRight, ShieldCheck, FileSpreadsheet } from "lucide-react";
import { SecondaryButton } from "@/components/common";

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 2, ease: EASE_EXPO } },
};

export default function AboutSection() {
  const t = useTranslations("HomePage.About");

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="flex flex-col items-center text-center space-y-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-[#0b8b99]/10 text-[#0b8b99]">
              <Building className="w-3.5 h-3.5" />
              <span>{t("badge")}</span>
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-[#062b56] tracking-tight leading-snug max-w-5xl">
            {t("title")}
          </motion.h2>

          <motion.p variants={fadeUp} className="text-base text-slate-600 leading-relaxed max-w-3xl">
            {t("description")}
          </motion.p>

          {/* Feature mini-cards */}
          <motion.div variants={fadeUp} className="w-full pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm flex items-start gap-3 text-left rtl:text-right hover:border-[#0b8b99]/40 hover:shadow-md transition-all duration-250">
              <div className="w-9 h-9 rounded-lg bg-[#0b8b99]/10 text-[#0b8b99] flex items-center justify-center shrink-0">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#062b56]">{t("feature1Title")}</h3>
                <p className="text-xs text-slate-500 mt-1">{t("feature1Desc")}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm flex items-start gap-3 text-left rtl:text-right hover:border-[#0b8b99]/40 hover:shadow-md transition-all duration-250">
              <div className="w-9 h-9 rounded-lg bg-[#062b56]/10 text-[#062b56] flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#062b56]">{t("feature2Title")}</h3>
                <p className="text-xs text-slate-500 mt-1">{t("feature2Desc")}</p>
              </div>
            </div>
          </motion.div>

          {/* Decorative card */}
       

          <motion.div variants={fadeUp}>
            <SecondaryButton href="/about" size="sm" variant="outline" icon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}>
              {t("learnMore")}
            </SecondaryButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
