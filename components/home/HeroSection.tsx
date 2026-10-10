"use client";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, FileText } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/common";

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  const t = useTranslations("HomePage.Hero");

  return (
    <section className="relative overflow-hidden bg-[#062b56] bg-linear-to-b from-[#062b56] via-[#073266] to-[#052044] text-white py-16 sm:py-20 lg:py-28">
      {/* Ambient glow orbs */}
      <div className="absolute top-0 right-1/4 w-120 h-120 bg-[#0b8b99]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-90 h-90 bg-[#0b8b99]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl z-10">
        {/* Center-aligned content */}
        <motion.div
          className="flex flex-col items-center text-center space-y-6"
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.25 }}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 2, ease: EASE_EXPO }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-teal-300 border border-white/15 backdrop-blur-md shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#0b8b99] shrink-0" />
              <span>{t("badge")}</span>
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 2.25, ease: EASE_EXPO }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-5xl"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 2.25, ease: EASE_EXPO }}
            className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed"
          >
            {t("description")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
