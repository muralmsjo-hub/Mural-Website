"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Handshake, ArrowRight, Building2, ExternalLink } from "lucide-react";
import { PrimaryButton } from "@/components/common";
import { PartnerItem } from "@/server/partners/types";

interface OurPartnersSectionProps {
  partners: PartnerItem[];
}

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_EXPO } },
};

export default function OurPartnersSection({
  partners = [],
}: OurPartnersSectionProps) {
  const t = useTranslations("AboutPage.Partners");
  const isRtl = useLocale() === "ar";

  // Create a continuous sequence that fills wide screens even if only 1 partner exists
  const repeatedPartners = useMemo(() => {
    if (!partners || partners.length === 0) return [];
    let list = [...partners];
    // Ensure the base sequence has enough cards to span across wide viewports (>2500px)
    while (list.length < 8) {
      list = [...list, ...partners];
    }
    return list;
  }, [partners]);

  if (!partners || partners.length === 0) {
    return null;
  }

  // Duration scales naturally with item count to keep constant, comfortable scroll speed
  const marqueeDuration = Math.max(25, repeatedPartners.length * 4);

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header - Center Aligned */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14 flex flex-col items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.15 }}
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#062b56]/10 text-[#062b56]">
              <Handshake className="w-3.5 h-3.5 text-[#0b8b99]" />
              <span>{t("badge")}</span>
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-4xl font-bold text-[#062b56] tracking-tight mt-3"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-slate-600 mt-3.5 leading-relaxed max-w-2xl"
          >
            {t("description")}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 flex items-center gap-4">
            <PrimaryButton
              href="/partners"
              size="md"
              icon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
              iconPosition="right"
            >
              {t("viewAllPartners")}
            </PrimaryButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Seamless Continuous Infinite Autoplay Marquee Ribbon */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Soft Left & Right Gradient Mask Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Continuous Infinite Ribbon Track: 2 identical copies; shifting by exactly one copy (50%) loops with no gap */}
        <motion.div
          className="flex w-max items-center"
          animate={{ x: isRtl ? ["0%", "50%"] : ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: marqueeDuration,
              ease: "linear",
            },
          }}
        >
          {[0, 1].map((copyIndex) => (
            <div
              key={`track-copy-${copyIndex}`}
              aria-hidden={copyIndex === 1}
              className="flex items-center gap-6 pe-6 shrink-0"
            >
              {repeatedPartners.map((partner, index) => {
                const CardWrapper = partner.referenceLink ? "a" : "div";
                const wrapperProps = partner.referenceLink
                  ? {
                      href: partner.referenceLink,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {};

                return (
                  <CardWrapper
                    key={`${partner.id}-${copyIndex}-${index}`}
                    {...wrapperProps}
                    className="relative w-52 sm:w-60 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-[#0b8b99]/40 hover:bg-slate-50/80 transition-all duration-300 flex flex-col items-center justify-center text-center group shrink-0 cursor-pointer min-h-[135px]"
                  >
                    {/* External link indicator */}
                    {partner.referenceLink && (
                      <span className="absolute top-3 right-3 rtl:left-3 rtl:right-auto opacity-0 group-hover:opacity-100 text-slate-400 group-hover:text-[#0b8b99] transition-all duration-200">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    )}

                    {partner.logo ? (
                      <div className="relative w-full h-14 flex items-center justify-center">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={150}
                          height={65}
                          className="max-h-12 w-auto object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-[#0b8b99] mb-1 group-hover:bg-[#0b8b99]/10 transition-colors">
                        <Building2 className="w-5 h-5" />
                      </div>
                    )}

                    <span className="text-xs sm:text-sm font-semibold text-[#062b56] mt-2.5 line-clamp-1 group-hover:text-[#0b8b99] transition-colors">
                      {partner.name}
                    </span>
                  </CardWrapper>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
