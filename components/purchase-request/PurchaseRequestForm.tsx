"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  createNewPurchaseOrderRequestSchema,
  NewPurchaseOrderRequestFormType,
} from "@/server/purchase-order-request/validators";
import { submitPurchaseRequestAction } from "@/app/[locale]/submit-purchase-request/(actions)/submitPurchaseRequest";
import { Locale } from "@/types";
import RequesterCompanyInfo from "./RequesterCompanyInfo";
import RequesterAddressInfo from "./RequesterAddressInfo";
import DeliveryAddressInfo from "./DeliveryAddressInfo";
import ProductSelectionList from "./ProductSelectionList";
import AdditionalRequirementsInfo from "./AdditionalRequirementsInfo";
import PurchaseRequestFormActions from "./PurchaseRequestFormActions";
import PurchaseRequestSuccessState from "./PurchaseRequestSuccessState";

interface PurchaseRequestFormProps {
  productOptions: { value: string; label: string }[];
  initialProductId?: string;
  locale: Locale;
}

export default function PurchaseRequestForm({
  productOptions,
  initialProductId,
  locale,
}: PurchaseRequestFormProps) {
  const t = useTranslations("PurchaseRequestPage");
  const tResponse = useTranslations("ResponseMessages");
  const [submitted, setSubmitted] = useState(false);

  const formSchema = React.useMemo(
    () => createNewPurchaseOrderRequestSchema((key) => t(key)),
    [t],
  );

  const methods = useForm<NewPurchaseOrderRequestFormType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      companyName: "",
      personName: "",
      email: "",
      jobTitle: "",
      phoneNumber: "",
      city: "",
      streetName: "",
      deliveryCity: "",
      deliveryStreetName: "",
      deliveryBuildingNumber: "",
      additionalProductRequirements: "",
      supportingDocuments: "",
      productsAndQuantity: [{ productId: initialProductId || "", quantity: 1 }],
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: NewPurchaseOrderRequestFormType) => {
    try {
      const response = await submitPurchaseRequestAction(data);
      if (response && response.success) {
        setSubmitted(true);
        const successMsg = response.message
          ? tResponse.has(response.message)
            ? tResponse(response.message)
            : t("SUCCESS_TITLE")
          : t("SUCCESS_TITLE");
        toast.success(successMsg);
      } else {
        const errorMsg = response?.message
          ? tResponse.has(response.message)
            ? tResponse(response.message)
            : t("ERROR_MESSAGE")
          : t("ERROR_MESSAGE");
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Error submitting purchase request:", error);
      toast.error(t("ERROR_MESSAGE"));
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    reset({
      companyName: "",
      personName: "",
      email: "",
      jobTitle: "",
      phoneNumber: "",
      city: "",
      streetName: "",
      deliveryCity: "",
      deliveryStreetName: "",
      deliveryBuildingNumber: "",
      additionalProductRequirements: "",
      supportingDocuments: "",
      productsAndQuantity: [{ productId: initialProductId || "", quantity: 1 }],
    });
  };

  return (
    <div
      id="purchase-request-form"
      className="scroll-mt-28 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs"
    >
      {submitted ? (
        <PurchaseRequestSuccessState onReset={handleReset} />
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <RequesterCompanyInfo />
            <hr className="border-slate-100" />
            <RequesterAddressInfo />
            <hr className="border-slate-100" />
            <DeliveryAddressInfo />
            <hr className="border-slate-100" />
            <ProductSelectionList options={productOptions} locale={locale} />
            <hr className="border-slate-100" />
            <AdditionalRequirementsInfo locale={locale} />
            <PurchaseRequestFormActions locale={locale} />
          </form>
        </FormProvider>
      )}
    </div>
  );
}
