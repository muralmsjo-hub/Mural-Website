"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";

export default function ApplicationSuccessState() {
  const t = useTranslations("ApplicationPage");

  return (
    <div className="py-12 px-6 text-center bg-[#f0fafb] rounded-2xl border border-[#0b8b99]/30 flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-[#0b8b99]/10 text-[#0b8b99] flex items-center justify-center mb-4">
        <CheckCircle2 className="w-10 h-10 stroke-2" />
      </div>
      <h4 className="text-xl font-bold text-[#062b56]">
        {t("SUCCESS_MESSAGE")}
      </h4>
      <p className="text-sm text-slate-600 mt-2 max-w-md">
        {t("SUCCESS_SUBTITLE")}
      </p>
    </div>
  );
}
