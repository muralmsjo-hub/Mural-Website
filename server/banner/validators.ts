import { z } from "zod";

export const bannerSchema = z.object({
  nameEn: z
    .string()
    .min(5, { message: "English name must be at least 5 characters" })
    .max(30, { message: "English name must not exceed 30 characters" }),

  nameAr: z
    .string()
    .min(5, { message: "Arabic name must be at least 5 characters" })
    .max(30, { message: "Arabic name must not exceed 30 characters" }),

  image: z.string().min(1, { message: "Image is required" }),
});

export const updateBannerSchema = bannerSchema;

export type CreateBannerFormType = z.infer<typeof bannerSchema>;

export type UpdateBannerFormType = z.infer<typeof updateBannerSchema>;
