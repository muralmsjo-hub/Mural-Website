import React from "react";
import { Locale } from "@/types";
import { getAllCategoriesByLocale } from "@/server/categories/services";
import { CategoriesHeroSection, CategoriesBentoGrid } from "@/components/categories";

import { generateStaticMetadata } from "@/lib/constants/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return generateStaticMetadata("categories", locale);
}

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // Fetch all categories by locale
  const categoriesRes = await getAllCategoriesByLocale(locale);
  const categories = categoriesRes?.categories || [];

  return (
    <main className="w-full min-h-screen">
      <CategoriesHeroSection />
      <CategoriesBentoGrid categories={categories} />
    </main>
  );
}
