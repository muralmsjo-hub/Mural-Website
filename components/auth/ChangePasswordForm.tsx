"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  createChangePasswordSchema,
  ChangePasswordFormValues,
} from "@/server/auth/validators";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/types";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import { changePasswordAction } from "@/app/[locale]/(auth)/change-password/actions/changePassword";
import { useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
import { Spinner } from "@/components/common/Spinner";

export default function ChangePasswordForm() {
  const locale = useLocale() as Locale;
  const t = useTranslations("");
  const isAr = locale === "ar";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(createChangePasswordSchema(locale as Locale)),
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      const response = await changePasswordAction(data);
      if (response.success) {
        const responseKey = `ResponseMessages.${response.message}`;
        const translatedMsg = t(responseKey);
        toast.success(
          translatedMsg !== responseKey
            ? translatedMsg
            : t("ChangePasswordPage.SUCCESS_MESSAGE"),
        );
        router.replace("/");
      } else {
        const responseKey = `ResponseMessages.${response.message}`;
        const translatedMsg = t(responseKey);
        toast.error(
          translatedMsg !== responseKey ? translatedMsg : response.message,
        );
      }
    } catch (error) {
      toast.error(t("ChangePasswordPage.UNEXPECTED_ERROR"));
    }
  };

  return (
    <div className="flex flex-1 w-full min-h-screen items-center justify-center bg-slate-50/60 dark:bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        {/* Header Icon */}
        <div className="mb-6 flex justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b8b99]/10 text-[#0b8b99] dark:bg-[#0b8b99]/20">
            <KeyRound className="h-7 w-7" />
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t("ChangePasswordPage.TITLE")}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t("ChangePasswordPage.SUBTITLE")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <PasswordInput
            id="currentPassword"
            label={t("ChangePasswordPage.CURRENT_PASSWORD_LABEL")}
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={isSubmitting}
            isAr={isAr}
            error={errors.oldPassword?.message}
            {...register("oldPassword")}
          />

          <div className="border-t border-slate-200/80 dark:border-slate-800 my-2"></div>

          <PasswordInput
            id="newPassword"
            label={t("ChangePasswordPage.NEW_PASSWORD_LABEL")}
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isSubmitting}
            isAr={isAr}
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />

          <PasswordInput
            id="confirmNewPassword"
            label={t("ChangePasswordPage.CONFIRM_NEW_PASSWORD_LABEL")}
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
                <span>{t("ChangePasswordPage.UPDATING")}</span>
              </>
            ) : (
              <span>{t("ChangePasswordPage.UPDATE_PASSWORD")}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
