"use server";

import { revalidatePath } from "next/cache";
import { updateCategory } from "@/server/categories/services";
import { UpdateCategoryFormType } from "@/server/categories/validators";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function updateCategoryAction(
  data: UpdateCategoryFormType,
  id: string,
) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await updateCategory(id, data);
    revalidatePath(`/admin/dashboard/categories`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to update category.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Category updated successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while updating category.",
      status: 500,
      success: false,
    };
  }
}
