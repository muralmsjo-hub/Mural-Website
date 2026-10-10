import { user_role } from "@/generated/prisma/client";

export type UserRoles = user_role;

export type AllUsers = {
  id: string;
  email: string;
  password: string | null;
  role: user_role;
  emailVerified: Date | null;
  verificationToken: string | null;
  createdAt: Date | null;
  name: string;
  image: string | null;
};
