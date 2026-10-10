import React from "react";
import { Locale } from "@/types";
import { getAllPartnersByLocale } from "@/server/partners/services";
import { generateStaticMetadata } from "@/lib/constants/metadata";
import {
  AboutHeroSection,
  WhatWeDoSection,
  OurPartnersSection,
  MissionVisionValuesSection,
  ContactFormSection,
} from "@/components/about";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return generateStaticMetadata("aboutUs", locale);
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const partnersRes = await getAllPartnersByLocale(locale);
  const partners = partnersRes?.partners || [];

  return (
    <main className="flex flex-col w-full min-h-screen">
      <AboutHeroSection />
      <WhatWeDoSection />
      <OurPartnersSection partners={partners} />
      <MissionVisionValuesSection />
      <ContactFormSection locale={locale}/>
    </main>
  );
}
