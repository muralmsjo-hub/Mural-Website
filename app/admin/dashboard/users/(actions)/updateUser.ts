"use server";

import { revalidatePath } from "next/cache";
import { updateRole } from "@/server/auth/services";
import { UserRoles } from "@/server/auth/types";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function updateUserRole(data: {
  userId: string;
  newRole: UserRoles;
}) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await updateRole(data.userId, data.newRole);
    revalidatePath(`/admin/dashboard/users`);

    if (!result.success) {
      return {
        message: RESPONSE_MESSAGES[result.message] || "Failed to update user role.",
        status: result.status,
        success: false,
      };
    }

    return {
      message: RESPONSE_MESSAGES[result.message] || "User role updated successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error in updating user role.",
      status: 500,
      success: false,
    };
  }
}
