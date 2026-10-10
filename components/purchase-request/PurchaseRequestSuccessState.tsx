"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, RotateCcw } from "lucide-react";

interface PurchaseRequestSuccessStateProps {
  onReset?: () => void;
}

export default function PurchaseRequestSuccessState({
  onReset,
}: PurchaseRequestSuccessStateProps) {
  const t = useTranslations("PurchaseRequestPage");

  return (
    <div className="py-12 px-6 text-center bg-[#f0fafb] rounded-2xl border border-[#0b8b99]/30 flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-[#0b8b99]/10 text-[#0b8b99] flex items-center justify-center mb-4">
        <CheckCircle2 className="w-10 h-10 stroke-2" />
      </div>
      <h4 className="text-2xl font-extrabold text-[#062b56]">
        {t("SUCCESS_TITLE")}
      </h4>
      <p className="text-sm text-slate-600 mt-2.5 max-w-lg leading-relaxed">
        {t("SUCCESS_SUBTITLE")}
      </p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex items-center gap-2 bg-[#062b56] hover:bg-[#0b8b99] text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t("SUBMIT_ANOTHER")}</span>
        </button>
      )}
    </div>
  );
}
