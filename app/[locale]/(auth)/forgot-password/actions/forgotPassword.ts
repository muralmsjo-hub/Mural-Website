"use server";

import { generateToken } from "@/server/auth/services";

export async function forgotPasswordAction(email: string) {
  return await generateToken(email);
}
