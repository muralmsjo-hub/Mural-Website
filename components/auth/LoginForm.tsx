"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { createLoginSchema, LoginFormValues } from "@/server/auth/validators";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/types";
import { EmailInput } from "@/components/inputs/EmailInput";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import { Spinner } from "@/components/common/Spinner";
import { GoogleIcon } from "../common/GoogleIcon";

export default function LoginForm() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const t = useTranslations("LoginPage");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(createLoginSchema(locale as Locale)),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!result?.error) {
        toast.success(t("SUCCESS_LOGIN"));

        router.push("/admin/dashbaord");
      } else {
        if (result.code === "EMAIL_NOT_VERIFIED") {
          toast.error(t("EMAIL_NOT_VERIFIED"));
        } else {
          toast.error(t("INVALID_CREDENTIALS"));
        }
      }
    } catch (error) {
      toast.error(t("UNEXPECTED_ERROR"));
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { redirectTo: "/admin/dashbaord" });
  };

  return (
    <div className="flex flex-1 w-full min-h-screen items-center justify-center bg-slate-50/60 dark:bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t("WELCOME_BACK")}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t("SUBTITLE")}
          </p>
        </div>

        {/* Form */}
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

          <PasswordInput
            id="password"
            label={t("PASSWORD_LABEL")}
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={isSubmitting}
            isAr={locale === "ar"}
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="flex items-center justify-end">
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-slate-600 transition-colors hover:text-[#0b8b99] dark:text-slate-400 dark:hover:text-[#0b8b99]"
            >
              {t("FORGOT_PASSWORD")}
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b8b99] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#097581] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Spinner />
                <span>{t("SIGNING_IN")}</span>
              </>
            ) : (
              <span>{t("SIGN_IN")}</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="mx-3 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {t("OR_CONTINUE_WITH")}
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
          {t("SIGN_IN_GOOGLE")}
        </button>

        <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
          {t("NO_ACCOUNT")}{" "}
          <Link
            href="/register"
            className="font-semibold text-[#0b8b99] transition-colors hover:underline"
          >
            {t("CREATE_ONE")}
          </Link>
        </p>
      </div>
    </div>
  );
}
