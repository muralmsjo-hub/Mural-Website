"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { TextInput } from "@/components/inputs/TextInput";
import { NewPurchaseOrderRequestFormType } from "@/server/purchase-order-request/validators";

export default function RequesterAddressInfo() {
  const t = useTranslations("PurchaseRequestPage");
  const {
    register,
    formState: { errors },
  } = useFormContext<NewPurchaseOrderRequestFormType>();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[#0b8b99]/10 flex items-center justify-center text-[#0b8b99]">
          <MapPin className="w-4 h-4" />
        </div>
        <h4 className="text-base font-bold text-[#062b56]">
          {t("COMPANY_ADDRESS_SECTION")}
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextInput
          label={t("CITY")}
          placeholder={t("PLACEHOLDER_CITY")}
          register={register("city")}
          error={errors.city}
        />
        <TextInput
          label={t("STREET_NAME")}
          placeholder={t("PLACEHOLDER_STREET_NAME")}
          register={register("streetName")}
          error={errors.streetName}
        />
      </div>
    </div>
  );
}
