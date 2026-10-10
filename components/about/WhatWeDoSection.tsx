"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { PackageCheck, Building2, Globe, FileSpreadsheet, Sparkles } from "lucide-react";

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 2, ease: EASE_EXPO } },
};

const cardContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.20,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_EXPO } },
};

export default function WhatWeDoSection() {
  const t = useTranslations("AboutPage.WhatWeDo");

  const services = [
    {
      icon: PackageCheck,
      titleKey: "item1Title",
      descKey: "item1Desc",
      accent: "text-[#0b8b99] bg-[#0b8b99]/10 border-[#0b8b99]/20",
    },
    {
      icon: Building2,
      titleKey: "item2Title",
      descKey: "item2Desc",
      accent: "text-[#062b56] bg-[#062b56]/10 border-[#062b56]/20",
    },
    {
      icon: Globe,
      titleKey: "item3Title",
      descKey: "item3Desc",
      accent: "text-[#0b8b99] bg-[#0b8b99]/10 border-[#0b8b99]/20",
    },
    {
      icon: FileSpreadsheet,
      titleKey: "item4Title",
      descKey: "item4Desc",
      accent: "text-[#062b56] bg-[#062b56]/10 border-[#062b56]/20",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#f0fafb] border-b border-slate-200/80 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.20 }}
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0b8b99]/10 text-[#0b8b99] border border-[#0b8b99]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#0b8b99]" />
              <span>{t("badge")}</span>
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-2xl sm:text-4xl font-bold text-[#062b56] tracking-tight mt-3">
            {t("title")}
          </motion.h2>

          <motion.p variants={fadeUp} className="text-sm sm:text-base text-slate-600 mt-3.5 leading-relaxed max-w-2xl">
            {t("description")}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={cardContainer}
        >
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={cardItem}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#0b8b99]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between rtl:text-right ltr:text-left group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border transition-transform duration-300 group-hover:scale-105 ${item.accent}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#062b56] group-hover:text-[#0b8b99] transition-colors duration-200">
                    {t(item.titleKey as any)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {t(item.descKey as any)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
