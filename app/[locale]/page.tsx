import { Locale } from "@/types";
import { getFeaturedProductsByLocale } from "@/server/products/services";
import { getAllBannersByLocale } from "@/server/banner/services";
import { generateStaticMetadata } from "@/lib/constants/metadata";
import {
  HeroSection,
  AboutSection,
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

  const [featuredProductsRes, bannersRes] = await Promise.all([
    getFeaturedProductsByLocale(locale),
    getAllBannersByLocale(locale),
  ]);

  const featuredProducts = featuredProductsRes?.data || [];
  const banners = bannersRes?.banners || [];

  return (
    <main className="flex flex-col w-full min-h-screen">
      {banners.length > 0 && <BannerSection banners={banners} />}
      <HeroSection />
      <AboutSection />

      {featuredProducts.length > 0 && (
        <FeaturedProductsSection products={featuredProducts} />
      )}
      <WhyMuralSection />
      <PurchaseRequestCTA />
      <ContactCTA />
    </main>
  );
}
