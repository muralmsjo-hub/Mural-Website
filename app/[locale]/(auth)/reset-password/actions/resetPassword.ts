"use server";

import { resetPassword } from "@/server/auth/services";

export async function resetPasswordAction(
  token: string,
  password: string,
  confirmPassword: string,
) {
  return await resetPassword(token, password, confirmPassword);
}
