"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { verifyEmailAction } from "@/app/[locale]/(auth)/verify-email/actions/verifyEmail";
import { Spinner } from "@/components/common/Spinner";

type VerificationState = "loading" | "success" | "already-verified" | "error";

export default function VerifyEmailForm() {
  const params = useParams();
  const t = useTranslations("VerifyEmail");

  const [status, setStatus] = useState<VerificationState>("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const userId = params.userId as string;
        const token = params.token as string;

        const response = await verifyEmailAction(userId, token);

        if (response.success) {
          if (response.message === "ACCOUNT_ALREADY_VERIFIED") {
            setStatus("already-verified");
          } else {
            setStatus("success");
          }
        } else {
          setStatus("error");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    if (params.userId && params.token) {
      verifyEmail();
    }
  }, [params]);

  return (
    <div className="flex flex-1 w-full min-h-screen items-center justify-center bg-slate-50/60 dark:bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8 text-center">
        {/* LOADING STATE */}
        {status === "loading" && (
          <div className="flex flex-col items-center py-4">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b8b99]/10 text-[#0b8b99]">
              <Spinner className="h-7 w-7 animate-spin text-[#0b8b99]" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {t("VERIFYING")}
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {t("VERIFYING_DESC")}
            </p>
          </div>
        )}

        {/* SUCCESS STATE */}
        {status === "success" && (
          <div className="flex flex-col items-center py-4">
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
              {t("SUCCESS")}
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
        )}

        {/* ALREADY VERIFIED STATE */}
        {status === "already-verified" && (
          <div className="flex flex-col items-center py-4">
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
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {t("ALREADY_VERIFIED")}
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {t("ALREADY_VERIFIED_DESC")}
            </p>
            <Link
              href="/login"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#0b8b99] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#097581] active:scale-[0.99]"
            >
              {t("PROCEED_TO_LOGIN")}
            </Link>
          </div>
        )}

        {/* ERROR STATE */}
        {status === "error" && (
          <div className="flex flex-col items-center py-4">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {t("ERROR")}
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {t("ERROR_DESC")}
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.99] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {t("BACK_TO_HOME")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
