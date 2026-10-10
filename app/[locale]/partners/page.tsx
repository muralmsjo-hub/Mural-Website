import React from "react";
import { Locale } from "@/types";
import { getAllPartnersByLocale } from "@/server/partners/services";
import { PartnersHeroSection, PartnersGridSection } from "@/components/partners";

import { generateStaticMetadata } from "@/lib/constants/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return generateStaticMetadata("partners", locale);
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // Fetch all partners by locale
  const partnersRes = await getAllPartnersByLocale(locale);
  const partners = partnersRes?.partners || [];

  return (
    <main className="w-full min-h-screen">
      <PartnersHeroSection />
      <PartnersGridSection partners={partners} />
    </main>
  );
}
