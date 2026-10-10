"use server";

import { revalidatePath } from "next/cache";
import { createBanner } from "@/server/banner/services";
import { CreateBannerFormType } from "@/server/banner/validators";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function addBannerAction(data: CreateBannerFormType) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await createBanner(data);
    revalidatePath(`/admin/dashboard/banners`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to create banner.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Banner created successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while creating banner.",
      status: 500,
      success: false,
    };
  }
}
