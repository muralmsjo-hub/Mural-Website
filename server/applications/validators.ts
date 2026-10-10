import { z } from "zod";
import { Locale } from "@/types/index";

export const applicationSchemaEn = z.object({
  firstName: z.string().min(1, "First name is required"),

  lastName: z.string().min(1, "Last name is required"),

  email: z.string().min(1, "Email is required").email("Invalid email address"),

  major: z.string().min(1, "Major is required"),

  cv: z.string().min(1, "CV is required"),

  phoneNumber: z.string().regex(/^07\d{8}$/),

  careerId: z.string().min(1, "Career is required"),

  appliedAt: z.date().optional(),
});

// ---------------------------------     Frontend (With Locale)     --------------------------------------

const applicationMessages = {
  en: {
    required: "This field is required",
    emailInvalid: "Invalid email address",
    cvRequired: "Please upload your CV",
    phoneNumberInvalid: "Phone number must be 10 digits and start with 07",
  },

  ar: {
    required: "هذا الحقل مطلوب",
    emailInvalid: "البريد الإلكتروني غير صالح",
    cvRequired: "يرجى رفع السيرة الذاتية",
    phoneNumberInvalid: "يجب أن يتكون رقم الهاتف من 10 أرقام وأن يبدأ بـ 07",
  },
};

export const createApplicationSchema = (locale: Locale = "en") => {
  const t = applicationMessages[locale];

  return z.object({
    firstName: z.string().min(2, { message: t.required }),
    lastName: z.string().min(2, { message: t.required }),
    email: z
      .string()
      .min(1, { message: t.required })
      .email({ message: t.emailInvalid }),
    phoneNumber: z
      .string({ message: t.phoneNumberInvalid })
      .regex(/^07\d{8}$/, { message: t.phoneNumberInvalid }),
    major: z.string().min(2, { message: t.required }),
    cv: z.string({ message: t.cvRequired }).min(1, { message: t.cvRequired }),
    careerId: z.uuid(),
  });
};

export type ApplicationFormValues = z.infer<
  ReturnType<typeof createApplicationSchema>
>;
