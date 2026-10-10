"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { PrimaryButton } from "@/components/common";
import { ApplicationFormValues } from "@/server/applications/validators";

export default function ApplicationFormActions() {
  const t = useTranslations("ApplicationPage");
  const {
    formState: { isSubmitting },
  } = useFormContext<ApplicationFormValues>();

  return (
    <div className="pt-3 w-xl m-auto">
      <PrimaryButton
        type="submit"
        size="lg"
        fullWidth
        disabled={isSubmitting}
        icon={isSubmitting ? <Send className="w-4 h-4" /> : null}
      >
        {isSubmitting ? t("SUBMITTING") : t("SUBMIT_APPLICATION")}
      </PrimaryButton>
    </div>
  );
}
