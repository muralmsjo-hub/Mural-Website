import { unstable_cache, updateTag } from "next/cache";
import { describe, beforeEach, it, expect, vi } from "vitest";
import {
  addNewProduct,
  deleteProduct,
  deleteManyProducts,
  updateProduct,
  getAllProductsByLocale,
} from "../services";
import { prisma } from "@/lib/prisma";
import { PRODUCTS_CACHE_TAG } from "@/lib/constants/allCacheTags";
import { generateSlug } from "@/lib/helpers";

vi.mock("next/cache", () => ({
  updateTag: vi.fn(),
  unstable_cache: vi.fn((fn) => fn),
}));

const { mockDeleteFiles } = vi.hoisted(() => ({
  mockDeleteFiles: vi.fn(),
}));

vi.mock("uploadthing/server", () => ({
  UTApi: class {
    deleteFiles = mockDeleteFiles;
  },
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    products: {
      create: vi.fn(),
      update: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

describe("Products Services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const productId = "product-id-1";

  const invalidNewProductData = {
    productNameEn: "",
    productNameAr: "product 1 ar",
    productDescriptionEn: "product 1 des en",
    productDescriptionAr: "product 1 des ar",
    productCardImage: "product 1 imge",
    productImages: ["product 1 des"],
    manufacturerNameEN: "product 1 mNa en",
    manufacturerNameAr: "product 1 mNa ar",
    manufacturerLogo: "product 1 mNa logo",
    categoryId: "cat",
    isFeatured: true,
  };

  const newProductData = {
    productNameEn: "product 1 en",
    productNameAr: "product 1 ar",
    productDescriptionEn: "product 1 des en",
    productDescriptionAr: "product 1 des ar",
    productCardImage: "product 1 imge",
    productImages: ["product 1 des"],
    manufacturerNameEN: "product 1 mNa en",
    manufacturerNameAr: "product 1 mNa ar",
    manufacturerLogo: "product 1 mNa logo",
    categoryId: "cat",
    isFeatured: true,
  };

  const notFeaturedProductData = {
    productNameEn: "product 1 en",
    productNameAr: "product 1 ar",
    productDescriptionEn: "product 1 des en",
    productDescriptionAr: "product 1 des ar",
    productCardImage: "product 1 imge",
    productImages: ["product 1 des"],
    manufacturerNameEN: "product 1 mNa en",
    manufacturerNameAr: "product 1 mNa ar",
    manufacturerLogo: "product 1 mNa logo",
    categoryId: "cat",
    isFeatured: false,
  };

  const fakeProductData = {
    productNameEn: "product 1 en",
    productNameAr: "product 1 ar",
    productDescriptionEn: "product 1 des en",
    productDescriptionAr: "product 1 des ar",
    productCardImage: "product 1 imge",
    productImages: ["product 1 des"],
    manufacturerNameEN: "product 1 mNa en",
    manufacturerNameAr: "product 1 mNa ar",
    manufacturerLogo: "product 1 mNa logo",
    categoryId: "cat",
    isFeatured: true,
  };

  const fakeProductsDataWithCategory = [
    {
      id: "product-id",
      productNameEn: "product 1 en",
      productNameAr: "product 1 ar",
      productDescriptionEn: "product 1 des en",
      productDescriptionAr: "product 1 des ar",
      productCardImage: "product 1 imge",
      productImages: ["product 1 des"],
      manufacturerNameEN: "product 1 mNa en",
      manufacturerNameAr: "product 1 mNa ar",
      slug: generateSlug("product 1 en"),

      isFeatured: true,
      categories: {
        categoryNameEn: "category en",
        categoryNameAr: "category ar",
      },
    },
  ];

  const fakeProductsDataWithCategory2 = [
    {
      id: "product-id-1",
      productNameEn: "product 1 en",
      productNameAr: "product 1 ar",
      productDescriptionEn: "product 1 des en",
      productDescriptionAr: "product 1 des ar",
      productCardImage: "product 1 imge",
      productImages: ["product 1 des"],
      manufacturerNameEN: "product 1 mNa en",
      manufacturerNameAr: "product 1 mNa ar",
      slug: generateSlug("product 1 en"),

      isFeatured: true,
      categories: {
        categoryNameEn: "category en",
        categoryNameAr: "category ar",
      },
    },
    {
      id: "product-id-2",
      productNameEn: "product 2 en",
      productNameAr: "product 2 ar",
      productDescriptionEn: "product 2 des en",
      productDescriptionAr: "product 2 des ar",
      productCardImage: "product 2 imge",
      productImages: ["product 2 des"],
      manufacturerNameEN: "product 2 mNa en",
      manufacturerNameAr: "product 2 mNa ar",
      slug: generateSlug("product 2 en"),

      isFeatured: true,
      categories: {
        categoryNameEn: "category en",
        categoryNameAr: "category ar",
      },
    },
  ];

  const fakeProductsDataWithCategoryEn = [
    {
      id: "product-id",
      productName: "product 1 en",

      productDescription: "product 1 des en",

      productCardImage: "product 1 imge",
      productImages: ["product 1 des"],
      manufacturerName: "product 1 mNa en",

      slug: generateSlug("product 1 en"),
      categoryName: "category en",
    },
  ];

  const fakeProductsDataWithCategoryEn2 = [
    {
      id: "product-id-1",
      productName: "product 1 en",

      productDescription: "product 1 des en",

      productCardImage: "product 1 imge",
      productImages: ["product 1 des"],
      manufacturerName: "product 1 mNa en",

      slug: generateSlug("product 1 en"),
      categoryName: "category en",
    },
    {
      id: "product-id-2",
      productName: "product 2 en",

      productDescription: "product 2 des en",

      productCardImage: "product 2 imge",
      productImages: ["product 2 des"],
      manufacturerName: "product 2 mNa en",

      slug: generateSlug("product 2 en"),
      categoryName: "category en",
    },
  ];

  describe("addNewProduct", () => {
    it("should return 400 (validation error) if validation  invaild", async () => {
      const result = await addNewProduct(invalidNewProductData);

      expect(result.status).toEqual(400);
      expect(result.message).toEqual("VALIDATION_ERROR");
    });

    it("should return 409 if name existed", async () => {
      vi.mocked(prisma.products.findUnique).mockResolvedValue(
        fakeProductData as any,
      );

      const result = await addNewProduct(newProductData);

      expect(result.status).toEqual(409);
      expect(prisma.products.findUnique).toHaveBeenCalledWith({
        where: {
          productNameEn: newProductData.productNameEn,
        },
      });
      expect(updateTag).not.toHaveBeenCalledWith(PRODUCTS_CACHE_TAG);
    });

    it("should return 409, MAXIMUM_FEATURED_PRODUCTS_REACHED if there is 4 featured products", async () => {
      vi.mocked(prisma.products.count).mockResolvedValue(4);
      vi.mocked(prisma.products.findUnique).mockResolvedValue(null);
      const result = await addNewProduct(newProductData);

      expect(result.status).toEqual(409);
      expect(result.message).toEqual("MAXIMUM_FEATURED_PRODUCTS_REACHED");
      expect(updateTag).not.toHaveBeenCalledWith(PRODUCTS_CACHE_TAG);
    });

    it("should not count featured products if isFeatured is false", async () => {
      const nonFeaturedData = { ...newProductData, isFeatured: false };

      vi.mocked(prisma.products.findUnique).mockResolvedValue(null);
      vi.mocked(prisma.products.create).mockResolvedValue({} as any);

      await addNewProduct(nonFeaturedData);

      expect(prisma.products.count).not.toHaveBeenCalled();
      expect(prisma.products.create).toHaveBeenCalled();
    });

    it("it should return internal server error if an error occured", async () => {
      vi.mocked(prisma.products.findUnique).mockRejectedValue(
        new Error("error"),
      );

      const result = await addNewProduct(newProductData);
      expect(result.status).toEqual(500);
      expect(prisma.products.findUnique).toHaveBeenCalled();
      expect(updateTag).not.toHaveBeenCalled();
    });

    it("should add product and return 201  if everything is ok", async () => {
      vi.mocked(prisma.products.findUnique).mockResolvedValue(null);
      vi.mocked(prisma.products.count).mockResolvedValue(3);
      vi.mocked(prisma.products.create).mockResolvedValue({} as any);

      const result = await addNewProduct(newProductData);

      expect(prisma.products.findUnique).toHaveBeenCalledWith({
        where: {
          productNameEn: newProductData.productNameEn,
        },
      });
      expect(prisma.products.count).toHaveBeenCalledWith({
        where: {
          isFeatured: true,
        },
      });
      expect(prisma.products.create).toHaveBeenCalledWith({
        data: {
          slug: generateSlug(newProductData.productNameEn),
          ...newProductData,
        },
      });
      expect(updateTag).toHaveBeenCalledWith(PRODUCTS_CACHE_TAG);
      expect(result.status).toEqual(201);
    });
  });

  describe("updateProduct", () => {
    it("it should return 400 if id not sent", async () => {
      const result = await updateProduct("", newProductData);
      expect(result.status).toEqual(400);
      expect(updateTag).not.toHaveBeenCalled();
    });

    it("should return 400, VALIDATION_ERROR, if data not valid", async () => {
      const result = await updateProduct(productId, invalidNewProductData);
      expect(result.message).toEqual("VALIDATION_ERROR");
    });

    it("it should return 404 if product not found", async () => {
      vi.mocked(prisma.products.findUnique).mockResolvedValue(null);

      const result = await updateProduct(productId, newProductData);
      expect(result.status).toEqual(404);
      expect(updateTag).not.toHaveBeenCalled();
    });

    it("should return 409, PRODUCT_NAME_ALREADY_EXISTS, if name is used with another product", async () => {
      vi.mocked(prisma.products.findUnique)
        .mockResolvedValueOnce({} as any)
        .mockResolvedValueOnce(
          {} as any,
        ); /* when you dont need to check, or use something in the returned data,
       you dont need to return a value for the mocked resolve, it is fine to return {} as any */

      const result = await updateProduct(productId, newProductData);
      expect(result.status).toEqual(409);
      expect(result.message).toEqual("PRODUCT_NAME_ALREADY_EXISTS");
      expect(updateTag).not.toHaveBeenCalled();
    });

    it("should not access `check featured products` if updatedProduct is not featured", async () => {
      vi.mocked(prisma.products.findUnique)
        .mockResolvedValueOnce({} as any)
        .mockResolvedValueOnce(null);

      await updateProduct(productId, notFeaturedProductData);

      expect(prisma.products.count).not.toHaveBeenCalled();
    });

    it("should return 409, MAXIMUM_FEATURED_PRODUCTS_REACHED, if featured products count 4 or more", async () => {
      vi.mocked(prisma.products.findUnique)
        .mockResolvedValueOnce(notFeaturedProductData as any)
        .mockResolvedValueOnce(null);
      vi.mocked(prisma.products.count).mockResolvedValue(4);

      const result = await updateProduct(productId, newProductData);

      expect(result.status).toEqual(409);
      expect(result.message).toEqual("MAXIMUM_FEATURED_PRODUCTS_REACHED");
      expect(prisma.products.update).not.toHaveBeenCalled();
      expect(updateTag).not.toHaveBeenCalled();
    });

    it("should return 500 when database throws an error", async () => {
      vi.mocked(prisma.products.findUnique).mockRejectedValue(
        new Error("Database offline"),
      );
      const result = await updateProduct(productId, newProductData);
      expect(result.status).toEqual(500);
      expect(result.message).toEqual("INTERNAL_SERVER_ERROR");
      expect(updateTag).not.toHaveBeenCalled();
    });

    it("should update product and return 200", async () => {
      vi.mocked(prisma.products.findUnique)
        .mockResolvedValueOnce(fakeProductData as any)
        .mockResolvedValueOnce(null);

      vi.mocked(prisma.products.count).mockResolvedValue(4);

      const result = await updateProduct(productId, newProductData);
      expect(result.status).toEqual(200);
      expect(updateTag).toHaveBeenCalledWith(PRODUCTS_CACHE_TAG);
      expect(prisma.products.update).toHaveBeenCalledWith({
        where: { id: productId },
        data: {
          slug: generateSlug(newProductData.productNameEn),
          ...newProductData,
        },
      });
    });

    it("should delete old image from uploadthing when card image is changed", async () => {
      const storedProduct = {
        ...fakeProductData,
        productCardImage: "https://utfs.io/f/old-card.jpg",
        manufacturerLogo: "https://utfs.io/f/same-logo.jpg",
        productImages: ["https://utfs.io/f/same-gallery.jpg"],
      };

      const updatedData = {
        ...newProductData,
        productCardImage: "https://utfs.io/f/new-card.jpg",
        manufacturerLogo: "https://utfs.io/f/same-logo.jpg",
        productImages: ["https://utfs.io/f/same-gallery.jpg"],
      };

      vi.mocked(prisma.products.findUnique)
        .mockResolvedValueOnce(storedProduct as any)
        .mockResolvedValueOnce(null);

      vi.mocked(prisma.products.count).mockResolvedValue(0);
      vi.mocked(prisma.products.update).mockResolvedValue({} as any);

      const result = await updateProduct(productId, updatedData);
      expect(result.status).toEqual(200);
      expect(mockDeleteFiles).toHaveBeenCalledWith("old-card.jpg");
    });

    it("should delete old images from uploadthing when multiple images are changed or removed", async () => {
      const storedProduct = {
        ...fakeProductData,
        productCardImage: "https://utfs.io/f/old-card.jpg",
        manufacturerLogo: "https://utfs.io/f/old-logo.jpg",
        productImages: [
          "https://utfs.io/f/kept-gallery.jpg",
          "https://utfs.io/f/removed-gallery.jpg",
        ],
      };

      const updatedData = {
        ...newProductData,
        productCardImage: "https://utfs.io/f/new-card.jpg",
        manufacturerLogo: "https://utfs.io/f/new-logo.jpg",
        productImages: ["https://utfs.io/f/kept-gallery.jpg"],
      };

      vi.mocked(prisma.products.findUnique)
        .mockResolvedValueOnce(storedProduct as any)
        .mockResolvedValueOnce(null);

      vi.mocked(prisma.products.count).mockResolvedValue(0);
      vi.mocked(prisma.products.update).mockResolvedValue({} as any);

      const result = await updateProduct(productId, updatedData);
      expect(result.status).toEqual(200);
      expect(mockDeleteFiles).toHaveBeenCalledWith([
        "old-card.jpg",
        "old-logo.jpg",
        "removed-gallery.jpg",
      ]);
    });
  });

  describe("deleteProduct", () => {
    const productId = "product-id";
    it("should return 400 if id wasnt sent", async () => {
      const result = await deleteProduct("");
      expect(result.status).toEqual(400);
      expect(updateTag).not.toHaveBeenCalledWith(PRODUCTS_CACHE_TAG);
    });

    it("should return 404 if product not found", async () => {
      vi.mocked(prisma.products.findUnique).mockResolvedValue(null);

      const result = await deleteProduct(productId);
      expect(result.status).toEqual(404);
      expect(updateTag).not.toHaveBeenCalled();
    });

    it("should return internal server error if an error occured", async () => {
      vi.mocked(prisma.products.findUnique).mockRejectedValue(
        new Error("error"),
      );

      const result = await deleteProduct(productId);
      expect(result.status).toEqual(500);
      expect(updateTag).not.toHaveBeenCalled();
    });

    it("should delete product and return 200", async () => {
      vi.mocked(prisma.products.findUnique).mockResolvedValue({} as any);
      vi.mocked(prisma.products.delete).mockResolvedValue({} as any);

      const result = await deleteProduct(productId);
      expect(result.status).toEqual(200);
      expect(updateTag).toHaveBeenCalledWith(PRODUCTS_CACHE_TAG);
      expect(prisma.products.delete).toHaveBeenCalledWith({
        where: { id: productId },
      });
    });

    it("should delete product and its images from uploadthing and return 200", async () => {
      const productWithImages = {
        id: productId,
        productNameEn: "Sample",
        productCardImage: "https://utfs.io/f/card-123.jpg",
        manufacturerLogo: "https://utfs.io/f/logo-123.jpg",
        productImages: [
          "https://utfs.io/f/gallery-1.jpg",
          "https://utfs.io/f/gallery-2.jpg",
        ],
      };

      vi.mocked(prisma.products.findUnique).mockResolvedValue(
        productWithImages as any,
      );
      vi.mocked(prisma.products.delete).mockResolvedValue({} as any);

      const result = await deleteProduct(productId);
      expect(result.status).toEqual(200);
      expect(mockDeleteFiles).toHaveBeenCalledWith([
        "card-123.jpg",
        "logo-123.jpg",
        "gallery-1.jpg",
        "gallery-2.jpg",
      ]);
      expect(updateTag).toHaveBeenCalledWith(PRODUCTS_CACHE_TAG);
      expect(prisma.products.delete).toHaveBeenCalledWith({
        where: { id: productId },
      });
    });
  });

  describe("deleteManyProducts", () => {
    it("should return 400 if no ids sent", async () => {
      const result = await deleteManyProducts([]);
      expect(result.status).toEqual(400);
      expect(prisma.products.findMany).not.toHaveBeenCalled();
    });

    it("should return 404 if products not found", async () => {
      vi.mocked(prisma.products.findMany).mockResolvedValue([]);
      const result = await deleteManyProducts(["prod-1"]);
      expect(result.status).toEqual(404);
      expect(prisma.products.findMany).toHaveBeenCalledWith({
        where: { id: { in: ["prod-1"] } },
      });
    });

    it("should return 400 if no products deleted", async () => {
      const products = [
        {
          id: "prod-1",
          productCardImage: "https://utfs.io/f/card-1.jpg",
          manufacturerLogo: "https://utfs.io/f/logo-1.jpg",
          productImages: ["https://utfs.io/f/gallery-1.jpg"],
        },
      ];
      vi.mocked(prisma.products.findMany).mockResolvedValue(products as any);
      vi.mocked(prisma.products.deleteMany).mockResolvedValue({
        count: 0,
      } as any);

      const result = await deleteManyProducts(["prod-1"]);
      expect(result.status).toEqual(400);
      expect(result.deletedCount).toEqual(0);
      expect(mockDeleteFiles).not.toHaveBeenCalled();
    });

    it("should return 500 if database throws error", async () => {
      vi.mocked(prisma.products.findMany).mockRejectedValue(
        new Error("Database error"),
      );
      const result = await deleteManyProducts(["prod-1"]);
      expect(result.status).toEqual(500);
      expect(updateTag).not.toHaveBeenCalled();
    });

    it("should delete products and their images from uploadthing, and return 200", async () => {
      const products = [
        {
          id: "prod-1",
          productCardImage: "https://utfs.io/f/card-1.jpg",
          manufacturerLogo: "https://utfs.io/f/logo-1.jpg",
          productImages: ["https://utfs.io/f/gallery-1.jpg"],
        },
        {
          id: "prod-2",
          productCardImage: "https://utfs.io/f/card-2.jpg",
          manufacturerLogo: "https://utfs.io/f/logo-2.jpg",
          productImages: ["https://utfs.io/f/gallery-2.jpg"],
        },
      ];
      const ids = products.map((p) => p.id);
      vi.mocked(prisma.products.findMany).mockResolvedValue(products as any);
      vi.mocked(prisma.products.deleteMany).mockResolvedValue({
        count: 2,
      } as any);

      const result = await deleteManyProducts(ids);
      expect(result.status).toEqual(200);
      expect(result.deletedCount).toEqual(2);
      expect(mockDeleteFiles).toHaveBeenCalledWith([
        "card-1.jpg",
        "logo-1.jpg",
        "gallery-1.jpg",
        "card-2.jpg",
        "logo-2.jpg",
        "gallery-2.jpg",
      ]);
      expect(updateTag).toHaveBeenCalledWith(PRODUCTS_CACHE_TAG);
    });
  });

  describe.only("getAllProductsByLocale", () => {
    it("it should return internal server error when an error occured", async () => {
      vi.mocked(prisma.products.count).mockRejectedValue(new Error("error"));

      const result = await getAllProductsByLocale("en", {});
      expect(result.status).toEqual(500);
    });

    it("should return all products with pageination details in case of not categories filter", async () => {
      vi.mocked(prisma.products.count).mockResolvedValue(1);
      vi.mocked(prisma.products.findMany).mockResolvedValue(
        fakeProductsDataWithCategory as any,
      );

      const result = await getAllProductsByLocale("en", {});

      expect(result.status).toEqual(200);
      expect(result.data.products).toEqual(fakeProductsDataWithCategoryEn);
      expect(result.data.pagination).toEqual({
        currentPage: 1,
        totalPages: 1,
        totalItems: 1,
        itemsPerPage: 9,
      });
    });

    it("should return filtered products by category", async () => {
      vi.mocked(prisma.products.count).mockResolvedValue(2);
      vi.mocked(prisma.products.findMany).mockResolvedValue(
        fakeProductsDataWithCategory2 as any,
      );

      const result = await getAllProductsByLocale("en", {
        categories: ["category-id"],
      });

      expect(result.status).toEqual(200);
      expect(result.data.products).toEqual(fakeProductsDataWithCategoryEn2);
      expect(result.data.pagination).toEqual({
        currentPage: 1,
        totalPages: 1,
        totalItems: 2,
        itemsPerPage: 9,
      });
      expect(prisma.products.findMany).toHaveBeenCalledWith({
        where: {
          categoryId: {
            in: ["category-id"],
          },
        },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          productNameEn: true,
          productNameAr: true,
          productDescriptionEn: true,
          productDescriptionAr: true,
          productCardImage: true,
          productImages: true,
          manufacturerNameEN: true,
          manufacturerNameAr: true,
          slug: true,
          categories: {
            select: { categoryNameEn: true, categoryNameAr: true },
          },
        },
        skip: 0,
        take: 9,
      });
    });
  });
});
