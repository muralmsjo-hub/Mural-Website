"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, FolderTree } from "lucide-react";
import {
  updateCategorySchema,
  UpdateCategoryFormType,
} from "@/server/categories/validators";
import { CategoryById } from "@/server/categories/types";
import BasicInfo from "./BasicInfo";
import MediaSection from "./MediaSection";
import FormActions from "./FormActions";

interface Props {
  category: CategoryById;
  action: (
    data: UpdateCategoryFormType,
    id: string,
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

export default function EditCategoryForm({ action, category }: Props) {
  const router = useRouter();
  const methods = useForm<UpdateCategoryFormType>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: category,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: UpdateCategoryFormType) => {
    try {
      const result = await action(data, category.id);
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
        toast.success(result.message || "Category updated successfully.");
        router.push("/admin/dashboard/categories");
        return;
      }
      toast.error(result.message || "Failed to update category.");
    } catch (err) {
      toast.error("An unexpected error occurred while updating the category.");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Navigation & Header */}
        <div>
          <Link
            href="/admin/dashboard/categories"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0b8b99] transition-colors mb-4 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to categories</span>
          </Link>

          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl md:text-2xl font-bold text-[#062b56]">
              Edit category
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Update details and images for {category.categoryNameEn}
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
