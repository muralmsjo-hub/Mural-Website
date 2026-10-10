"use server";

import { register } from "@/server/auth/services";
import { RegisterFormValues } from "@/server/auth/validators";

export async function registerAction(data: RegisterFormValues) {
  return await register(
    data.name,
    data.email,
    data.password,
    data.confirmPassword,
  );
}
