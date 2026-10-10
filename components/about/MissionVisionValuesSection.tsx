"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Target, Compass, Award, ShieldCheck, HeartHandshake, Truck, BookmarkCheck } from "lucide-react";

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 2, ease: EASE_EXPO } },
};

const cardContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_EXPO } },
};

export default function MissionVisionValuesSection() {
  const t = useTranslations("AboutPage.MissionVisionValues");

  const values = [
    {
      icon: ShieldCheck,
      titleKey: "value1Title",
      descKey: "value1Desc",
      color: "text-[#0b8b99] bg-[#0b8b99]/10 border-[#0b8b99]/20",
    },
    {
      icon: Award,
      titleKey: "value2Title",
      descKey: "value2Desc",
      color: "text-[#062b56] bg-[#062b56]/10 border-[#062b56]/20",
    },
    {
      icon: Truck,
      titleKey: "value3Title",
      descKey: "value3Desc",
      color: "text-[#0b8b99] bg-[#0b8b99]/10 border-[#0b8b99]/20",
    },
    {
      icon: HeartHandshake,
      titleKey: "value4Title",
      descKey: "value4Desc",
      color: "text-[#062b56] bg-[#062b56]/10 border-[#062b56]/20",
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
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0b8b99]/10 text-[#0b8b99] border border-[#0b8b99]/20">
              <BookmarkCheck className="w-3.5 h-3.5 text-[#0b8b99]" />
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

        {/* Mission & Vision Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.25 }}
        >
          {/* Mission Card */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden rtl:text-right ltr:text-left group hover:shadow-md hover:border-[#0b8b99]/40 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0b8b99]" />
            <div className="w-13 h-13 rounded-2xl bg-[#0b8b99]/10 text-[#0b8b99] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 border border-[#0b8b99]/20">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#062b56] mb-3 group-hover:text-[#0b8b99] transition-colors">
              {t("missionTitle")}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t("missionDesc")}
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden rtl:text-right ltr:text-left group hover:shadow-md hover:border-[#062b56]/40 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#062b56]" />
            <div className="w-13 h-13 rounded-2xl bg-[#062b56]/10 text-[#062b56] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 border border-[#062b56]/20">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#062b56] mb-3 group-hover:text-[#0b8b99] transition-colors">
              {t("visionTitle")}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t("visionDesc")}
            </p>
          </motion.div>
        </motion.div>

        {/* Core Values Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-[#062b56]">
              {t("valuesTitle")}
            </h3>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={cardContainer}
          >
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={idx}
                  variants={cardItem}
                  whileHover={{ y: -5, transition: { duration: 0.25 } }}
                  className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#0b8b99]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between rtl:text-right ltr:text-left group"
                >
                  <div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 border transition-transform duration-300 group-hover:scale-105 ${val.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[#062b56] group-hover:text-[#0b8b99] transition-colors">
                      {t(val.titleKey as any)}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {t(val.descKey as any)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
