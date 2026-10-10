"use server";

import { revalidatePath } from "next/cache";
import { updatePartner } from "@/server/partners/services";
import { UpdatePartnerFormType } from "@/server/partners/validators";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function updatePartnerAction(
  data: UpdatePartnerFormType,
  id: string,
) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await updatePartner(id, data);
    revalidatePath(`/admin/dashboard/partners`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to update partner.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Partner updated successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while updating partner.",
      status: 500,
      success: false,
    };
  }
}
