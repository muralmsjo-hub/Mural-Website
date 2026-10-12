import { AdminProductsFiltrationObject, ProductFilters } from "./types";
import { Locale } from "@/types";
import {
  createProductSchema,
  updateProductSchema,
  CreateProductFormType,
  UpdateProductFormType,
} from "./validators";
import { prisma } from "@/lib/prisma";
import { updateTag, unstable_cache } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { generateSlug } from "@/lib/helpers";
import { PRODUCTS_CACHE_TAG } from "@/lib/constants/allCacheTags";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

function getFileKey(url?: string | null) {
  if (!url) return null;
  try {
    return new URL(url).pathname.split("/f/")[1] || null;
  } catch {
    return null;
  }
}

export const addNewProduct = async (productData: CreateProductFormType) => {
  try {
    const validation = createProductSchema.safeParse(productData);
    if (!validation.success)
      return {
        success: false,
        message: "VALIDATION_ERROR",
        status: 400,
      };

    const existingProductWithSameName = await prisma.products.findUnique({
      where: { productNameEn: validation.data.productNameEn },
    });
    if (existingProductWithSameName)
      return {
        success: false,
        message: "PRODUCT_NAME_ALREADY_EXISTS",
        status: 409,
      };

    if (validation.data.isFeatured) {
      const featuredProductsCount = await prisma.products.count({
        where: {
          isFeatured: true,
        },
      });

      if (featuredProductsCount >= 4)
        return {
          success: false,
          message: "MAXIMUM_FEATURED_PRODUCTS_REACHED",
          status: 409,
        };
    }

    const slug = generateSlug(validation.data.productNameEn);

    await prisma.products.create({
      data: {
        slug,
        ...validation.data,
      },
    });
    updateTag(PRODUCTS_CACHE_TAG);
    return {
      success: true,
      message: "PRODUCT_ADDED_SUCCESSFULLY",
      status: 201,
    };
  } catch (error) {
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const updateProduct = async (
  productId: string,
  updatedProductData: UpdateProductFormType,
) => {
  try {
    if (!productId)
      return {
        success: false,
        message: "PRODUCT_ID_REQUIRED",
        status: 400,
      };

    const validation = updateProductSchema.safeParse(updatedProductData);
    if (!validation.success)
      return { success: false, message: "VALIDATION_ERROR", status: 400 };

    const product = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product)
      return {
        success: false,
        message: "PRODUCT_NOT_FOUND",
        status: 404,
      };

    const existingProductWithSameName = await prisma.products.findUnique({
      where: {
        productNameEn: validation.data.productNameEn,
        NOT: {
          id: productId,
        },
      },
    });

    if (existingProductWithSameName)
      return {
        success: false,
        message: "PRODUCT_NAME_ALREADY_EXISTS",
        status: 409,
      };

    const slug = generateSlug(validation.data.productNameEn);

    if (updatedProductData.isFeatured && !product.isFeatured) {
      const featuredProductsCount = await prisma.products.count({
        where: {
          isFeatured: true,
        },
      });

      if (featuredProductsCount >= 4)
        return {
          success: false,
          message: "MAXIMUM_FEATURED_PRODUCTS_REACHED",
          status: 409,
        };
    }

    await prisma.products.update({
      where: { id: productId },
      data: {
        slug,
        ...validation.data,
      },
    });

    const newImagesSet = new Set([
      validation.data.productCardImage,
      validation.data.manufacturerLogo,
      ...(Array.isArray(validation.data.productImages)
        ? validation.data.productImages
        : []),
    ]);

    const oldImagesToDelete: string[] = [];

    if (product.productCardImage !== validation.data.productCardImage) {
      oldImagesToDelete.push(product.productCardImage);
    }

    if (product.manufacturerLogo !== validation.data.manufacturerLogo) {
      oldImagesToDelete.push(product.manufacturerLogo);
    }

    if (Array.isArray(product.productImages)) {
      for (const img of product.productImages) {
        if (!validation.data.productImages.includes(img)) {
          oldImagesToDelete.push(img);
        }
      }
    }

    const fileKeys = Array.from(
      new Set(
        oldImagesToDelete
          .filter((url) => !newImagesSet.has(url))
          .map(getFileKey)
          .filter((key): key is string => Boolean(key)),
      ),
    );

    if (fileKeys.length) {
      try {
        await utapi.deleteFiles(fileKeys.length === 1 ? fileKeys[0] : fileKeys);
      } catch (err) {
        console.error("UploadThing delete error:", err);
      }
    }

    updateTag(PRODUCTS_CACHE_TAG);
    return {
      success: true,
      message: "PRODUCT_UPDATED_SUCCESSFULLY",
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

export const deleteProduct = async (id: string) => {
  try {
    if (!id)
      return {
        success: false,
        message: "PRODUCT_ID_REQUIRED",
        status: 400,
      };

    const existingProduct = await prisma.products.findUnique({
      where: { id },
    });

    if (!existingProduct)
      return {
        success: false,
        message: "PRODUCT_NOT_FOUND",
        status: 404,
      };

    await prisma.products.delete({
      where: { id },
    });

    const fileKeys = Array.from(
      new Set(
        [
          getFileKey(existingProduct.productCardImage),
          getFileKey(existingProduct.manufacturerLogo),
          ...(Array.isArray(existingProduct.productImages)
            ? existingProduct.productImages.map(getFileKey)
            : []),
        ].filter((key): key is string => Boolean(key)),
      ),
    );

    if (fileKeys.length) {
      await utapi.deleteFiles(fileKeys.length === 1 ? fileKeys[0] : fileKeys);
    }

    updateTag(PRODUCTS_CACHE_TAG);

    return {
      success: true,
      message: "PRODUCT_DELETED_SUCCESSFULLY",
      status: 200,
    };
  } catch (error) {
    console.error("deleteProduct error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const deleteManyProducts = async (ids: string[]) => {
  try {
    if (!ids.length) {
      return {
        success: false,
        message: "PRODUCTS_IDS_REQUIRED",
        status: 400,
        deletedCount: 0,
      };
    }

    const existingProducts = await prisma.products.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (existingProducts.length === 0) {
      return {
        success: false,
        message: "PRODUCTS_NOT_FOUND",
        status: 404,
        deletedCount: 0,
      };
    }

    const result = await prisma.products.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (result.count === 0) {
      return {
        success: false,
        message: "PRODUCTS_DELETE_FAILED",
        status: 400,
        deletedCount: result.count,
      };
    }

    const fileKeys = Array.from(
      new Set(
        existingProducts
          .flatMap((product) => [
            getFileKey(product.productCardImage),
            getFileKey(product.manufacturerLogo),
            ...(Array.isArray(product.productImages)
              ? product.productImages.map(getFileKey)
              : []),
          ])
          .filter((key): key is string => Boolean(key)),
      ),
    );

    if (fileKeys.length) {
      await utapi.deleteFiles(fileKeys);
    }

    updateTag(PRODUCTS_CACHE_TAG);
    return {
      success: true,
      message: "ITEMS_DELETED",
      status: 200,
      deletedCount: result.count,
    };
  } catch (error) {
    console.error("deleteManyProducts error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

/* -------------------- Caching Helps --------------------  */

const getCachedProductsSitemap = () => {
  return unstable_cache(
    async () => {
      const products = await prisma.products.findMany({
        include: { categories: { select: { categoryNameEn: true } } },
      });

      return products;
    },
    ["sitemap-all-products"],
    {
      tags: [PRODUCTS_CACHE_TAG],
      revalidate: 3600,
    },
  )();
};

const getCachedProducts = (filtrationObj: AdminProductsFiltrationObject) => {
  const cacheKey = ["admin-filtered-products", JSON.stringify(filtrationObj)];

  return unstable_cache(
    async () => {
      const pageNum = filtrationObj.page ?? 1;
      const takeNum = filtrationObj.take ?? 10;
      const category = filtrationObj.category;
      const where: Prisma.productsWhereInput = {};
      if (category) where.categoryId = category;

      const skip = takeNum * (pageNum - 1);
      const totalProducts = await prisma.products.count({
        where,
      });
      const products = await prisma.products.findMany({
        skip,
        take: takeNum,
        include: { categories: { select: { categoryNameEn: true } } },
        where,
      });

      return {
        products,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(totalProducts / takeNum) || 1,
          totalItems: totalProducts,
          itemsPerPage: takeNum,
        },
      };
    },
    cacheKey,
    {
      tags: [PRODUCTS_CACHE_TAG],
      revalidate: 3600,
    },
  )();
};

const getCachedProductsByLocale = (
  locale: Locale,
  filtrationObj: AdminProductsFiltrationObject,
) => {
  const page = filtrationObj.page ?? 1;
  const take = filtrationObj.take ?? 9;
  const categories = (filtrationObj.categories || []).filter(
    Boolean,
  ) as string[];
  const category = filtrationObj.category;

  const cacheKey = [
    `products-locale-${locale}`,
    `page-${page}`,
    `take-${take}`,
    `categories-${categories.slice().sort().join(",")}`,
    `category-${category ?? ""}`,
  ];

  return unstable_cache(
    async () => {
      let where: Prisma.productsWhereInput = {};

      if (categories.length > 0) {
        where.categoryId = {
          in: categories,
        };
      } else if (category) {
        where.categoryId = category;
      }

      const skip = take * (page - 1);
      const totalProducts = await prisma.products.count({ where });

      const products = await prisma.products.findMany({
        where,
        skip,
        take,
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
      });

      const formattedProducts = products.map((product) => ({
        id: product.id,
        productName:
          locale === "en" ? product.productNameEn : product.productNameAr,
        productDescription:
          locale === "en"
            ? product.productDescriptionEn
            : product.productDescriptionAr,
        manufacturerName:
          locale === "en"
            ? product.manufacturerNameEN
            : product.manufacturerNameAr,
        productCardImage: product.productCardImage,
        productImages: product.productImages,
        slug: product.slug,
        categoryName:
          locale === "en"
            ? product.categories.categoryNameEn
            : product.categories.categoryNameAr,
      }));

      return {
        products: formattedProducts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalProducts / take) || 1,
          totalItems: totalProducts,
          itemsPerPage: take,
        },
      };
    },
    cacheKey,
    {
      tags: [PRODUCTS_CACHE_TAG],
      revalidate: 3600,
    },
  )();
};

const getCachedProductById = (id: string) =>
  unstable_cache(
    async () => {
      return prisma.products.findUnique({
        where: { id },
      });
    },
    [`product-by-id-${id}`],
    {
      tags: [PRODUCTS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

const getCachedProductBySlugAndLocale = async (slug: string, locale: Locale) =>
  unstable_cache(
    async () => {
      const product = await prisma.products.findUnique({
        where: { slug },
        select: {
          id: true,
          productNameEn: true,
          productNameAr: true,
          productDescriptionEn: true,
          productDescriptionAr: true,
          productCardImage: true,
          slug: true,
          productImages: true,
          manufacturerNameEN: true,
          manufacturerNameAr: true,
          manufacturerLogo: true,
          categoryId: true,
          categories: {
            select: {
              id: true,
              categoryNameEn: true,
              categoryNameAr: true,
              categoryDescriptionEn: true,
              categoryDescriptionAr: true,
            },
          },
        },
      });

      if (!product) return null;

      return {
        id: product.id,
        productName:
          locale === "en" ? product.productNameEn : product.productNameAr,
        productDescription:
          locale === "en"
            ? product.productDescriptionEn
            : product.productDescriptionAr,
        productCardImage: product.productCardImage,
        productImages: product.productImages,
        slug: product.slug,
        categoryId: product.categoryId,
        categoryName:
          locale === "en"
            ? product.categories.categoryNameEn
            : product.categories.categoryNameAr,
        categoryDescription:
          locale === "en"
            ? product.categories.categoryDescriptionEn
            : product.categories.categoryDescriptionAr,
        manufacturerName:
          locale === "en"
            ? product.manufacturerNameEN
            : product.manufacturerNameAr,
        manufacturerLogo: product.manufacturerLogo,
      };
    },
    [`product-by-slug-${slug}-and-locale-${locale}`],
    {
      tags: [PRODUCTS_CACHE_TAG, "wishlist"],
      revalidate: 3600,
    },
  )();

const getCachedRelatedProducts = (
  locale: Locale,
  categoryId: string,
  currentProductId: string,
  limit: number = 3,
) => {
  return unstable_cache(
    async () => {
      const products = await prisma.products.findMany({
        where: {
          categoryId,
          NOT: {
            id: currentProductId,
          },
        },
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          productNameEn: true,
          productNameAr: true,
          productDescriptionEn: true,
          productDescriptionAr: true,
          productCardImage: true,
          slug: true,
          manufacturerNameEN: true,
          manufacturerNameAr: true,
          categories: {
            select: { categoryNameEn: true, categoryNameAr: true },
          },
        },
      });

      return products.map((product) => ({
        id: product.id,
        productName:
          locale === "en" ? product.productNameEn : product.productNameAr,
        productDescription:
          locale === "en"
            ? product.productDescriptionEn
            : product.productDescriptionAr,
        manufacturerName:
          locale === "en"
            ? product.manufacturerNameEN
            : product.manufacturerNameAr,
        productCardImage: product.productCardImage,
        slug: product.slug,
        categoryName:
          locale === "en"
            ? product.categories.categoryNameEn
            : product.categories.categoryNameAr,
      }));
    },
    [`related-products-${locale}-${categoryId}-${currentProductId}`],
    {
      tags: [PRODUCTS_CACHE_TAG],
      revalidate: 3600,
    },
  )();
};

const getCachedRelatedProductsBySlug = (
  locale: Locale,
  slug: string,
  limit: number = 3,
) => {
  return unstable_cache(
    async () => {
      const currentProduct = await prisma.products.findUnique({
        where: { slug },
        select: { id: true, categoryId: true },
      });

      if (!currentProduct) return [];

      const products = await prisma.products.findMany({
        where: {
          categoryId: currentProduct.categoryId,
          NOT: {
            id: currentProduct.id,
          },
        },
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          productNameEn: true,
          productNameAr: true,
          productDescriptionEn: true,
          productDescriptionAr: true,
          productCardImage: true,
          slug: true,
          manufacturerNameEN: true,
          manufacturerNameAr: true,
          categories: {
            select: { categoryNameEn: true, categoryNameAr: true },
          },
        },
      });

      return products.map((product) => ({
        id: product.id,
        productName:
          locale === "en" ? product.productNameEn : product.productNameAr,
        productDescription:
          locale === "en"
            ? product.productDescriptionEn
            : product.productDescriptionAr,
        manufacturerName:
          locale === "en"
            ? product.manufacturerNameEN
            : product.manufacturerNameAr,
        productCardImage: product.productCardImage,
        slug: product.slug,
        categoryName:
          locale === "en"
            ? product.categories.categoryNameEn
            : product.categories.categoryNameAr,
      }));
    },
    [`related-products-by-slug-${locale}-${slug}`],
    {
      tags: [PRODUCTS_CACHE_TAG],
      revalidate: 3600,
    },
  )();
};

const getCachedfilteredProducts = (
  productsFilters: ProductFilters,
  locale: Locale,
) => {
  const cacheKey = [
    "filtered-products",
    locale,
    JSON.stringify(productsFilters),
  ];

  return unstable_cache(
    async () => {
      // where Object (prisma)
      const where: Prisma.productsWhereInput = {};

      // filter products by category
      if (productsFilters.categories) {
        where.categoryId = {
          in: productsFilters.categories,
        };
      }

      // search prdocuts by name
      if (productsFilters.search) {
        where.OR = [
          {
            productNameEn: {
              contains: productsFilters.search.trim(),
              mode: "insensitive",
            },
          },
          {
            productNameAr: {
              contains: productsFilters.search.trim(),
              mode: "insensitive",
            },
          },
        ];
      }

      // sort product
      let orderBy: Prisma.productsOrderByWithRelationInput = {
        createdAt: "desc",
      };

      switch (productsFilters.sort) {
        case "newest":
          orderBy = { createdAt: "desc" };
          break;

        case "oldest":
          orderBy = { createdAt: "asc" };
          break;
      }

      // pagination
      const skip = 10 * ((productsFilters.page ?? 1) - 1);
      const take = 10;

      const totalProducts = await prisma.products.count({
        where,
      });

      // query
      const products = await prisma.products.findMany({
        where,
        skip,
        take,
        orderBy,
        select: {
          id: true,
          productNameEn: true,
          productNameAr: true,
          productDescriptionEn: true,
          productDescriptionAr: true,
          productCardImage: true,
          slug: true,
          categories: {
            select: { categoryNameEn: true, categoryNameAr: true },
          },
        },
      });

      // get products by locale
      const data = products.map((product) => ({
        id: product.id,
        productName:
          locale === "en" ? product.productNameEn : product.productNameAr,
        productDescription:
          locale === "en"
            ? product.productDescriptionEn
            : product.productDescriptionAr,
        productCardImage: product.productCardImage,
        slug: product.slug,
        categoryName:
          locale === "en"
            ? product.categories.categoryNameEn
            : product.categories.categoryNameAr,
      }));

      return {
        data,
        pagination: {
          currentPage: productsFilters.page ?? 1,

          totalPages: Math.ceil(totalProducts / take),

          totalItems: totalProducts,

          itemsPerPage: take,
        },
      };
    },
    cacheKey,
    { tags: [PRODUCTS_CACHE_TAG], revalidate: 3600 },
  )();
};

const getCachedFeaturedProductsByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      const products = await prisma.products.findMany({
        where: {
          isFeatured: true,
        },
        select: {
          id: true,
          productNameEn: true,
          productNameAr: true,
          productDescriptionEn: true,
          productDescriptionAr: true,
          productCardImage: true,
          slug: true,
          manufacturerNameEN: true,
          manufacturerNameAr: true,
          manufacturerLogo: true,
          categories: {
            select: { categoryNameEn: true, categoryNameAr: true },
          },
        },
      });

      const data = products.map((product) => ({
        id: product.id,
        productName:
          locale === "en" ? product.productNameEn : product.productNameAr,
        productDescription:
          locale === "en"
            ? product.productDescriptionEn
            : product.productDescriptionAr,
        productCardImage: product.productCardImage,
        slug: product.slug,
        categoryName:
          locale === "en"
            ? product.categories.categoryNameEn
            : product.categories.categoryNameAr,
        manufacturerName:
          locale === "en"
            ? product.manufacturerNameEN
            : product.manufacturerNameAr,
        manufacturerLogo: product.manufacturerLogo,
      }));

      return data;
    },
    [`featured-products-by-locale-${locale}`],
    {
      tags: [PRODUCTS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

/* -------------------- Caching Helps --------------------  */

export const getAllProductsSitemap = async () => {
  try {
    const result = await getCachedProductsSitemap();

    return {
      success: true,
      message: "PRODUCTS_RETRIEVED_SUCCESSFULLY",
      status: 200,
      data: result,
    };
  } catch (error) {
    console.error("getAllProductsSitemap error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getAllProducts = async (
  filtrationObj: AdminProductsFiltrationObject,
) => {
  try {
    const result = await getCachedProducts(filtrationObj);

    return {
      success: true,
      message: "PRODUCTS_RETRIEVED_SUCCESSFULLY",
      status: 200,
      data: result,
    };
  } catch (error) {
    console.error("getAllProducts error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getProductById = async (id: string) => {
  try {
    const product = await getCachedProductById(id);

    if (!product)
      return {
        success: false,
        message: "PRODUCT_NOT_FOUND",
        status: 404,
      };

    return {
      success: true,
      message: "PRODUCT_RETRIEVED_SUCCESSFULLY",
      status: 200,
      data: product,
    };
  } catch (error) {
    console.error("getProductById error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getAllProductsByLocale = async (
  locale: Locale,
  filtrationObj: AdminProductsFiltrationObject,
) => {
  try {
    const products = await getCachedProductsByLocale(locale, filtrationObj);

    return {
      success: true,
      message: "PRODUCTS_RETRIEVED_SUCCESSFULLY",
      status: 200,
      data: products,
    };
  } catch (error) {
    console.log("getAllProductsByLocale error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getProductBySlugAndLocale = async (
  locale: Locale,
  slug: string,
) => {
  try {
    const product = await getCachedProductBySlugAndLocale(slug, locale);

    if (!product)
      return {
        success: false,
        message: "PRODUCT_NOT_FOUND",
        status: 404,
      };

    return {
      success: true,
      message: "PRODUCT_RETRIEVED_SUCCESSFULLY",
      status: 200,
      data: product,
    };
  } catch (error) {
    console.error("getProductBySlugAndLocale error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getFilterProducts = async (
  productsFilters: ProductFilters,
  locale: Locale,
) => {
  try {
    const products = await getCachedfilteredProducts(productsFilters, locale);
    const { pagination, data } = products;

    return {
      success: true,
      message: "PRODUCTS_RETRIEVED_SUCCESSFULLY",
      status: 200,
      data: {
        products: data,
        pagination,
      },
    };
  } catch (error) {
    console.error("getFilterProducts error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};
export const getFeaturedProductsByLocale = async (locale: Locale) => {
  try {
    const data = await getCachedFeaturedProductsByLocale(locale);

    return {
      success: true,
      message: "FEATURED_PRODUCTS_RETRIEVED_SUCCESSFULLY",
      status: 200,
      data,
    };
  } catch (error) {
    console.error("getFeaturedProductsByLocale error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getRelatedProductsByCategoryId = async (
  locale: Locale,
  categoryId: string,
  currentProductId: string,
  limit: number = 3,
) => {
  try {
    const data = await getCachedRelatedProducts(
      locale,
      categoryId,
      currentProductId,
      limit,
    );

    return {
      success: true,
      message: "RELATED_PRODUCTS_RETRIEVED_SUCCESSFULLY",
      status: 200,
      data,
    };
  } catch (error) {
    console.error("getRelatedProductsByCategoryId error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getRelatedProductsByProductSlug = async (
  locale: Locale,
  slug: string,
  limit: number = 3,
) => {
  try {
    const data = await getCachedRelatedProductsBySlug(locale, slug, limit);

    return {
      success: true,
      message: "RELATED_PRODUCTS_RETRIEVED_SUCCESSFULLY",
      status: 200,
      data,
    };
  } catch (error) {
    console.error("getRelatedProductsByProductSlug error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getProductsForSelection = async (locale: Locale = "en") => {
  try {
    const products = await prisma.products.findMany({
      select: {
        id: true,
        productNameEn: true,
        productNameAr: true,
      },
      orderBy: {
        productNameEn: "asc",
      },
    });

    const options = products.map((product) => ({
      value: product.id,
      label: locale === "ar" ? product.productNameAr : product.productNameEn,
    }));

    return {
      success: true,
      data: options,
    };
  } catch (error) {
    console.error("getProductsForSelection error:", error);
    return {
      success: false,
      data: [],
    };
  }
};
