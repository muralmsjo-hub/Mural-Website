"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Plus, PackageCheck, AlertCircle } from "lucide-react";
import { NewPurchaseOrderRequestFormType } from "@/server/purchase-order-request/validators";
import ProductSelectionItem from "./ProductSelectionItem";
import { Locale } from "@/types";

interface ProductSelectionListProps {
  options: { value: string; label: string }[];
  locale?: Locale;
}

export default function ProductSelectionList({
  options,
  locale = "en",
}: ProductSelectionListProps) {
  const t = useTranslations("PurchaseRequestPage");
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const {
    control,
    formState: { errors },
  } = useFormContext<NewPurchaseOrderRequestFormType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productsAndQuantity",
  });

  const arrayError = errors.productsAndQuantity;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0b8b99]/10 flex items-center justify-center text-[#0b8b99]">
            <PackageCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-[#062b56]">
              {t("PRODUCTS_SECTION")}
            </h4>
            <p className="text-xs text-slate-500">
              {t("PRODUCTS_SECTION_SUB")}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <ProductSelectionItem
            key={field.id}
            index={index}
            options={options}
            onRemove={() => remove(index)}
            isOnlyOne={fields.length === 1}
            dir={dir}
          />
        ))}
      </div>

      {typeof arrayError?.root?.message === "string" && (
        <p className="text-xs text-red-600 flex items-center gap-1.5 pt-1">
          <AlertCircle size={14} />
          <span>{arrayError.root.message}</span>
        </p>
      )}

      <button
        type="button"
        onClick={() => append({ productId: "", quantity: 1 })}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b8b99] hover:text-[#062b56] bg-[#0b8b99]/5 hover:bg-[#0b8b99]/10 px-4 py-2.5 rounded-xl transition-all cursor-pointer border border-[#0b8b99]/20"
      >
        <Plus className="w-4 h-4" />
        <span>{t("ADD_PRODUCT")}</span>
      </button>
    </div>
  );
}
