import React from "react";
import { Locale } from "@/types";
import { getAllCategoriesByLocale } from "@/server/categories/services";
import { getFeaturedProductsByLocale } from "@/server/products/services";
import { getAllBannersByLocale } from "@/server/banner/services";
import { generateStaticMetadata } from "@/lib/constants/metadata";
import {
  HeroSection,
  AboutSection,
  CategoriesSection,
  FeaturedProductsSection,
  WhyMuralSection,
  PurchaseRequestCTA,
  ContactCTA,
  BannerSection,
} from "@/components/home";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return generateStaticMetadata("home", locale);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const [categoriesRes, featuredProductsRes, bannersRes] = await Promise.all([
    getAllCategoriesByLocale(locale),
    getFeaturedProductsByLocale(locale),
    getAllBannersByLocale(locale),
  ]);

  const categories = categoriesRes?.categories || [];
  const featuredProducts = featuredProductsRes?.data || [];
  const banners = bannersRes.banners || [];

  return (
    <main className="flex flex-col w-full min-h-screen">
      <BannerSection banners={banners} />
      <HeroSection />
      <AboutSection />
      {/* <CategoriesSection categories={categories} />*/}
      <FeaturedProductsSection products={featuredProducts} />
      <WhyMuralSection />
      <PurchaseRequestCTA />
      <ContactCTA />
    </main>
  );
}
