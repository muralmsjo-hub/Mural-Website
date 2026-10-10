import { prisma } from "@/lib/prisma";
import {
  changePasswordSchema,
  registerSchema,
  resetPasswordSchema,
} from "./validators";
import { sendVerificationEmail } from "@/lib/emails/send-verification";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { UserRoles } from "./types";
import { sendPasswordResetEmail } from "@/lib/emails/send-reset-password-email";

export const register = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  try {
    const validation = registerSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!validation.success) {
      return {
        success: false,
        message: "VALIDATION_ERROR",
        status: 400,
      };
    }

    const normalizedEmail = validation.data.email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "EMAIL_ALREADY_EXISTS",
        status: 400,
      };
    }

    const numberOfUsers = await prisma.user.count();

    const hashedPassword = await bcrypt.hash(validation.data.password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await prisma.user.create({
      data: {
        name: validation.data.name,
        email: normalizedEmail,
        password: hashedPassword,
        role: numberOfUsers === 0 ? "admin" : "user",
        verificationToken,
      },
    });

    await sendVerificationEmail({
      email: user.email,
      name: user.name,
      userId: user.id,
      verifircationToken: verificationToken,
    });

    return {
      success: true,
      message: "VERIFICATION_EMAIL_SENT_SUCCESSFULLY",
      status: 201,
    };
  } catch (error) {
    console.error("Registration error:", error);

    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password!);

  if (!isValid) return null;

  return user;
};

export const verifyEmail = async (userId: string, token: string) => {
  try {
    if (!userId || !token)
      return {
        success: false,
        message: "MISSING_REQUIRED_FIELDS",
        status: 400,
      };

    const existing = await prisma.user.findUnique({ where: { id: userId } });

    if (!existing)
      return {
        success: false,
        message: "USER_NOT_FOUND",
        status: 404,
      };

    if (existing.emailVerified)
      return {
        success: true,
        message: "ACCOUNT_ALREADY_VERIFIED",
        status: 200,
      };

    await prisma.user.update({
      where: { id: userId },
      data: { verificationToken: null, emailVerified: new Date() },
    });

    return {
      success: true,
      message: "ACCOUNT_VERIFIED_SUCCESSFULLY",
      status: 500,
    };
  } catch (error) {
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const generateToken = async (email: string) => {
  try {
    const findUser = await prisma.user.findUnique({
      where: { email: email },
      select: { id: true, email: true, name: true },
    });

    if (!findUser || !findUser.email) {
      return {
        success: true,
        message: "FORGOT_PASSWORD_EMAIL_SENT_SUCCESSFULLY",
        status: 200,
      };
    }

    const token: string = crypto.randomBytes(36).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

    await prisma.reset_password_token.deleteMany({
      where: { userId: findUser.id },
    });

    const resetPasswordToken = await prisma.reset_password_token.create({
      data: {
        userId: findUser.id,
        token: token,
        expiresAt,
      },
    });

    await sendPasswordResetEmail({
      email: findUser.email,
      name: findUser.name,
      resetToken: resetPasswordToken.token,
    });

    return {
      success: true,
      message: "FORGOT_PASSWORD_EMAIL_SENT_SUCCESSFULLY",
      status: 200,
      token,
    };
  } catch (error) {
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const resetPassword = async (
  token: string,
  password: string,
  confirmPassword: string,
) => {
  try {
    if (!token || !password)
      return {
        success: false,
        message: "INVALID_REQUEST",
        status: 400,
      };

    const validation = resetPasswordSchema.safeParse({
      password,
      confirmPassword,
    });

    if (validation.success) {
      const resetToken = await prisma.reset_password_token.findFirst({
        where: { token: token, expiresAt: { gt: new Date() } },
      });

      if (resetToken?.token === undefined || resetToken.userId === null)
        return {
          success: false,
          message: "RESET_PASSWORD_LINK_EXPIRED",
          status: 400,
        };

      const newHashPassword = await bcrypt.hash(validation.data.password, 10);

      await prisma.user.update({
        where: { id: resetToken.userId },
        data: {
          password: newHashPassword,
        },
      });

      await prisma.reset_password_token.delete({
        where: { id: resetToken.id },
      });

      return {
        success: true,
        status: 200,
        message: "PASSWORD_RESET_SUCCESSFULLY",
      };
    }

    return {
      success: false,
      status: 400,
      message: "INVALID_PASSWORD",
    };
  } catch (error) {
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
  userId: string,
) => {
  try {
    if (!oldPassword || !newPassword || !confirmPassword)
      return {
        success: false,
        message: "INVALID_REQUEST",
        status: 400,
      };

    const validation = changePasswordSchema.safeParse({
      newPassword,
      confirmPassword,
      oldPassword,
    });

    if (validation.success) {
      const findUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { password: true },
      });

      if (findUser === null)
        return {
          success: false,
          message: "USER_NOT_FOUND",
          status: 400,
        };

      const isValid = await bcrypt.compare(
        validation.data.oldPassword,
        findUser.password!,
      );

      if (!isValid)
        return {
          success: false,
          message: "INCORRECT_PASSWORD",
          status: 400,
        };

      const hashedpassword = await bcrypt.hash(validation.data.newPassword, 10);

      await prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedpassword,
        },
      });

      return {
        success: true,
        message: "PASSWORD_UPDATED_SUCCESSFULLY",
        status: 200,
      };
    }

    return {
      success: false,
      status: 400,
      message: "INVALID_PASSWORDS",
    };
  } catch (error) {
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const updateRole = async (userId: string, newRole: UserRoles) => {
  try {
    const existing = await prisma.user.findUnique({ where: { id: userId } });

    if (!existing)
      return {
        success: false,
        message: "USER_NOT_FOUND",
        status: 404,
      };

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    return {
      success: true,
      message: "ROLE_UPDATED_SUCCESSFULLY",
      status: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const existing = await prisma.user.findUnique({ where: { id: userId } });

    if (!existing)
      return {
        success: false,
        message: "USER_NOT_FOUND",
        status: 404,
      };

    await prisma.user.delete({ where: { id: userId } });

    return {
      success: true,
      message: "USER_DELETED_SUCCESSFULLY",
      status: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getAllUsers = async () => {
  try {
    const result = await prisma.user.findMany({});

    return {
      data: result,
      success: true,
      message: "USERS_RETRIEVED_SUCCESSFULLY",
      status: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getUserById = async (userId: string) => {
  try {
    const existing = await prisma.user.findUnique({ where: { id: userId } });

    if (!existing)
      return {
        success: false,
        message: "USER_NOT_FOUND",
        status: 404,
      };

    const result = await prisma.user.findUnique({ where: { id: userId } });

    return {
      data: result,
      success: true,
      message: "USER_RETRIEVED_SUCCESSFULLY",
      status: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};
