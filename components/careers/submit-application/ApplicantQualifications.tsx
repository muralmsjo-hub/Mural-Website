"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import FileUploader from "@/components/inputs/FileUploader";
import { TextInput } from "@/components/inputs/TextInput";
import { ApplicationFormValues } from "@/server/applications/validators";
import { Locale } from "@/types";

interface ApplicantQualificationsProps {
  locale?: Locale;
}

export default function ApplicantQualifications({
  locale = "en",
}: ApplicantQualificationsProps) {
  const t = useTranslations("ApplicationPage");
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ApplicationFormValues>();

  return (
    <div className="space-y-5">
      {/* Major / Field of Study */}
      <TextInput
        label={t("MAJOR")}
        register={register("major")}
        error={errors.major}
      />

      {/* CV / Resume Upload Component from components/inputs/FileUploader */}
      <div>
        <FileUploader
          name="cv"
          label={t("CV_LABEL")}
          control={control}
          error={errors.cv}
          
          locale={locale}
        />
      </div>
    </div>
  );
}
