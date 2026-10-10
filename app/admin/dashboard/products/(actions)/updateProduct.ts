"use server";

import { revalidatePath } from "next/cache";
import { updateProduct } from "@/server/products/services";
import { UpdateProductFormType } from "@/server/products/validators";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function updateProductAction(
  data: UpdateProductFormType,
  id: string,
) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await updateProduct(id, data);
    revalidatePath(`/admin/dashboard/products`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to update product.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Product updated successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while updating product.",
      status: 500,
      success: false,
    };
  }
}
