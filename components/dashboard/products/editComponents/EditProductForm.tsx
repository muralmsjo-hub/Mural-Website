"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import {
  updateProductSchema,
  UpdateProductFormType,
} from "@/server/products/validators";
import { ProductById } from "@/server/products/types";
import BasicInfo from "./BasicInfo";
import ManufacturerSection from "./ManufacturerSection";
import MediaSection from "./MediaSection";
import FormActions from "./FormActions";

interface Props {
  product: ProductById;
  categories: { label: string; value: string }[];
  action: (
    data: UpdateProductFormType,
    id: string,
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

export default function EditProductForm({
  action,
  categories,
  product,
}: Props) {

  const router = useRouter();
  const methods = useForm<UpdateProductFormType>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: product,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: UpdateProductFormType) => {
    try {
      const result = await action(data, product.id);
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
        toast.success(result.message || "Product updated successfully.");
        router.push("/admin/dashboard/products");
        return;
      }
      toast.error(result.message || "Failed to update product.");
    } catch (err) {
      toast.error("An unexpected error occurred while updating the product.");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Navigation & Header */}
        <div>
          <Link
            href="/admin/dashboard/products"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0b8b99] transition-colors mb-4 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to products</span>
          </Link>

          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl md:text-2xl font-bold text-[#062b56]">
              Edit product
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Update details, category assignment, and media for{" "}
              {product.productNameEn}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          aria-busy={isSubmitting}
        >
          <BasicInfo categories={categories} />
          <ManufacturerSection />
          <MediaSection />
          <FormActions />
        </form>
      </div>
    </FormProvider>
  );
}
