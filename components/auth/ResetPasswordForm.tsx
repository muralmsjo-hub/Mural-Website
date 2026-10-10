"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  createResetPasswordSchema,
  ResetPasswordFormValues,
} from "@/server/auth/validators";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/types";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import { resetPasswordAction } from "@/app/[locale]/(auth)/reset-password/actions/resetPassword";
import { Spinner } from "@/components/common/Spinner";

export default function ResetPasswordForm() {
  const params = useParams();
  const locale = useLocale() as Locale;
  const t = useTranslations("ResetPasswordPage");
  const tResponse = useTranslations("ResponseMessages");
  const isAr = locale === "ar";
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(createResetPasswordSchema(locale as Locale)),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      const token = params.token as string;
      const response = await resetPasswordAction(
        token,
        data.password,
        data.confirmPassword,
      );
      if (response.success) {
        setIsSuccess(true);
      } else {
        toast.error(tResponse(response.message as any) || t("UNEXPECTED_ERROR"));
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
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
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
                  d="M4.5 12.75l6 6 9-13.5"
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
              {t("PROCEED_TO_LOGIN")}
            </Link>
          </div>
        ) : (
          /* FORM STATE */
          <div>
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {t("TITLE")}
              </h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {t("SUBTITLE")}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <PasswordInput
                id="password"
                label={t("PASSWORD_LABEL")}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={isSubmitting}
                isAr={isAr}
                error={errors.password?.message}
                {...register("password")}
              />

              <PasswordInput
                id="confirmPassword"
                label={t("CONFIRM_PASSWORD_LABEL")}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={isSubmitting}
                isAr={isAr}
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b8b99] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#097581] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Spinner />
                    <span>{t("RESETTING")}</span>
                  </>
                ) : (
                  <span>{t("RESET_PASSWORD")}</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
