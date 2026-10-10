"use server";

import { verifyEmail } from "@/server/auth/services";

export async function verifyEmailAction(userId: string, token: string) {
  return await verifyEmail(userId, token);
}
