import { prisma } from "@/lib/prisma";
import {
  bannerSchema,
  updateBannerSchema,
  CreateBannerFormType,
  UpdateBannerFormType,
} from "./validators";
import { unstable_cache, updateTag } from "next/cache";
import { UTApi } from "uploadthing/server";
import { BANEERS_CACHE_TAG } from "@/lib/constants/allCacheTags";

const utapi = new UTApi();

function getFileKey(url: string) {
  try {
    return new URL(url).pathname.split("/f/")[1] || null;
  } catch {
    return null;
  }
}

export const createBanner = async (newBanner: CreateBannerFormType) => {
  try {
    const validation = bannerSchema.safeParse(newBanner);

    if (validation.success) {
      await prisma.banners.create({
        data: validation.data,
      });

      updateTag(BANEERS_CACHE_TAG);
      return {
        success: true,
        message: "BANNER_CREATED_SUCCESSFULLY",
        status: 201,
      };
    }

    return {
      success: false,
      message: "VALIDATION_ERROR",
      status: 400,
    };
  } catch (error) {
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const updateBanner = async (
  id: string,
  updatedBannerData: UpdateBannerFormType,
) => {
  try {
    if (!id)
      return {
        success: false,
        message: "BANNER_ID_REQUIRED",
        status: 400,
      };

    const validation = updateBannerSchema.safeParse(updatedBannerData);

    if (!validation.success) {
      return {
        success: false,
        message: "VALIDATION_ERROR",
        status: 400,
      };
    }

    const existingBanner = await prisma.banners.findUnique({
      where: { id },
    });

    if (!existingBanner) {
      return {
        success: false,
        message: "BANNER_NOT_FOUND",
        status: 404,
      };
    }

    await prisma.banners.update({
      where: { id },
      data: validation.data,
    });

    if (existingBanner.image !== validation.data.image) {
      const key = getFileKey(existingBanner.image);

      if (key) {
        try {
          await utapi.deleteFiles(key);
        } catch (err) {
          console.error("UploadThing delete error:", err);
        }
      }
    }

    updateTag(BANEERS_CACHE_TAG);

    return {
      success: true,
      message: "BANNER_UPDATED_SUCCESSFULLY",
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
export const deleteBanner = async (id: string) => {
  try {
    if (!id)
      return {
        success: false,
        message: "BANNER_ID_REQUIRED",
        status: 400,
      };

    const existingBanner = await prisma.banners.findUnique({
      where: { id },
    });

    if (!existingBanner)
      return {
        success: false,
        message: "BANNER_NOT_FOUND",
        status: 404,
      };

    await prisma.banners.delete({
      where: { id },
    });

    const fileKey = getFileKey(existingBanner.image);

    if (fileKey) {
      await utapi.deleteFiles(fileKey);
    }
    updateTag(BANEERS_CACHE_TAG);
    return {
      success: true,
      message: "BANNER_DELETED_SUCCESSFULLY",
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

export const deleteManyBanner = async (ids: string[]) => {
  try {
    console.log(" i am in test banner");

    if (!ids.length) {
      return {
        success: false,
        message: "BANNER_IDS_REQUIRED",
        status: 400,
        deletedCount: 0,
      };
    }

    const existingBanners = await prisma.banners.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    console.log(" i am in test existingBanners");

    if (existingBanners.length === 0) {
      return {
        success: false,
        message: "BANNERS_NOT_FOUND",
        status: 404,
        deletedCount: 0,
      };
    }

    const result = await prisma.banners.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (result.count === 0) {
      return {
        success: false,
        message: "BANNERS_DELETE_FAILED",
        status: 400,
        deletedCount: result.count,
      };
    }

    console.log("result.count ", result.count);

    const fileKeys = existingBanners
      .map((banner) => getFileKey(banner.image))
      .filter((key): key is string => Boolean(key));

    if (fileKeys.length) {
      await utapi.deleteFiles(fileKeys);
    }

    updateTag(BANEERS_CACHE_TAG);

    return {
      success: true,
      message: "ITEMS_DELETED",
      status: 200,
      deletedCount: result.count,
    };
  } catch (error) {
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

/* -------------------- Caching Helps --------------------  */

// cached banners used with getAllBanners and getAllBannersByLocale
const getCachedBanners = () =>
  unstable_cache(
    async () => {
      return prisma.banners.findMany({});
    },
    ["all-banners"],
    { tags: [BANEERS_CACHE_TAG], revalidate: 3600 },
  )();

// cached banner by id used with getBannerById
const getCachedBannerById = (id: string) =>
  unstable_cache(
    async () => {
      return prisma.banners.findUnique({
        where: { id },
      });
    },
    [`banner-${id}`],
    {
      tags: [BANEERS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

// cached banners by locale used with getAllBannersByLocale
const getCachedBannersByLocale = (locale: "ar" | "en") =>
  unstable_cache(
    async () => {
      const banners = await prisma.banners.findMany({});

      return banners.map((banner) => ({
        id: banner.id,
        name: locale === "ar" ? banner.nameAr : banner.nameEn,
        image: banner.image,
        createdAt: banner.createdAt,
      }));
    },
    [`banners-locale-${locale}`],
    {
      tags: [BANEERS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

/* -------------------- Caching Helps --------------------  */

export const getAllBanners = async () => {
  try {
    const banners = await getCachedBanners();

    return {
      success: true,
      message: "BANNERS_RETRIEVED_SUCCESSFULLY",
      status: 200,
      banners,
    };
  } catch (error) {
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getBannerById = async (id: string) => {
  try {
    if (!id)
      return {
        success: false,
        message: "BANNER_ID_REQUIRED",
        status: 400,
      };

    const banner = await getCachedBannerById(id);

    if (!banner)
      return {
        success: false,
        message: "BANNER_NOT_FOUND",
        status: 404,
      };

    return {
      success: true,
      message: "BANNER_RETRIEVED_SUCCESSFULLY",
      status: 200,
      banner,
    };
  } catch (error) {
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getAllBannersByLocale = async (locale: "ar" | "en") => {
  try {
    const banners = await getCachedBannersByLocale(locale);

    return {
      success: true,
      message: "BANNERS_RETRIEVED_SUCCESSFULLY",
      status: 200,
      banners,
    };
  } catch (error) {
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};
