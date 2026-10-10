"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Briefcase } from "lucide-react";
import {
  updateCareerSchema,
  UpdateCareerFormType,
} from "@/server/careers/validators";
import { CareerById } from "@/server/careers/types";
import BasicInfo from "./BasicInfo";
import MediaSection from "./MediaSection";
import FormActions from "./FormActions";

interface Props {
  career: CareerById;
  action: (
    data: UpdateCareerFormType,
    id: string,
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

export default function EditCareerForm({ action, career }: Props) {
  const router = useRouter();
  const methods = useForm<UpdateCareerFormType>({
    resolver: zodResolver(updateCareerSchema),
    defaultValues: career,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: UpdateCareerFormType) => {
    try {
      const result = await action(data, career.id ?? "");
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
        toast.success(result.message);
        router.push("/admin/dashboard/careers");
        return;
      }
      toast.error(result.message);
    } catch (err) {
      toast.error("Error in updating career posting");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Navigation & Header */}
        <div>
          <Link
            href="/admin/dashboard/careers"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0b8b99] transition-colors mb-4 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to careers</span>
          </Link>

          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl md:text-2xl font-bold text-[#062b56]">
              Edit career posting
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Update position details, requirements, and job status for {career.positionEn}
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
