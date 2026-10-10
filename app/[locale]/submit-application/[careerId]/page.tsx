import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCareerByIdAndLocale } from "@/server/careers/services";
import SubmitApplicationSection from "@/components/careers/submit-application/SubmitApplicationSection";
import { Locale } from "@/types";

interface SubmitApplicationPageProps {
  params: Promise<{
    locale: string;
    careerId: string;
  }>;
}

export async function generateMetadata({
  params,
}: SubmitApplicationPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;
  const careerId = resolvedParams.careerId;

  const result = await getCareerByIdAndLocale(careerId, locale);

  if (!result.success || !result.career) {
    return {
      title: "Submit Application - Mural Medical Supply",
    };
  }

  return {
    title: `Apply for ${result.career.position} - Mural Medical Supply`,
    description: `Submit your job application for the ${result.career.position} position at Mural Medical Supply.`,
  };
}

export default async function SubmitApplicationPage({
  params,
}: SubmitApplicationPageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;
  const careerId = resolvedParams.careerId;

  const result = await getCareerByIdAndLocale(careerId, locale);

  if (!result.success || !result.career) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f0fafb]">
      <SubmitApplicationSection career={result.career} locale={locale} />
    </main>
  );
}
