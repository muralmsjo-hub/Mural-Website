"use server";

import { revalidatePath } from "next/cache";
import { deleteUser } from "@/server/auth/services";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function deleteUserAction(userId: string) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await deleteUser(userId);
    revalidatePath(`/admin/dashboard/users`);

    if (!result.success) {
      return {
        message: RESPONSE_MESSAGES[result.message] || "Failed to delete user.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "User deleted successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error in deleting user.",
      status: 500,
      success: false,
    };
  }
}
