"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { TranslatedBanner } from "@/server/banner/types";
import { useTranslations } from "next-intl";
import { PrimaryButton, SecondaryButton } from "../common";
import { ArrowRight, FileText } from "lucide-react";

interface BannerSectionProps {
  banners: TranslatedBanner[];
}

const AUTOPLAY_INTERVAL = 3000; // 3 seconds per banner

export default function BannerSection({ banners }: BannerSectionProps) {
  const t = useTranslations("Home");
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = banners?.length ?? 0;

  const nextBanner = useCallback(() => {
    if (total <= 1) return;
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prevBanner = useCallback(() => {
    if (total <= 1) return;
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay timer
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [total, isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextBanner();
      } else {
        prevBanner();
      }
    }
    touchStartX.current = null;
  };

  if (!banners || banners.length === 0) {
    return null;
  }

  const activeBanner = banners[current] || banners[0];

  return (
    <section
      className="relative w-full bg-[#062b56] text-white overflow-hidden border-b border-white/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Hero Banner Stage */}
      <div className="relative h-120 sm:h-135 md:h-145 lg:h-155 w-full overflow-hidden">
        {/* Background Image Layer with Smooth Fade Transitions */}
        {banners.map((banner, index) => {
          const isActive = index === current;
          return (
            <div
              key={banner.id || index}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                isActive
                  ? "opacity-100 z-10 scale-100"
                  : "opacity-0 z-0 scale-105 pointer-events-none"
              }`}
            >
              <Image
                src={banner.image}
                alt={banner.name}
                fill
                priority={index === 0}
                className="object-cover object-center transform transition-transform duration-10000 ease-out scale-105"
              />
              {/* Multi-stage Professional Gradient Overlays */}
              <div className="absolute inset-0 bg-linear-to-t from-[#062b56] via-[#062b56]/60 to-black/30 backdrop-blur-[0.5px]" />
              <div className="absolute inset-0 bg-linear-to-r from-[#062b56] via-[#062b56]/70 to-transparent rtl:bg-linear-to-l" />
            </div>
          );
        })}

        {/* Ambient Teal Radial Overlay */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0b8b99]/15 rounded-full blur-3xl pointer-events-none z-15 animate-pulse duration-7000" />

        {/* Main Content Container */}
        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-8 sm:py-10 md:py-12">
          {/* Center Content & Title with Entrance Animation */}
          <div
            key={activeBanner.id || current}
            className="max-w-2xl space-y-6 my-auto pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out"
          >
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
                {activeBanner.name}
              </h1>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <PrimaryButton
                href="/products"
                icon={
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                }
                fullWidth={false}
                className="w-full sm:w-auto hover:shadow-lg hover:shadow-[#0b8b99]/30 transition-all duration-300 active:scale-[0.98]"
              >
                {t("Banner.exploreProducts")}
              </PrimaryButton>

              <SecondaryButton
                href="/submit-purchase-request"
                variant="inverse"
                icon={<FileText className="w-4 h-4 text-teal-300" />}
                iconPosition="left"
                fullWidth={false}
                className="w-full sm:w-auto hover:bg-white/20 transition-all duration-300 active:scale-[0.98]"
              >
                {t("Banner.requestQuote")}
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
