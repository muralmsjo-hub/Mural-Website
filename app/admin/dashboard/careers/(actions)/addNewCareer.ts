"use server";

import { requireAdmin } from "@/lib/auth/requireAdmin";
import { addNewCareer } from "@/server/careers/services";
import { CreateCareerFormType } from "@/server/careers/validators";
import { revalidatePath } from "next/cache";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export const addCareerAction = async (data: CreateCareerFormType) => {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await addNewCareer(data);
    revalidatePath("/admin/dashboard/careers");

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to create career.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Career created successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error in adding the Career",
      status: 500,
      success: false,
    };
  }
};
