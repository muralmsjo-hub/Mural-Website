"use server";

import { revalidatePath } from "next/cache";
import { addNewPartner } from "@/server/partners/services";
import { NewPartnerFormType } from "@/server/partners/validators";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function addPartnerAction(data: NewPartnerFormType) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await addNewPartner(data);
    revalidatePath(`/admin/dashboard/partners`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to create partner.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Partner created successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while creating partner.",
      status: 500,
      success: false,
    };
  }
}
