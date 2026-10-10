"use server";

import { revalidatePath } from "next/cache";
import { addNewCategory } from "@/server/categories/services";
import { CreateCategoryFormType } from "@/server/categories/validators";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function addCategoryAction(data: CreateCategoryFormType) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await addNewCategory(data);
    revalidatePath(`/admin/dashboard/categories`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to create category.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Category created successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while creating category.",
      status: 500,
      success: false,
    };
  }
}
