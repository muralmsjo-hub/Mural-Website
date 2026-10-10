import React from "react";
import { Locale } from "@/types";
import { getAllProductsByLocale } from "@/server/products/services";
import { getCategoriesNameAndIdByLocale } from "@/server/categories/services";
import { generateStaticMetadata } from "@/lib/constants/metadata";
import {
  ProductsHeroSection,
  ProductsClientContainer,
} from "@/components/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return generateStaticMetadata("products", locale);
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  // Parse page parameter
  const rawPage = resolvedSearchParams.page;
  const page =
    typeof rawPage === "string" ? Math.max(1, parseInt(rawPage, 10) || 1) : 1;

  // Parse category/categories parameters
  const rawCategories =
    resolvedSearchParams.categories || resolvedSearchParams.category;
  const categoryParamString = Array.isArray(rawCategories)
    ? rawCategories.join(",")
    : rawCategories || "";
  const selectedCategoryIds = categoryParamString
    ? categoryParamString
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const [productsRes, categoriesRes] = await Promise.all([
    getAllProductsByLocale(locale, {
      page,
      take: 9,
      categories: selectedCategoryIds.length > 0 ? selectedCategoryIds : null,
    }),
    getCategoriesNameAndIdByLocale(locale),
  ]);

  const productsData = productsRes?.data;
  const products = productsData?.products || [];
  const pagination = productsData?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: products.length,
    itemsPerPage: 9,
  };

  const categoriesList = categoriesRes?.categories || [];

  return (
    <main className="flex flex-col w-full min-h-screen">
      <ProductsHeroSection />
      <ProductsClientContainer
        initialProducts={products}
        initialPagination={pagination}
        categories={categoriesList}
        selectedCategoryIds={selectedCategoryIds}
        locale={locale}
      />
    </main>
  );
}
