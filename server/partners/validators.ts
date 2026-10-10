import { z } from "zod";

export const newPartnerSchema = z.object({
  partnerNameEn: z.string().min(1, "English partner name is required."),
  partnerNameAr: z.string().min(1, "Arabic partner name is required."),
  partnerDescriptionEn: z
    .string()
    .min(1, "English partner description is required."),
  partnerDescriptionAr: z
    .string()
    .min(1, "Arabic partner description is required."),
  logo: z.string().min(1, "Partner logo is required."),
  referenceLink: z
    .string()
    .url("Please enter a valid reference link (e.g. https://example.com)")
    .nullable()
    .optional()
    .or(z.literal("")),
});

export const updatePartnerSchema = newPartnerSchema;

export type NewPartnerFormType = z.infer<typeof newPartnerSchema>;
export type CreatePartnerFormType = NewPartnerFormType;
export type UpdatePartnerFormType = z.infer<typeof updatePartnerSchema>;
