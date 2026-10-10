"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Truck } from "lucide-react";
import { TextInput } from "@/components/inputs/TextInput";
import { NewPurchaseOrderRequestFormType } from "@/server/purchase-order-request/validators";

export default function DeliveryAddressInfo() {
  const t = useTranslations("PurchaseRequestPage");
  const {
    register,
    formState: { errors },
  } = useFormContext<NewPurchaseOrderRequestFormType>();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[#0b8b99]/10 flex items-center justify-center text-[#0b8b99]">
          <Truck className="w-4 h-4" />
        </div>
        <h4 className="text-base font-bold text-[#062b56]">
          {t("DELIVERY_ADDRESS_SECTION")}
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <TextInput
          label={t("DELIVERY_CITY")}
          placeholder={t("PLACEHOLDER_DELIVERY_CITY")}
          register={register("deliveryCity")}
          error={errors.deliveryCity}
        />
        <TextInput
          label={t("DELIVERY_STREET_NAME")}
          placeholder={t("PLACEHOLDER_DELIVERY_STREET_NAME")}
          register={register("deliveryStreetName")}
          error={errors.deliveryStreetName}
        />
        <TextInput
          label={t("DELIVERY_BUILDING_NUMBER")}
          placeholder={t("PLACEHOLDER_DELIVERY_BUILDING_NUMBER")}
          register={register("deliveryBuildingNumber")}
          error={errors.deliveryBuildingNumber}
        />
      </div>
    </div>
  );
}
