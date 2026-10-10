"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";
import FormSelect from "@/components/inputs/SelectorInput";
import { TextInput } from "@/components/inputs/TextInput";
import { NewPurchaseOrderRequestFormType } from "@/server/purchase-order-request/validators";

interface ProductSelectionItemProps {
  index: number;
  options: { value: string; label: string }[];
  onRemove: () => void;
  isOnlyOne: boolean;
  dir?: "rtl" | "ltr";
}

export default function ProductSelectionItem({
  index,
  options,
  onRemove,
  isOnlyOne,
  dir = "ltr",
}: ProductSelectionItemProps) {
  const t = useTranslations("PurchaseRequestPage");
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<NewPurchaseOrderRequestFormType>();

  const itemErrors = errors.productsAndQuantity?.[index];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl transition-all duration-200 hover:border-slate-300">
      {/* Product Select */}
      <div className="flex-1 w-full">
        <FormSelect<NewPurchaseOrderRequestFormType>
          name={`productsAndQuantity.${index}.productId`}
          label={`${t("SELECT_PRODUCT")} #${index + 1}`}
          control={control}
          options={options}
          placeholder={t("CHOOSE_PRODUCT_PLACEHOLDER")}
          error={itemErrors?.productId}
          dir={dir}
          className="mb-0"
        />
      </div>

      {/* Quantity Input */}
      <div className="w-full sm:w-36">
        <TextInput
          type="number"
          label={t("QUANTITY")}
          min={1}
          placeholder="1"
          register={register(`productsAndQuantity.${index}.quantity`, {
            valueAsNumber: true,
          })}
          error={itemErrors?.quantity}
        />
      </div>

      {/* Remove Button */}
      {!isOnlyOne && (
        <div className="self-end sm:self-center sm:pt-6">
          <button
            type="button"
            onClick={onRemove}
            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
            title={t("REMOVE_PRODUCT")}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
