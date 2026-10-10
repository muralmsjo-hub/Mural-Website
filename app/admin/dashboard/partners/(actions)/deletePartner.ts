"use server";

import { revalidatePath } from "next/cache";
import { deletePartner, deleteManyPartners } from "@/server/partners/services";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function deletePartnerAction(id: string) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await deletePartner(id);
    revalidatePath(`/admin/dashboard/partners`);
    revalidatePath(`/ar/admin/dashboard/partners`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to delete partner.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Partner deleted successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while deleting partner.",
      status: 500,
      success: false,
    };
  }
}

export async function deleteManyPartnersAction(ids: string[]) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await deleteManyPartners(ids);
    revalidatePath(`/admin/dashboard/partners`);
    revalidatePath(`/ar/admin/dashboard/partners`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to delete partners.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Partners deleted successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while deleting partners.",
      status: 500,
      success: false,
    };
  }
}

