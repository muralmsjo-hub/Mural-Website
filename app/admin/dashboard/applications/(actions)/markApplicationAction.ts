"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { markApplicationAsShown } from "@/server/applications/services";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function markApplicationAsShownAction(applicationId: string) {
  try {
    const authCheck = await requireAdmin();
    if (!authCheck.success) {
      return {
        success: false,
        status: authCheck.status,
        message: authCheck.message,
      };
    }

    const result = await markApplicationAsShown(applicationId);
    if (result.success) {
      revalidatePath(`/admin/dashboard/applications`);
      revalidatePath(`/ar/admin/dashboard/applications`);
      return {
        success: true,
        message: RESPONSE_MESSAGES[result.message] || "Application status updated.",
        status: result.status,
      };
    }
    return {
      success: false,
      message:
        RESPONSE_MESSAGES[result.message] || "Failed to update application status.",
      status: result.status,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error In Marking Application As Shown",
      status: 500,
    };
  }
}
