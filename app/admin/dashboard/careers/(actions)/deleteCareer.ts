"use server";

import { deleteCareer, deleteManyCareers } from "@/server/careers/services";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { revalidatePath } from "next/cache";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export const deleteCareerAction = async (careerId: string) => {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await deleteCareer(careerId);
    revalidatePath("/admin/dashboard/careers");
    revalidatePath("/ar/admin/dashboard/careers");

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to delete career.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Career deleted successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error in deleting the career",
      status: 500,
      success: false,
    };
  }
};

export const deleteManyCareersAction = async (ids: string[]) => {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await deleteManyCareers(ids);
    revalidatePath("/admin/dashboard/careers");
    revalidatePath("/ar/admin/dashboard/careers");

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to delete careers.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Careers deleted successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error in deleting careers",
      status: 500,
      success: false,
    };
  }
};

