"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Package, Building2 } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "@/components/common";
import { FeaturedProduct } from "@/server/products/types";

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface FeaturedProductsSectionProps {
  products: FeaturedProduct[];
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 2, ease: EASE_EXPO } },
};

export default function FeaturedProductsSection({
  products = [],
}: FeaturedProductsSectionProps) {
  const t = useTranslations("HomePage.FeaturedProducts");

  return (
    <section className="py-16 sm:py-24 bg-[#f0fafb] border-y border-teal-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Centered Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 2.05, ease: EASE_EXPO }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-[#062b56]/10 text-[#062b56] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0b8b99]" />
            <span>{t("badge")}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#062b56] tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
            {t("description")}
          </p>
          <div className="mt-6">
            <PrimaryButton
              href="/products"
              size="sm"
              icon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
            >
              {t("viewAllProducts")}
            </PrimaryButton>
          </div>
        </motion.div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                className="group relative rounded-xl border border-teal-100 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                style={{ borderTopColor: "transparent", borderTopWidth: "3px" }}
                whileHover={{ borderTopColor: "#0b8b99", y: -3 }}
                transition={{ duration: 0.75 }}
              >
                <div>
                  <div className="relative w-full h-52 bg-slate-100 overflow-hidden border-b border-slate-100">
                    {product.productCardImage ? (
                      <Image
                        src={product.productCardImage}
                        alt={product.productName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-400"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                        <Package className="w-12 h-12 stroke-1 text-slate-300" />
                      </div>
                    )}
                    {product.categoryName && (
                      <span className="absolute top-3 left-3 rtl:right-3 rtl:left-auto px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/90 text-[#062b56] backdrop-blur-sm shadow-sm border border-slate-200/80">
                        {product.categoryName}
                      </span>
                    )}
                  </div>

                  <div className="p-5 text-center">
                    <h3 className="text-base font-bold text-[#062b56] group-hover:text-[#0b8b99] transition-colors duration-200 line-clamp-1">
                      {product.productName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {product.productDescription}
                    </p>
                    {product.manufacturerName && (
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-600">
                        {product.manufacturerLogo ? (
                          <Image
                            src={product.manufacturerLogo}
                            alt={product.manufacturerName}
                            width={18}
                            height={18}
                            className="object-contain rounded"
                          />
                        ) : (
                          <Building2 className="w-3.5 h-3.5 text-[#0b8b99] shrink-0" />
                        )}
                        <span className="truncate">
                          <span className="text-slate-400 font-normal mr-1 rtl:ml-1">
                            {t("manufacturer")}:
                          </span>
                          <span className="font-semibold text-slate-700">
                            {product.manufacturerName}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 text-center">
                  <SecondaryButton
                    href={`/products/${product.slug}`}
                    size="sm"
                    fullWidth
                    icon={<ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />}
                  >
                    {t("viewDetails")}
                  </SecondaryButton>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-12 text-center border border-teal-100 rounded-xl bg-white text-slate-500 text-sm">
            {t("noProducts")}
          </div>
        )}
      </div>
    </section>
  );
}
