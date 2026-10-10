"use server";

import { revalidatePath } from "next/cache";
import { deleteProduct, deleteManyProducts } from "@/server/products/services";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function deleteProductAction(id: string) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await deleteProduct(id);
    revalidatePath(`/admin/dashboard/products`);
    revalidatePath(`/ar/admin/dashboard/products`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to delete product.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Product deleted successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while deleting product.",
      status: 500,
      success: false,
    };
  }
}

export async function deleteManyProductsAction(ids: string[]) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await deleteManyProducts(ids);
    revalidatePath(`/admin/dashboard/products`);
    revalidatePath(`/ar/admin/dashboard/products`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to delete products.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Products deleted successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while deleting products.",
      status: 500,
      success: false,
    };
  }
}

