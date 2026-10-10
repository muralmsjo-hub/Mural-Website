"use server";

import { revalidatePath } from "next/cache";
import { deleteBanner, deleteManyBanner } from "@/server/banner/services";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function deleteBannerAction(id: string) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await deleteBanner(id);
    revalidatePath(`/admin/dashboard/banners`);
    revalidatePath(`/ar/admin/dashboard/banners`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to delete banner.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Banner deleted successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while deleting banner.",
      status: 500,
      success: false,
    };
  }
}

export async function deleteManyBannersAction(ids: string[]) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await deleteManyBanner(ids);
    revalidatePath(`/admin/dashboard/banners`);
    revalidatePath(`/ar/admin/dashboard/banners`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to delete banners.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Banners deleted successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while deleting banners.",
      status: 500,
      success: false,
    };
  }
}

