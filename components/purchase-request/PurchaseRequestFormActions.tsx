"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Loader2, Send } from "lucide-react";
import { NewPurchaseOrderRequestFormType } from "@/server/purchase-order-request/validators";
import { PrimaryButton } from "../common";
import { Locale } from "@/types";

export default function PurchaseRequestFormActions({
  locale,
}: {
  locale: Locale;
}) {
  const t = useTranslations("PurchaseRequestPage");
  const isAr = locale === "ar";
  const {
    formState: { isSubmitting },
  } = useFormContext<NewPurchaseOrderRequestFormType>();

  return (
    <div className="pt-4 border-t border-slate-100 flex items-center justify-center">
      <PrimaryButton type="submit" disabled={isSubmitting} className="w-xl">
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>{t("SUBMITTING")}</span>
          </>
        ) : (
          <>
            <span>{t("SUBMIT_REQUEST")}</span>
            <Send className={`w-4 h-4 ${isAr ? "rotate-270":""}`} />
          </>
        )}
      </PrimaryButton>
    </div>
  );
}
