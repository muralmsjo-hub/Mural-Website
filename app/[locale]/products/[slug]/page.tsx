import { notFound } from "next/navigation";
import { Locale } from "@/types";
import {
  getProductBySlugAndLocale,
  getRelatedProductsByProductSlug,
} from "@/server/products/services";
import ProductDetailsSection from "@/components/products/details/ProductDetailsSection";
import RelatedProductsSection from "@/components/products/details/RelatedProductsSection";

import { generateDynamicMetadata } from "@/lib/constants/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const res = await getProductBySlugAndLocale(locale, slug);
  if (!res?.success || !res.data) {
    return {
      title: locale === "ar" ? "المنتج غير موجود" : "Product Not Found",
    };
  }

  return generateDynamicMetadata.page({
    type: "products",
    name: res.data.productName,
    description: res.data.productDescription,
    itemPath: slug,
    imageUrl: res.data.productCardImage,
    locale,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  const [productRes, relatedRes] = await Promise.all([
    getProductBySlugAndLocale(locale, slug),
    getRelatedProductsByProductSlug(locale, slug, 3),
  ]);

  if (!productRes?.success || !productRes.data) {
    notFound();
  }

  const product = productRes.data;
  const relatedProducts =
    relatedRes?.success && relatedRes.data ? relatedRes.data : [];

  return (
    <main className="w-full min-h-screen">
      <ProductDetailsSection product={product} />
      <RelatedProductsSection products={relatedProducts} locale={locale} />
    </main>
  );
}
