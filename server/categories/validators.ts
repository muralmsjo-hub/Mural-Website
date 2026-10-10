import { z } from "zod";

export const categorySchema = z.object({
  categoryNameEn: z
    .string()
    .min(2, "Category name (English) must be at least 2 characters")
    .max(255, "Category name (English) cannot exceed 255 characters"),

  categoryNameAr: z
    .string()
    .min(2, "Category name (Arabic) must be at least 2 characters")
    .max(255, "Category name (Arabic) cannot exceed 255 characters"),

  categoryDescriptionEn: z
    .string()
    .min(10, "Category description (English) must be at least 10 characters"),

  categoryDescriptionAr: z
    .string()
    .min(10, "Category description (Arabic) must be at least 10 characters"),

  image: z.string(),

  isFeatured: z.boolean(),
});

export const updateCategorySchema = categorySchema;

export type CreateCategoryFormType = z.infer<typeof categorySchema>;

export type UpdateCategoryFormType = z.infer<typeof updateCategorySchema>;
