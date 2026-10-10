"use server";

import { revalidatePath } from "next/cache";
import {
  deletePurchaseRequest,
  deleteManyPurchaseRequests,
} from "@/server/purchase-order-request/services";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { RESPONSE_MESSAGES } from "@/lib/constants/adminResponseMessages";

export async function deletePurchaseOrderRequestAction(requestId: string) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await deletePurchaseRequest(requestId);
    revalidatePath(`/admin/dashboard/requests/purchase-order-requests`);
    revalidatePath(`/ar/admin/dashboard/requests/purchase-order-requests`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to delete request.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Request deleted successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while deleting purchase request.",
      status: 500,
      success: false,
    };
  }
}

export async function deleteManyPurchaseOrderRequestsAction(ids: string[]) {
  try {
    const auth = await requireAdmin();
    if (!auth.success) return auth;

    const result = await deleteManyPurchaseRequests(ids);
    revalidatePath(`/admin/dashboard/requests/purchase-order-requests`);
    revalidatePath(`/ar/admin/dashboard/requests/purchase-order-requests`);

    if (!result.success) {
      return {
        message:
          RESPONSE_MESSAGES[result.message] || "Failed to delete requests.",
        status: result.status,
        success: false,
      };
    }

    return {
      message:
        RESPONSE_MESSAGES[result.message] || "Requests deleted successfully.",
      status: result.status,
      success: true,
    };
  } catch (error) {
    return {
      message: "Error occurred while deleting purchase requests.",
      status: 500,
      success: false,
    };
  }
}
