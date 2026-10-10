"use server";

import { requireAdmin } from "@/lib/auth/requireAdmin";
import { updateCareer } from "@/server/careers/services";
import { UpdateCareerFormType } from "@/server/careers/validators";
import { revalidatePath } from "next/cache";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export const editCareerAction = async (
  data: UpdateCareerFormType,
  id: string,
) => {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await updateCareer(id, data);
    revalidatePath("/admin/dashboard/careers");

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to update career.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Career updated successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error in editing the Career",
      status: 500,
      success: false,
    };
  }
};
