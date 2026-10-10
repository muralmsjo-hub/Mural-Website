"use server";

import { revalidatePath } from "next/cache";
import { updateBanner } from "@/server/banner/services";
import { UpdateBannerFormType } from "@/server/banner/validators";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function updateBannerAction(
  data: UpdateBannerFormType,
  id: string,
) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await updateBanner(id, data);
    revalidatePath(`/admin/dashboard/banners`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to update banner.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Banner updated successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while updating banner.",
      status: 500,
      success: false,
    };
  }
}
