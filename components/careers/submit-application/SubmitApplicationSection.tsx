"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowLeft, Briefcase, Clock } from "lucide-react";
import CareerApplicationForm from "@/components/careers/submit-application/CareerApplicationForm";
import { CareerDetails } from "@/server/careers/types";
import { Locale } from "@/types";

interface SubmitApplicationSectionProps {
  career: CareerDetails;
  locale: Locale;
}

export default function SubmitApplicationSection({
  career,
  locale,
}: SubmitApplicationSectionProps) {
  const t = useTranslations("ApplicationPage");
  const isAr = locale === "ar";

  return (
    <section className="py-12 sm:py-16 bg-[#f0fafb] min-h-screen">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8 max-w-6xl">
        {/* Back Link Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0b8b99] hover:text-[#062b56] transition-colors"
          >
            <ArrowLeft className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
            <span>{t("BACK_TO_CAREERS")}</span>
          </Link>
        </div>

        {/* Position Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-8 shadow-xs mb-8 flex flex-col sm:flex-row-reverse sm:items-center justify-between gap-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#062b56] to-[#0b8b99] text-white flex items-center justify-center shrink-0 shadow-md">
            <Briefcase className="w-7 h-7 stroke-1.5" />
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold text-[#0b8b99]  tracking-wider block mb-1">
                {t("APPLYING_FOR_POSITION")}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062b56]">
                {career.position}
              </h1>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
              {career.role && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0b8b99]" />
                  <span>{career.role}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Modular Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <CareerApplicationForm
            careerId={career.id}
            locale={locale}
            redirectToHomeOnSuccess={true}
          />
        </motion.div>
      </div>
    </section>
  );
}
