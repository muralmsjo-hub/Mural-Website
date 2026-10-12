import z from "zod";

export const createProductSchema = z.object({
  productNameEn: z.string().trim().min(1, "English product name is required."),

  productNameAr: z.string().trim().min(1, "Arabic product name is required."),

  productDescriptionEn: z
    .string()
    .trim()
    .min(1, "English product description is required."),

  productDescriptionAr: z
    .string()
    .trim()
    .min(1, "Arabic product description is required."),

  productCardImage: z
    .string("At least one product image is required.")
    .min(1, "Product card image is required."),

  productImages: z
    .string("At least one product image is required.")
    .array()
    .min(1, "At least one product image is required."),

  manufacturerNameEN: z
    .string()
    .trim()
    .min(1, "English manufacturer name is required."),

  manufacturerNameAr: z
    .string()
    .trim()
    .min(1, "Arabic manufacturer name is required."),

  manufacturerLogo: z
    .string("Manufacturer logo is required.")
    .min(1, "Manufacturer logo is required."),

  isFeatured: z.boolean().optional(),
  categoryId: z.string().min(1, "Product category is required."),
});

export const updateProductSchema = createProductSchema;

export type CreateProductFormType = z.infer<typeof createProductSchema>;

export type UpdateProductFormType = z.infer<typeof updateProductSchema>;
