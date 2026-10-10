import { auth } from "./auth";

export const requireAdmin = async () => {
  const session = await auth();

  if (!session || !session.user)
    return {
      success: false as const,
      message: "Please Login",
      status: 401,
      session: null,
    };

  if (session.user.role !== "admin")
    return {
      success: false as const,
      message: "You are not allowed to perform this action.",
      status: 403,
      session: null,
    };

  return { success: true as const, session, message: null, status: 200 };
};
