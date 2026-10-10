"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Mail, Phone, MessageSquare, ArrowRight } from "lucide-react";
import { PrimaryButton } from "@/components/common";

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ContactCTA() {
  const t = useTranslations("HomePage.ContactCTA");

  return (
    <section className="py-16 sm:py-20 bg-[#f0fafb] border-t border-teal-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          className="bg-white rounded-2xl border border-teal-100 overflow-hidden shadow-sm"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 2, ease: EASE_EXPO }}
        >
          <div className="h-0.75 w-full bg-linear-to-r from-[#062b56] to-[#0b8b99]" />

          <div className="p-8 sm:p-12 flex flex-col items-center text-center space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-[#0b8b99]/10 text-[#0b8b99]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t("badge")}</span>
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#062b56] tracking-tight max-w-5xl">
              {t("title")}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              {t("description")}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-700 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0b8b99]/10 text-[#0b8b99] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left rtl:text-right">
                  <span className="text-slate-400 block text-[11px]">
                    {t("emailLabel")}
                  </span>
                  <span className="font-semibold text-[#062b56]">
                    {t("emailValue")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0b8b99]/10 text-[#0b8b99] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left rtl:text-right">
                  <span className="text-slate-400 block text-[11px]">
                    {t("phoneLabel")}
                  </span>
                  <span className="font-semibold text-[#062b56]">
                    {t("phoneValue")}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <PrimaryButton
                href="/about/#contact-us"
                icon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
              >
                {t("button")}
              </PrimaryButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
