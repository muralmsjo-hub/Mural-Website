"use client";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ShieldCheck, Award, Building2, Truck } from "lucide-react";

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

const ICONS = [Building2, Award, ShieldCheck, Truck];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 2, ease: EASE_EXPO } },
};

const CARDS = [
  { titleKey: "card1Title", descKey: "card1Desc", variant: "teal" },
  { titleKey: "card2Title", descKey: "card2Desc", variant: "navy" },
  { titleKey: "card3Title", descKey: "card3Desc", variant: "teal" },
  { titleKey: "card4Title", descKey: "card4Desc", variant: "navy" },
] as const;

export default function WhyMuralSection() {
  const t = useTranslations("HomePage.WhyMural");

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Centered Header */}
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 2, ease: EASE_EXPO }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-[#0b8b99]/10 text-[#0b8b99] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t("badge")}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#062b56] tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {CARDS.map((card, index) => {
            const Icon = ICONS[index];
            const isTeal = card.variant === "teal";
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group p-6 rounded-xl border border-slate-200 bg-slate-50 shadow-sm flex flex-col items-center text-center cursor-default relative overflow-hidden"
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 32px -8px rgba(11,139,153,0.15)",
                }}
                transition={{ duration: 0.75 }}
              >
                {/* Top accent bar on hover */}
                <div className="absolute top-0 left-0 w-full h-0.75 bg-[#0b8b99] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b" />
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${isTeal ? "text-[#0b8b99] bg-[#0b8b99]/10" : "text-[#062b56] bg-[#062b56]/10"}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#062b56]">
                  {t(card.titleKey)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {t(card.descKey)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
