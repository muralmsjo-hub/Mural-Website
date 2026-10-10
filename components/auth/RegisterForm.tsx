"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import {
  createRegisterSchema,
  RegisterFormValues,
} from "@/server/auth/validators";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/types";
import { TextInput } from "@/components/inputs/TextInput";
import { EmailInput } from "@/components/inputs/EmailInput";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import { registerAction } from "@/app/[locale]/(auth)/register/actions/register";
import { Spinner } from "@/components/common/Spinner";
import { GoogleIcon } from "../common/GoogleIcon";

export default function RegisterForm() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const t = useTranslations("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(createRegisterSchema(locale as Locale)),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const result = await registerAction(data);
      console.log("data result: ", data);

      console.log("result: ", result);

      if (result.success) {
        toast.success(
          t(`ResponseMessages.${result.message}`) ||
            t("RegisterPage.SUCCESS_REGISTER"),
        );
        router.push("/login");
      } else {
        toast.error(
          t(`ResponseMessages.${result.message}`) ||
            t("RegisterPage.UNEXPECTED_ERROR"),
        );
      }
    } catch (error) {
      toast.error(t("RegisterPage.UNEXPECTED_ERROR"));
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { redirectTo: "/dashboard" });
  };

  return (
    <div className="flex flex-1 w-full min-h-screen items-center justify-center bg-slate-50/60 dark:bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t("RegisterPage.CREATE_ACCOUNT")}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t("RegisterPage.SUBTITLE")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <TextInput
            id="name"
            label={t("RegisterPage.NAME_LABEL")}
            placeholder={t("RegisterPage.NAME_PLACEHOLDER")}
            autoComplete="name"
            disabled={isSubmitting}
            error={errors.name}
            {...register("name")}
          />

          {/* Email Input */}
          <EmailInput
            id="email"
            label={t("RegisterPage.EMAIL_LABEL")}
            placeholder={t("RegisterPage.EMAIL_PLACEHOLDER")}
            autoComplete="email"
            disabled={isSubmitting}
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Password Input */}
          <PasswordInput
            id="password"
            label={t("RegisterPage.PASSWORD_LABEL")}
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isSubmitting}
            isAr={locale === "ar"}
            error={errors.password?.message}
            {...register("password")}
          />

          {/* Confirm Password Input */}
          <PasswordInput
            id="confirmPassword"
            label={t("RegisterPage.CONFIRM_PASSWORD_LABEL")}
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isSubmitting}
            isAr={locale === "ar"}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b8b99] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#097581] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Spinner />
                <span>{t("RegisterPage.CREATING_ACCOUNT")}</span>
              </>
            ) : (
              <span>{t("RegisterPage.REGISTER")}</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="mx-3 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {t("RegisterPage.OR_CONTINUE_WITH")}
          </span>
          <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <GoogleIcon />
          {t("RegisterPage.SIGN_IN_GOOGLE")}
        </button>

        <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
          {t("RegisterPage.ALREADY_HAVE_ACCOUNT")}{" "}
          <Link
            href="/login"
            className="font-semibold text-[#0b8b99] transition-colors hover:underline"
          >
            {t("RegisterPage.SIGN_IN")}
          </Link>
        </p>
      </div>
    </div>
  );
}
