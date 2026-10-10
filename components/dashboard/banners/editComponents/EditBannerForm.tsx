"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import {
  updateBannerSchema,
  UpdateBannerFormType,
} from "@/server/banner/validators";
import { BannerById } from "@/server/banner/types";
import BasicInfo from "./BasicInfo";
import MediaSection from "./MediaSection";
import FormActions from "./FormActions";

interface Props {
  banner: BannerById;
  action: (
    data: UpdateBannerFormType,
    id: string,
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

export default function EditBannerForm({ action, banner }: Props) {
  const router = useRouter();
  const methods = useForm<UpdateBannerFormType>({
    resolver: zodResolver(updateBannerSchema),
    defaultValues: banner,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: UpdateBannerFormType) => {
    try {
      const result = await action(data, banner.id);
      if (result.status === 401) {
        toast.error(result.message);
        router.push("/login");
        return;
      }
      if (result.status === 403) {
        toast.error(result.message);
        router.push("/");
        return;
      }
      if (result.status === 200) {
        toast.success(result.message || "Banner updated successfully.");
        router.push("/admin/dashboard/banners");
        return;
      }
      toast.error(result.message || "Failed to update banner.");
    } catch (err) {
      toast.error("An unexpected error occurred while updating the banner.");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Navigation & Header */}
        <div>
          <Link
            href="/admin/dashboard/banners"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0b8b99] transition-colors mb-4 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to banners</span>
          </Link>

          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl md:text-2xl font-bold text-[#062b56]">
              Edit banner
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Update promotional banner details and image for {banner.nameEn}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-busy={isSubmitting}>
          <BasicInfo />
          <MediaSection />
          <FormActions />
        </form>
      </div>
    </FormProvider>
  );
}
