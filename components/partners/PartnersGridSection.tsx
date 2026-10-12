"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ExternalLink, Building2 } from "lucide-react";
import { PrimaryButton } from "@/components/common";
import { PartnerItem } from "@/server/partners/types";
import { Locale } from "@/types";

interface PartnersGridSectionProps {
  partners: PartnerItem[];
  locale: Locale;
}

const EASE_SMOOTH = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_SMOOTH,
    },
  },
};

export function PartnersGridSection({
  partners = [],
  locale,
}: PartnersGridSectionProps) {
  const t = useTranslations("PartnersPage.Grid");
  const isAr = locale === "ar";
  if (!partners || partners.length === 0) {
    return (
      <section className="py-20 bg-slate-50 min-h-100 flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl bg-white border border-slate-200 max-w-md mx-auto shadow-xs">
          <Building2 className="w-12 h-12 text-[#0b8b99] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#062b56]">
            {t("noPartners")}
          </h3>
          <p className="text-sm text-slate-500 mt-2">{t("noPartnersDesc")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-[#f0fafb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {partners.map((partner) => {
            const hasLink = Boolean(partner.referenceLink);

            return (
              <motion.div
                key={partner.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: EASE_SMOOTH }}
                className="group relative rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-[#0b8b99]/40 transition-colors duration-300 flex flex-col justify-between items-center text-center will-change-transform"
              >
                <div className="w-full flex flex-col items-center">
                  {/* Full-width Image Container */}
                  <div className="relative w-full h-36 bg-slate-50/70 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                    {partner.logo ? (
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-[#0b8b99]/10 flex items-center justify-center text-[#0b8b99]">
                        <Building2 className="w-7 h-7" />
                      </div>
                    )}
                  </div>

                  {/* Centered Partner Name */}
                  <h3 className="text-xl font-bold text-[#062b56] group-hover:text-[#0b8b99] transition-colors duration-200 text-center">
                    {partner.name}
                  </h3>

                  {/* Centered Partner Description */}
                  {partner.description && (
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed text-center line-clamp-4">
                      {partner.description}
                    </p>
                  )}
                </div>

                {/* Bottom Action: Visit Website Button */}
                <div className="w-full mt-6 pt-5 border-t border-slate-100">
                  {hasLink ? (
                    <PrimaryButton
                      href={partner.referenceLink!}
                      rel="noopener noreferrer"
                      fullWidth
                      size="md"
                      icon={
                        <ExternalLink
                          className={`w-4 h-4 ${isAr ? "rotate-270" : ""}`}
                        />
                      }
                    >
                      {t("visitWebsite")}
                    </PrimaryButton>
                  ) : (
                    <div className="text-xs text-slate-400 italic text-center">
                      {partner.name}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
