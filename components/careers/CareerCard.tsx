"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Briefcase, ArrowRight, Clock, Award } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { PrimaryButton } from "@/components/common";
import { CareerItem } from "@/server/careers/types";
import { Locale } from "@/types";

interface CareerCardProps {
  career: CareerItem;
  locale: Locale;
}

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function CareerCard({ career, locale }: CareerCardProps) {
  const t = useTranslations("CareersPage");
  const isAr = locale === "ar";

  return (
    <motion.div
      className="group relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-[450px]"
      style={{ borderTopColor: "transparent", borderTopWidth: "3px" }}
      whileHover={{ borderTopColor: "#0b8b99", y: -5 }}
      transition={{ duration: 0.25, ease: EASE_EXPO }}
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Banner / Header Image */}
        <Link
          href={`/careers/${career.slug}`}
          className="block relative w-full h-44 bg-gradient-to-br from-slate-900 to-[#062b56] overflow-hidden border-b border-slate-100 shrink-0"
        >
          {career.image ? (
            <Image
              src={career.image}
              alt={career.position}
              fill
              className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#062b56] to-[#0b8b99]/30 text-white/40">
              <Briefcase className="w-12 h-12 stroke-1 text-slate-300/60" />
            </div>
          )}

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto flex flex-wrap gap-1.5 z-10">
            {career.role && (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 text-[#062b56] backdrop-blur-md shadow-xs border border-slate-200/80">
                {career.role}
              </span>
            )}
          </div>

          {career.experience && (
            <span className="absolute bottom-3 right-3 rtl:left-3 rtl:right-auto px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#062b56]/80 text-white backdrop-blur-md border border-white/10">
              {career.experience}
            </span>
          )}
        </Link>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between overflow-hidden">
          <div>
            <Link href={`/careers/${career.slug}`}>
              <h3 className="text-lg font-bold text-[#062b56] group-hover:text-[#0b8b99] transition-colors duration-200 line-clamp-1">
                {career.position}
              </h3>
            </Link>

            <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
              {career.description}
            </p>
          </div>

          {/* Key Specs Row */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            {career.requirements && career.requirements.length > 0 ? (
              <div className="flex items-center gap-1.5 text-slate-600">
                <Award className="w-3.5 h-3.5 text-[#0b8b99] shrink-0" />
                <span>
                  {t("REQUIREMENTS_COUNT", {
                    count: career.requirements.length,
                  })}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-[#0b8b99] shrink-0" />
                <span>Full-time</span>
              </div>
            )}

            <Link
              href={`/careers/${career.slug}`}
              className="text-xs font-semibold text-[#0b8b99] hover:underline"
            >
              {t("VIEW_POSITION")}
            </Link>
          </div>
        </div>
      </div>

      {/* Card Action - Apply Button */}
      <div className="p-5 pt-0 text-center shrink-0">
        <PrimaryButton
          href={`/submit-application/${career.id}`}
          size="sm"
          fullWidth
          icon={
            <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
          }
        >
          {t("DETAILS.APPLY_NOW")}
        </PrimaryButton>
      </div>
    </motion.div>
  );
}
