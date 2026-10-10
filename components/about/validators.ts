import { z } from "zod";

export const createContactSchema = (t?: (key: string) => string) =>
  z.object({
    name: z.string().min(2, {
      message: t ? t("validation.nameMin") : "Name must be at least 2 characters",
    }),
    email: z.string().email({
      message: t ? t("validation.emailInvalid") : "Please enter a valid email address",
    }),
    organization: z.string().optional(),
    subject: z.string().optional(),
    message: z.string().min(5, {
      message: t ? t("validation.messageMin") : "Message must be at least 5 characters",
    }),
  });

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
