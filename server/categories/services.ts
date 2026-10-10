import { prisma } from "@/lib/prisma";
import { updateTag, unstable_cache } from "next/cache";
import { Locale } from "@/types/index";
import {
  categorySchema,
  updateCategorySchema,
  CreateCategoryFormType,
} from "./validators";
import { generateSlug } from "@/lib/helpers/index";
import {
  CATEGORIES_CACHE_TAG,
  PRODUCTS_CACHE_TAG,
} from "@/lib/constants/allCacheTags";

export const addNewCategory = async (newCategory: CreateCategoryFormType) => {
  try {
    const validation = categorySchema.safeParse(newCategory);

    if (validation.success) {
      const existingCategory = await prisma.categories.findFirst({
        where: {
          categoryNameEn: validation.data.categoryNameEn,
        },
      });

      if (existingCategory)
        return {
          success: false,
          message: "CATEGORY_ALREADY_EXISTS",
          status: 409,
        };

      if (validation.data.isFeatured) {
        const featuredCategoriesCount = await prisma.categories.count({
          where: {
            isFeatured: true,
          },
        });

        if (featuredCategoriesCount >= 5)
          return {
            success: false,
            message: "MAXIMUM_FEATURED_CATEGORY_REACHED",
            status: 409,
          };
      }

      const slug = generateSlug(validation.data.categoryNameEn);

      await prisma.categories.create({
        data: {
          ...validation.data,
          slug,
        },
      });

      updateTag(CATEGORIES_CACHE_TAG);
      return {
        success: true,
        message: "CATEGORY_ADDED_SUCCESSFULLY",
        status: 201,
      };
    }

    return {
      success: false,
      message: "VALIDATION_ERROR",
      status: 400,
    };
  } catch (error) {
    console.error("addNewCategory error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const updateCategory = async (
  id: string,
  updatedCategoryData: CreateCategoryFormType,
) => {
  try {
    if (!id)
      return {
        success: false,
        message: "CATEGORY_ID_REQUIRED",
        status: 400,
      };

    const validation = updateCategorySchema.safeParse(updatedCategoryData);

    if (validation.success) {
      const existingCategory = await prisma.categories.findUnique({
        where: { id },
      });

      if (!existingCategory)
        return {
          success: false,
          message: "CATEGORY_NOT_FOUND",
          status: 404,
        };

      let slug = existingCategory.slug;

      if (validation.data.categoryNameEn) {
        const categoryWithSameName = await prisma.categories.findFirst({
          where: {
            categoryNameEn: validation.data.categoryNameEn,
            NOT: {
              id,
            },
          },
        });

        if (categoryWithSameName)
          return {
            success: false,
            message: "CATEGORY_ALREADY_EXISTS",
            status: 409,
          };

        slug = generateSlug(validation.data.categoryNameEn);
      }

      const isFeatured =
        validation.data.isFeatured ?? existingCategory.isFeatured;

      if (isFeatured && !existingCategory.isFeatured) {
        const featuredCategoriesCount = await prisma.categories.count({
          where: {
            isFeatured: true,
          },
        });

        if (featuredCategoriesCount >= 5)
          return {
            success: false,
            message: "MAXIMUM_FEATURED_CATEGORY_REACHED",
            status: 409,
          };
      }

      await prisma.categories.update({
        where: { id },
        data: {
          ...validation.data,
          slug,
        },
      });

      updateTag(CATEGORIES_CACHE_TAG);

      return {
        success: true,
        message: "CATEGORY_UPDATED_SUCCESSFULLY",
        status: 200,
      };
    }

    return {
      success: false,
      message: "VALIDATION_ERROR",
      status: 400,
    };
  } catch (error) {
    console.error("updateCategory error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    if (!id)
      return {
        success: false,
        message: "CATEGORY_ID_REQUIRED",
        status: 400,
      };

    const existingCategory = await prisma.categories.findUnique({
      where: { id },
    });

    if (!existingCategory)
      return {
        success: false,
        message: "CATEGORY_NOT_FOUND",
        status: 404,
      };

    await prisma.categories.delete({
      where: { id },
    });

    updateTag(CATEGORIES_CACHE_TAG);
    updateTag(PRODUCTS_CACHE_TAG);

    return {
      success: true,
      message: "CATEGORY_DELETED_SUCCESSFULLY",
      status: 200,
    };
  } catch (error) {
    console.error("deleteCategory error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const deleteManyCategories = async (ids: string[]) => {
  try {
    if (!ids.length) {
      return {
        success: false,
        message: "CATEGORY_IDS_REQUIRED",
        status: 400,
        deletedCount: 0,
      };
    }

    const existingCategories = await prisma.categories.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (existingCategories.length === 0) {
      return {
        success: false,
        message: "CATEGORIES_NOT_FOUND",
        status: 404,
        deletedCount: 0,
      };
    }

    const result = await prisma.categories.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    updateTag(CATEGORIES_CACHE_TAG);
    updateTag(PRODUCTS_CACHE_TAG);

    return {
      success: true,
      message: "ITEMS_DELETED",
      status: 200,
      deletedCount: result.count,
    };
  } catch (error) {
    console.error("deleteManyCategories error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

/* -------------------- Caching Helps --------------------  */

const getCachedCategories = () =>
  unstable_cache(
    async () => {
      return prisma.categories.findMany({});
    },
    ["all-categories"],
    {
      tags: [CATEGORIES_CACHE_TAG],
      revalidate: 3600,
    },
  )();

const getCachedCategoryById = (id: string) =>
  unstable_cache(
    async () => {
      return prisma.categories.findUnique({
        where: { id },
      });
    },
    [`category-${id}`],
    {
      tags: [CATEGORIES_CACHE_TAG],
      revalidate: 3600,
    },
  )();

const getCachedCategoriesByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      const categories = await prisma.categories.findMany({});

      return categories.map((category) => ({
        id: category.id,
        name:
          locale === "en" ? category.categoryNameEn : category.categoryNameAr,
        description:
          locale === "en"
            ? category.categoryDescriptionEn
            : category.categoryDescriptionAr,
        image: category.image,
        isFeatured: category.isFeatured,
        createdAt: category.createdAt,
        slug: category.slug,
      }));
    },
    [`categories-locale-${locale}`],
    {
      tags: [CATEGORIES_CACHE_TAG],
      revalidate: 3600,
    },
  )();

const getCachedCategoryByIdAndLocale = (id: string, locale: Locale) =>
  unstable_cache(
    async () => {
      const category = await prisma.categories.findUnique({
        where: { id },
      });

      if (!category) return null;

      return {
        id: category.id,
        name:
          locale === "en" ? category.categoryNameEn : category.categoryNameAr,
        description:
          locale === "en"
            ? category.categoryDescriptionEn
            : category.categoryDescriptionAr,
        image: category.image,
        isFeatured: category.isFeatured,
        createdAt: category.createdAt,
      };
    },
    [`category-${id}-locale-${locale}`],
    {
      tags: [CATEGORIES_CACHE_TAG],
      revalidate: 3600,
    },
  )();

const getCachedFeaturedCategoriesByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      const categories = await prisma.categories.findMany({
        where: {
          isFeatured: true,
        },
      });

      return categories.map((category) => ({
        id: category.id,
        name:
          locale === "en" ? category.categoryNameEn : category.categoryNameAr,
        description:
          locale === "en"
            ? category.categoryDescriptionEn
            : category.categoryDescriptionAr,
        image: category.image,
        isFeatured: category.isFeatured,
        createdAt: category.createdAt,
        slug: category.slug,
      }));
    },
    [`featured-categories-locale-${locale}`],
    {
      tags: [CATEGORIES_CACHE_TAG],
      revalidate: 3600,
    },
  )();

const getCachedCategoriesNameAndId = () =>
  unstable_cache(
    async () => {
      const categories = await prisma.categories.findMany({
        select: {
          id: true,
          categoryNameEn: true,
        },
      });

      return categories.map((c) => ({
        categoryId: c.id,
        categoryName: c.categoryNameEn,
      }));
    },
    [`categories-name-id`],
    {
      tags: [CATEGORIES_CACHE_TAG],
      revalidate: 3600,
    },
  )();

export const getCategoriesNameAndId = async () => {
  try {
    const data = await getCachedCategoriesNameAndId();

    return {
      success: true,
      message: "CATEGORIES_RETRIEVED_SUCCESSFULLY",
      status: 200,
      data,
    };
  } catch (error) {
    console.error("getCategoriesNameAndId error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

const getCachedCategoriesNameAndIdByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      const categories = await prisma.categories.findMany({
        select: {
          id: true,
          categoryNameEn: true,
          categoryNameAr: true,
        },
      });

      return categories.map((c) => ({
        id: c.id,
        name: locale === "en" ? c.categoryNameEn : c.categoryNameAr,
      }));
    },
    [`categories-name-id-locale-${locale}`],
    {
      tags: [CATEGORIES_CACHE_TAG],
      revalidate: 3600,
    },
  )();

export const getCategoriesNameAndIdByLocale = async (locale: Locale) => {
  try {
    const categories = await getCachedCategoriesNameAndIdByLocale(locale);

    return {
      success: true,
      message: "CATEGORIES_RETRIEVED_SUCCESSFULLY",
      status: 200,
      categories,
    };
  } catch (error) {
    console.error("getCategoriesNameAndIdByLocale error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

/* -------------------- Caching Helps --------------------  */

export const getAllCategories = async () => {
  try {
    const categories = await getCachedCategories();

    return {
      success: true,
      message: "CATEGORIES_RETRIEVED_SUCCESSFULLY",
      status: 200,
      categories,
    };
  } catch (error) {
    console.error("getAllCategories error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getCategoryById = async (id: string) => {
  try {
    if (!id)
      return {
        success: false,
        message: "CATEGORY_ID_REQUIRED",
        status: 400,
      };

    const category = await getCachedCategoryById(id);

    if (!category)
      return {
        success: false,
        message: "CATEGORY_NOT_FOUND",
        status: 404,
      };

    return {
      success: true,
      message: "CATEGORY_RETRIEVED_SUCCESSFULLY",
      status: 200,
      category,
    };
  } catch (error) {
    console.error("getCategoryById error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getAllCategoriesByLocale = async (locale: Locale) => {
  try {
    const categories = await getCachedCategoriesByLocale(locale);

    return {
      success: true,
      message: "CATEGORIES_RETRIEVED_SUCCESSFULLY",
      status: 200,
      categories,
    };
  } catch (error) {
    console.error("getAllCategoriesByLocale error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getCategoryByIdAndLocale = async (id: string, locale: Locale) => {
  try {
    if (!id)
      return {
        success: false,
        message: "CATEGORY_ID_REQUIRED",
        status: 400,
      };

    const category = await getCachedCategoryByIdAndLocale(id, locale);

    if (!category)
      return {
        success: false,
        message: "CATEGORY_NOT_FOUND",
        status: 404,
      };

    return {
      success: true,
      message: "CATEGORY_RETRIEVED_SUCCESSFULLY",
      status: 200,
      category,
    };
  } catch (error) {
    console.error("getCategoryByIdAndLocale error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getFeaturedCategoryByLocale = async (locale: Locale) => {
  try {
    const categories = await getCachedFeaturedCategoriesByLocale(locale);

    return {
      success: true,
      message: "FEATURED_CATEGORIES_RETRIEVED_SUCCESSFULLY",
      status: 200,
      categories,
    };
  } catch (error) {
    console.error("getFeaturedCategoryByLocale error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};
