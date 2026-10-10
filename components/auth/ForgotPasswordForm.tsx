"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import {
  createForgotPasswordSchema,
  ForgotPasswordFormValues,
} from "@/server/auth/validators";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/types";
import { EmailInput } from "@/components/inputs/EmailInput";
import { forgotPasswordAction } from "@/app/[locale]/(auth)/forgot-password/actions/forgotPassword";
import { Spinner } from "@/components/common/Spinner";

export default function ForgotPasswordForm() {
  const locale = useLocale();
  const t = useTranslations("ForgotPasswordPage");
  const tResponse = useTranslations("ResponseMessages");

  const isAr = locale === "ar";
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(createForgotPasswordSchema(locale as Locale)),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      const response = await forgotPasswordAction(data.email);

      if (response.success) {
        setIsSuccess(true);
      } else {
        toast.error(
          tResponse(response.message as any) || t("UNEXPECTED_ERROR"),
        );
      }
    } catch (error) {
      toast.error(t("UNEXPECTED_ERROR"));
    }
  };

  return (
    <div className="flex flex-1 w-full min-h-screen items-center justify-center bg-slate-50/60 dark:bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        {isSuccess ? (
          /* SUCCESS STATE */
          <div className="flex flex-col items-center py-4 text-center">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b8b99]/10 text-[#0b8b99] dark:bg-[#0b8b99]/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {t("SUCCESS_TITLE")}
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {t("SUCCESS_DESC")}
            </p>
            <Link
              href="/login"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#0b8b99] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#097581] active:scale-[0.99]"
            >
              {t("BACK_TO_LOGIN")}
            </Link>
          </div>
        ) : (
          /* FORM STATE */
          <div className="text-start">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {t("TITLE")}
              </h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {t("SUBTITLE")}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <EmailInput
                id="email"
                label={t("EMAIL_LABEL")}
                placeholder={t("EMAIL_PLACEHOLDER")}
                autoComplete="email"
                disabled={isSubmitting}
                error={errors.email?.message}
                {...register("email")}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b8b99] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#097581] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Spinner />
                    <span>{t("SENDING")}</span>
                  </>
                ) : (
                  <span>{t("SEND_LINK")}</span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-xs font-medium text-slate-600 transition-colors hover:text-[#0b8b99] dark:text-slate-400 dark:hover:text-[#0b8b99]"
              >
                {isAr ? "→" : "←"} {t("BACK_TO_LOGIN")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
