"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { FileText, Building, CheckCircle2 } from "lucide-react";
import { PrimaryButton } from "@/components/common";

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function PurchaseRequestCTA() {
  const t = useTranslations("HomePage.PurchaseCTA");

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-linear-to-br from-[#062b56] via-[#073a6e] to-[#0b8b99]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0b8b99]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="bg-white/10 border border-white/15 backdrop-blur-md rounded-2xl p-8 sm:p-14 shadow-2xl flex flex-col items-center text-center space-y-5"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 2, ease: EASE_EXPO }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-white/15 text-emerald-300 border border-white/20">
            <Building className="w-3.5 h-3.5" />
            <span>{t("badge")}</span>
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight max-w-5xl">
            {t("title")}
          </h2>

          <p className="text-sm sm:text-base text-slate-100 max-w-2xl leading-relaxed">
            {t("description")}
          </p>

          <div className="flex items-center justify-center gap-2 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{t("note")}</span>
          </div>

          <div className="pt-2">
            <PrimaryButton
              href="/submit-purchase-request"
              size="lg"
              icon={<FileText className="w-5 h-5" />}
              iconPosition="left"
              className="bg-white text-[#062b56] hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
            >
              {t("button")}
            </PrimaryButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
