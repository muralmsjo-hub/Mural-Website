"use server";

import { revalidatePath } from "next/cache";
import { addNewProduct } from "@/server/products/services";
import { CreateProductFormType } from "@/server/products/validators";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function addProductAction(data: CreateProductFormType) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await addNewProduct(data);
    revalidatePath(`/admin/dashboard/products`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to create product.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Product created successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while creating product.",
      status: 500,
      success: false,
    };
  }
}
