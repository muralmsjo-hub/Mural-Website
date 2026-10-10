import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCareerBySlugAndLocale } from "@/server/careers/services";
import CareerDetailsSection from "@/components/careers/submit-application/CareerDetailsSection";
import { Locale } from "@/types";

interface CareerSlugPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

import { generateDynamicMetadata } from "@/lib/constants/metadata";

export async function generateMetadata({
  params,
}: CareerSlugPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;
  const slug = resolvedParams.slug;

  const result = await getCareerBySlugAndLocale(slug, locale);

  if (!result.success || !result.career) {
    return {
      title: locale === "ar" ? "الوظيفة غير موجودة" : "Career Not Found",
    };
  }

  return generateDynamicMetadata.page({
    type: "careers",
    name: result.career.position,
    description: result.career.description
      ? result.career.description.slice(0, 160)
      : undefined,
    itemPath: slug,
    locale,
  });
}

export default async function CareerSlugPage({ params }: CareerSlugPageProps) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;
  const slug = resolvedParams.slug;

  const result = await getCareerBySlugAndLocale(slug, locale);

  if (!result.success || !result.career) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f0fafb]">
      <CareerDetailsSection career={result.career} locale={locale} />
    </main>
  );
}
