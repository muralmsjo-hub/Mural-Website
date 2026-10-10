"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import {
  newPartnerSchema,
  CreatePartnerFormType,
} from "@/server/partners/validators";
import BasicInfo from "./BasicInfo";
import MediaSection from "./MediaSection";
import FormActions from "./FormActions";

interface Props {
  action: (
    data: CreatePartnerFormType,
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

export default function NewPartnerForm({ action }: Props) {
  const router = useRouter();
  const methods = useForm<CreatePartnerFormType>({
    resolver: zodResolver(newPartnerSchema),
    defaultValues: {
      partnerNameEn: "",
      partnerNameAr: "",
      partnerDescriptionEn: "",
      partnerDescriptionAr: "",
      logo: "",
      referenceLink: "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;


  const onSubmit = async (data: CreatePartnerFormType) => {
    try {
      const result = await action(data);
      
      if (result.status === 401) {
        toast.error(result.message);
        router.replace("/login");
        return;
      }

      if (result.status === 403) {
        toast.error(result.message);
        router.replace("/");
        return;
      }
      if (result.status === 201 || result.status === 200) {
        toast.success(result.message || "Partner created successfully.");
        router.replace("/admin/dashboard/partners");
        return;
      }
      toast.error(result.message || "Failed to create partner.");
    } catch (err) {
      toast.error("An unexpected error occurred while creating the partner.");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Navigation & Header */}
        <div>
          <Link
            href="/admin/dashboard/partners"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0b8b99] transition-colors mb-4 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to partners</span>
          </Link>

          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl md:text-2xl font-bold text-[#062b56]">
              Add new partner
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Create a new partner entry with logo, description, and website
              reference link
            </p>
          </div>
        </div>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          aria-busy={isSubmitting}
        >
          <BasicInfo />
          <MediaSection />
          <FormActions />
        </form>
      </div>
    </FormProvider>
  );
}
