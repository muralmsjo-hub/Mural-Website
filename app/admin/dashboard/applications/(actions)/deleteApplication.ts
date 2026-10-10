"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import {
  deleteApplication,
  deleteManyApplications,
} from "@/server/applications/services";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function deleteApplicationAction(applicationId: string) {
  try {
    const authCheck = await requireAdmin();
    if (!authCheck.success) {
      return {
        success: false,
        status: authCheck.status,
        message: authCheck.message,
      };
    }

    const result = await deleteApplication(applicationId);

    if (result.success) {
      revalidatePath(`/admin/dashboard/applications`);
      revalidatePath(`/ar/admin/dashboard/applications`);
      return {
        success: true,
        message:
          RESPONSE_MESSAGES[result.message] || "Application deleted successfully.",
        status: result.status,
      };
    }
    return {
      success: false,
      message:
        RESPONSE_MESSAGES[result.message] || "Failed to delete application.",
      status: result.status,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error In Deleting Application",
      status: 500,
    };
  }
}

export async function deleteManyApplicationsAction(applicationIds: string[]) {
  try {
    const authCheck = await requireAdmin();
    if (!authCheck.success) {
      return {
        success: false,
        status: authCheck.status,
        message: authCheck.message,
      };
    }
    const result = await deleteManyApplications(applicationIds);

    if (result.success) {
      revalidatePath(`/admin/dashboard/applications`);
      revalidatePath(`/ar/admin/dashboard/applications`);
      return {
        success: true,
        message:
          RESPONSE_MESSAGES["APPLICATIONS_DELETED_SUCCESSFULLY"] ||
          "Applications deleted successfully.",
        status: result.status,
      };
    }
    return {
      success: false,
      message:
        RESPONSE_MESSAGES[result.message] || "Error In Deleting Applications",
      status: result.status,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error In Deleting Applications",
      status: 500,
    };
  }
}
