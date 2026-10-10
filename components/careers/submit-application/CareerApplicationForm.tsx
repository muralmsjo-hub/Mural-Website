"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  createApplicationSchema,
  ApplicationFormValues,
} from "@/server/applications/validators";
import { submitApplicationAction } from "@/app/[locale]/submit-application/(actions)/submitApplication";
import { Locale } from "@/types";
import ApplicantBasicInfo from "./ApplicantBasicInfo";
import ApplicantQualifications from "./ApplicantQualifications";
import ApplicationFormActions from "./ApplicationFormActions";
import ApplicationSuccessState from "./ApplicationSuccessState";

interface CareerApplicationFormProps {
  locale: Locale;
  redirectToHomeOnSuccess?: boolean;
  careerId: string;
}

export default function CareerApplicationForm({
  careerId,
  locale,
  redirectToHomeOnSuccess = true,
}: CareerApplicationFormProps) {
  const t = useTranslations("ApplicationPage");
  const tResponse = useTranslations("ResponseMessages");
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const schema = createApplicationSchema(locale);

  const methods = useForm<ApplicationFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { careerId },
  });

  const { handleSubmit, reset, setValue } = methods;

  setValue("careerId", careerId);

  const onSubmit = async (data: ApplicationFormValues) => {
    try {
      const response = await submitApplicationAction(data);

      if (response && response.success) {
        setSubmitted(true);
        const successMsg = response.message
          ? tResponse.has(response.message)
            ? tResponse(response.message)
            : t("SUCCESS_MESSAGE")
          : t("SUCCESS_MESSAGE");
        toast.success(successMsg);
        reset();

        if (redirectToHomeOnSuccess) {
          setTimeout(() => {
            router.push("/");
          }, 1800);
        }
      } else {
        const errorMsg = response?.message
          ? tResponse.has(response.message)
            ? tResponse(response.message)
            : t("ERROR_MESSAGE")
          : t("ERROR_MESSAGE");
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(t("ERROR_MESSAGE"));
    }
  };

  return (
    <div
      id="apply-form"
      className="scroll-mt-28 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs"
    >
      <div className="mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-[#062b56]">
          {t("FORM_TITLE")}
        </h3>
        <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
          {t("FORM_SUBTITLE")}
        </p>
      </div>

      {submitted ? (
        <ApplicationSuccessState />
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <ApplicantBasicInfo />
            <ApplicantQualifications locale={locale} />
            <ApplicationFormActions />
          </form>
        </FormProvider>
      )}
    </div>
  );
}
