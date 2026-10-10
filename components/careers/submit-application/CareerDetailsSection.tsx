"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Clock,
  ChevronRight,
  Send,
  Building2,
} from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/common";
import { CareerDetails } from "@/server/careers/types";
import { Locale } from "@/types";

interface CareerDetailsSectionProps {
  career: CareerDetails;
  locale: Locale;
}

export default function CareerDetailsSection({
  career,
  locale,
}: CareerDetailsSectionProps) {
  const t = useTranslations("CareersPage");
  const isAr = locale === "ar";

  return (
    <section className="py-12 sm:py-16 bg-[#f0fafb] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Back Link Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0b8b99] hover:text-[#062b56] transition-colors"
          >
            <ArrowLeft className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
            <span>{t("DETAILS.BACK_TO_CAREERS")}</span>
          </Link>
        </div>

        {/* Position Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="relative bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs overflow-hidden mb-10"
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {career.role && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0b8b99]/10 text-[#0b8b99] border border-[#0b8b99]/20">
                    {career.role}
                  </span>
                )}
                {career.experience && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {career.experience}
                  </span>
                )}
              </div>

              {/* Position Title */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#062b56] tracking-tight">
                {career.position}
              </h1>

              {/* Sub-info */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#0b8b99]" />
                  <span>{t("DETAILS.BRAND_NAME")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#0b8b99]" />
                  <span>{career.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Banner Image if available */}
          {career.image && (
            <div className="relative w-full h-56 sm:h-72 mt-8 rounded-2xl overflow-hidden border border-slate-100">
              <Image
                src={career.image}
                alt={career.position}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </motion.div>

        {/* 2-Column Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* About Position */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
              <h2 className="text-xl font-bold text-[#062b56] mb-4 relative inline-block">
                {t("DETAILS.ABOUT_POSITION")}
                <span className="block w-10 h-0.5 bg-[#0b8b99] mt-1.5 rounded-full" />
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
                {career.description}
              </div>
            </div>

            {/* Requirements & Qualifications */}
            {career.requirements && career.requirements.length > 0 && (
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
                <h2 className="text-xl font-bold text-[#062b56] mb-6 relative inline-block">
                  {t("DETAILS.REQUIREMENTS")}
                  <span className="block w-10 h-0.5 bg-[#0b8b99] mt-1.5 rounded-full" />
                </h2>
                <ul className="space-y-3.5">
                  {career.requirements.map((req, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-slate-700 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#0b8b99] shrink-0 mt-0.5" />
                      <span className="leading-normal font-medium">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar Column (4 Cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            {/* Action Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#0b8b99]/10 text-[#0b8b99] flex items-center justify-center">
                <Briefcase className="w-6 h-6 stroke-1.5" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#062b56]">
                  {t("DETAILS.SIDEBAR_TITLE")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                  {t("DETAILS.SIDEBAR_DESC")}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <PrimaryButton
                  href={`/submit-application/${career.id}`}
                  size="md"
                  fullWidth
                  icon={
                    <Send className={`w-4 h-4 ${isAr ? "rotate-270" : ""}`} />
                  }
                >
                  {t("DETAILS.APPLY_NOW")}
                </PrimaryButton>

                <SecondaryButton
                  href="/careers"
                  size="md"
                  fullWidth
                  icon={
                    <ChevronRight
                      className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`}
                    />
                  }
                >
                  {t("DETAILS.VIEW_ALL")}
                </SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
