import z from "zod";

export const getProductAndQuantitySchema = (t?: (key: string) => string) =>
  z.object({
    productId: z
      .string()
      .trim()
      .min(1, t ? t("PRODUCT_REQUIRED") : "Please select a product."),
    quantity: z
      .number({
        error: t ? t("QUANTITY_REQUIRED") : "Quantity is required.",
      })
      .int(t ? t("QUANTITY_WHOLE") : "Quantity must be a whole number.")
      .min(1, t ? t("QUANTITY_MIN") : "Quantity must be at least 1."),
  });

export const productAndQuantitySchema = getProductAndQuantitySchema();

export const createNewPurchaseOrderRequestSchema = (
  t?: (key: string) => string,
) =>
  z.object({
    companyName: z
      .string()
      .trim()
      .min(1, t ? t("COMPANY_NAME_REQUIRED") : "Company name is required."),
    personName: z
      .string()
      .trim()
      .min(1, t ? t("PERSON_NAME_REQUIRED") : "Person name is required."),
    email: z
      .string()
      .trim()
      .email(t ? t("EMAIL_INVALID") : "Please enter a valid email address."),
    jobTitle: z
      .string()
      .trim()
      .min(1, t ? t("JOB_TITLE_REQUIRED") : "Job title is required."),
    phoneNumber: z
      .string()
      .trim()
      .min(1, t ? t("PHONE_REQUIRED") : "Phone number is required."),
    city: z.string().trim().min(1, t ? t("CITY_REQUIRED") : "City is required."),
    streetName: z
      .string()
      .trim()
      .min(1, t ? t("STREET_REQUIRED") : "Street name is required."),
    additionalProductRequirements: z.string().optional(),
    deliveryCity: z
      .string()
      .trim()
      .min(1, t ? t("DELIVERY_CITY_REQUIRED") : "Delivery city is required."),
    deliveryStreetName: z
      .string()
      .trim()
      .min(
        1,
        t ? t("DELIVERY_STREET_REQUIRED") : "Delivery street name is required.",
      ),
    deliveryBuildingNumber: z
      .string()
      .trim()
      .min(
        1,
        t
          ? t("DELIVERY_BUILDING_REQUIRED")
          : "Delivery building number is required.",
      ),
    supportingDocuments: z.string().optional(),
    productsAndQuantity: z
      .array(getProductAndQuantitySchema(t))
      .min(1, t ? t("MIN_PRODUCTS_REQUIRED") : "At least one product is required."),
  });

export const newPurchaseOrderRequestSchema =
  createNewPurchaseOrderRequestSchema();

export type NewPurchaseOrderRequestFormType = z.infer<
  typeof newPurchaseOrderRequestSchema
>;
