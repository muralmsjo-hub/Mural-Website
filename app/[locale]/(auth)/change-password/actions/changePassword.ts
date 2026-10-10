"use server";

import { auth } from "@/lib/auth/auth";
import { changePassword } from "@/server/auth/services";
import { ChangePasswordFormValues } from "@/server/auth/validators";

export async function changePasswordAction(data: ChangePasswordFormValues) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "UNAUTHORIZED_ACCESS",
      status: 401,
    };
  }

  return await changePassword(
    data.oldPassword,
    data.newPassword,
    data.confirmPassword,
    session.user.id,
  );
}
