import React from "react";
import { Metadata } from "next";
import { getProductsForSelection } from "@/server/products/services";
import SubmitPurchaseRequestSection from "@/components/purchase-request/SubmitPurchaseRequestSection";
import { Locale } from "@/types";

interface SubmitPurchaseRequestPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    productId?: string;
  }>;
}

import { generateStaticMetadata } from "@/lib/constants/metadata";

export async function generateMetadata({
  params,
}: SubmitPurchaseRequestPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale || "en") as Locale;
  return generateStaticMetadata("submitPurchaseRequest", locale);
}

export default async function SubmitPurchaseRequestPage({
  params,
  searchParams,
}: SubmitPurchaseRequestPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const locale = (resolvedParams.locale || "en") as Locale;
  const initialProductId = resolvedSearchParams.productId;

  const productsResult = await getProductsForSelection(locale);

  const productOptions = productsResult.data || [];

  return (
    <main className="min-h-screen bg-[#f0fafb]">
      <SubmitPurchaseRequestSection
        productOptions={productOptions}
        initialProductId={initialProductId}
        locale={locale}
      />
    </main>
  );
}
