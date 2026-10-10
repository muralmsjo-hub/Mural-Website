import React from "react";
import { Metadata } from "next";
import { getCareersByLocale } from "@/server/careers/services";
import CareersHeroSection from "@/components/careers/CareersHeroSection";
import CareersGridSection from "@/components/careers/CareersGridSection";
import { Locale } from "@/types";

interface CareersPageProps {
  params: Promise<{
    locale: string;
  }>;
}

import { generateStaticMetadata } from "@/lib/constants/metadata";

export async function generateMetadata({
  params,
}: CareersPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;
  return generateStaticMetadata("careers", locale);
}

export default async function CareersPage({ params }: CareersPageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;

  const result = await getCareersByLocale(locale);
  const careers = result.success && result.careers ? result.careers : [];

  return (
    <main className="min-h-screen bg-[#f0fafb]">
      <CareersHeroSection />
      <CareersGridSection careers={careers} locale={locale} />
    </main>
  );
}
