"use server";

import { revalidatePath } from "next/cache";
import { deleteCategory, deleteManyCategories } from "@/server/categories/services";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function deleteCategoryAction(categoryId: string) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await deleteCategory(categoryId);
    revalidatePath(`/admin/dashboard/categories`);
    revalidatePath(`/ar/admin/dashboard/categories`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to delete category.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Category deleted successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while deleting category.",
      status: 500,
      success: false,
    };
  }
}

export async function deleteManyCategoriesAction(ids: string[]) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await deleteManyCategories(ids);
    revalidatePath(`/admin/dashboard/categories`);
    revalidatePath(`/ar/admin/dashboard/categories`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to delete categories.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Categories deleted successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while deleting categories.",
      status: 500,
      success: false,
    };
  }
}

