"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { ApplicationFormValues } from "@/server/applications/validators";
import { TextInput } from "@/components/inputs/TextInput";
import { EmailInput } from "@/components/inputs/EmailInput";
import PhoneInput from "@/components/inputs/PhoneNumberInput";

export default function ApplicantBasicInfo() {
  const t = useTranslations("ApplicationPage");
  const {
    register,
    formState: { errors },
  } = useFormContext<ApplicationFormValues>();

  return (
    <div className="space-y-5">
      {/* First Name & Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextInput
          label={t("FIRST_NAME")}
          register={register("firstName")}
          error={errors.firstName}
        />
        <TextInput
          label={t("LAST_NAME")}
          register={register("lastName")}
          error={errors.lastName}
        />
      </div>

      {/* Email & Phone Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <EmailInput
          label={t("EMAIL")}
          register={register("email")}
          error={errors.email}
          
        />
        <PhoneInput
          label={t("PHONE")}
          register={register("phoneNumber")}
          error={errors.phoneNumber}
        />
      </div>
    </div>
  );
}
