"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { FileText } from "lucide-react";
import TextareaInput from "@/components/inputs/TextareaInput";
import FileUploader from "@/components/inputs/FileUploader";
import { NewPurchaseOrderRequestFormType } from "@/server/purchase-order-request/validators";
import { Locale } from "@/types";

interface AdditionalRequirementsInfoProps {
  locale?: Locale;
}

export default function AdditionalRequirementsInfo({
  locale = "en",
}: AdditionalRequirementsInfoProps) {
  const t = useTranslations("PurchaseRequestPage");
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<NewPurchaseOrderRequestFormType>();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[#0b8b99]/10 flex items-center justify-center text-[#0b8b99]">
          <FileText className="w-4 h-4" />
        </div>
        <h4 className="text-base font-bold text-[#062b56]">
          {t("ADDITIONAL_INFO_SECTION")}
        </h4>
      </div>

      <TextareaInput
        label={t("ADDITIONAL_REQUIREMENTS")}
        placeholder={t("PLACEHOLDER_ADDITIONAL_REQUIREMENTS")}
        register={register("additionalProductRequirements")}
        error={errors.additionalProductRequirements}
      />

      <div className="pt-2">
        <FileUploader<NewPurchaseOrderRequestFormType>
          name="supportingDocuments"
          label={t("SUPPORTING_DOCUMENTS")}
          control={control}
          error={errors.supportingDocuments}
          locale={locale}
        />
      </div>
    </div>
  );
}
