"use server";

import { newPurchaseOrderRequest } from "@/server/purchase-order-request/services";
import { NewPurchaseOrderRequestFormType } from "@/server/purchase-order-request/validators";

export async function submitPurchaseRequestAction(
  data: NewPurchaseOrderRequestFormType,
) {
  const result = await newPurchaseOrderRequest(data);

  return result;
}
