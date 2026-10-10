"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Building2 } from "lucide-react";
import { TextInput } from "@/components/inputs/TextInput";
import { EmailInput } from "@/components/inputs/EmailInput";
import PhoneInput from "@/components/inputs/PhoneNumberInput";
import { NewPurchaseOrderRequestFormType } from "@/server/purchase-order-request/validators";

export default function RequesterCompanyInfo() {
  const t = useTranslations("PurchaseRequestPage");
  const {
    register,
    formState: { errors },
  } = useFormContext<NewPurchaseOrderRequestFormType>();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-[#0b8b99]/10 flex items-center justify-center text-[#0b8b99]">
          <Building2 className="w-4 h-4" />
        </div>
        <h4 className="text-base font-bold text-[#062b56]">
          {t("COMPANY_INFO_SECTION")}
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextInput
          label={t("COMPANY_NAME")}
          placeholder={t("PLACEHOLDER_COMPANY_NAME")}
          register={register("companyName")}
          error={errors.companyName}
        />
        <TextInput
          label={t("PERSON_NAME")}
          placeholder={t("PLACEHOLDER_PERSON_NAME")}
          register={register("personName")}
          error={errors.personName}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <TextInput
          label={t("JOB_TITLE")}
          placeholder={t("PLACEHOLDER_JOB_TITLE")}
          register={register("jobTitle")}
          error={errors.jobTitle}
        />
        <EmailInput
          label={t("EMAIL")}
          placeholder={t("PLACEHOLDER_EMAIL")}
          register={register("email")}
          error={errors.email}
        />
        <PhoneInput
          label={t("PHONE")}
          placeholder={t("PLACEHOLDER_PHONE")}
          register={register("phoneNumber")}
          error={errors.phoneNumber}
        />
      </div>
    </div>
  );
}
