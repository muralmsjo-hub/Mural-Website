import { prisma } from "@/lib/prisma";
import {
  newPartnerSchema,
  updatePartnerSchema,
  NewPartnerFormType,
  UpdatePartnerFormType,
} from "./validators";
import { unstable_cache, updateTag } from "next/cache";
import { UTApi } from "uploadthing/server";
import { PARTNERS_CACHE_TAG } from "@/lib/constants/allCacheTags";

const utapi = new UTApi();

function getFileKey(url: string) {
  try {
    return new URL(url).pathname.split("/f/")[1] || null;
  } catch {
    return null;
  }
}

export const addNewPartner = async (newPartnerData: NewPartnerFormType) => {
  try {
    const validation = newPartnerSchema.safeParse(newPartnerData);
    if (!validation.success)
      return {
        success: false,
        message: "VALIDATION_ERROR",
        status: 400,
      };

    updateTag(PARTNERS_CACHE_TAG);
    await prisma.partners.create({ data: validation.data });
    return {
      success: true,
      message: "PARTNER_ADDED_SUCCESSFULLY",
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

export const updatePartner = async (
  id: string,
  updatedPartnerData: UpdatePartnerFormType,
) => {
  try {
    if (!id)
      return {
        success: false,
        message: "PARTNER_ID_REQUIRED",
        status: 400,
      };

    const validation = updatePartnerSchema.safeParse(updatedPartnerData);

    if (!validation.success)
      return {
        success: false,
        message: "VALIDATION_ERROR",
        status: 400,
      };

    const existingPartner = await prisma.partners.findUnique({
      where: { id },
    });

    if (!existingPartner)
      return {
        success: false,
        message: "PARTNER_NOT_FOUND",
        status: 404,
      };

    await prisma.partners.update({
      where: { id },
      data: validation.data,
    });

    // Delete old logo if it was replaced
    if (existingPartner.logo !== validation.data.logo && validation.data.logo) {
      const fileKey = getFileKey(existingPartner.logo);

      if (fileKey) {
        try {
          await utapi.deleteFiles(fileKey);
        } catch (error) {
          console.error("UploadThing delete error:", error);
        }
      }
    }

    updateTag(PARTNERS_CACHE_TAG);

    return {
      success: true,
      message: "PARTNER_UPDATED_SUCCESSFULLY",
      status: 200,
    };
  } catch (error) {
    console.error("updatePartner error:", error);

    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const deletePartner = async (id: string) => {
  try {
    if (!id)
      return {
        success: false,
        message: "PARTNER_ID_REQUIRED",
        status: 400,
      };

    const existingPartner = await prisma.partners.findUnique({
      where: { id },
    });

    if (!existingPartner)
      return {
        success: false,
        message: "PARTNER_NOT_FOUND",
        status: 404,
      };

    await prisma.partners.delete({
      where: { id },
    });

    const fileKey = getFileKey(existingPartner.logo);

    if (fileKey) {
      try {
        await utapi.deleteFiles(fileKey);
      } catch (error) {
        console.error("UploadThing delete error:", error);
      }
    }

    updateTag(PARTNERS_CACHE_TAG);

    return {
      success: true,
      message: "PARTNER_DELETED_SUCCESSFULLY",
      status: 200,
    };
  } catch (error) {
    console.error("deletePartner error:", error);

    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const deleteManyPartners = async (ids: string[]) => {
  try {
    if (!ids.length)
      return {
        success: false,
        message: "PARTNER_IDS_REQUIRED",
        status: 400,
        deletedCount: 0,
      };

    const existingPartners = await prisma.partners.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (existingPartners.length === 0)
      return {
        success: false,
        message: "PARTNERS_NOT_FOUND",
        status: 404,
        deletedCount: 0,
      };

    const result = await prisma.partners.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (result.count === 0)
      return {
        success: false,
        message: "PARTNERS_DELETE_FAILED",
        status: 400,
        deletedCount: 0,
      };

    const fileKeys = existingPartners
      .map((partner) => getFileKey(partner.logo))
      .filter((key): key is string => Boolean(key));

    if (fileKeys.length) {
      try {
        await utapi.deleteFiles(fileKeys);
      } catch (error) {
        console.error("UploadThing delete error:", error);
      }
    }

    updateTag(PARTNERS_CACHE_TAG);

    return {
      success: true,
      message: "ITEMS_DELETED",
      status: 200,
      deletedCount: result.count,
    };
  } catch (error) {
    console.error("deleteManyPartners error:", error);

    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
      deletedCount: 0,
    };
  }
};

/* -------------------- Caching Helpers -------------------- */

// Cached partners used with getAllPartners
const getCachedPartners = () =>
  unstable_cache(
    async () => {
      return prisma.partners.findMany({});
    },
    ["all-partners"],
    {
      tags: [PARTNERS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

// Cached partner by ID used with getPartnerById
const getCachedPartnerById = (id: string) =>
  unstable_cache(
    async () => {
      return prisma.partners.findUnique({
        where: { id },
      });
    },
    [`partner-${id}`],
    {
      tags: [PARTNERS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

// Cached partners by locale used with getAllPartnersByLocale
const getCachedPartnersByLocale = (locale: "ar" | "en") =>
  unstable_cache(
    async () => {
      const partners = await prisma.partners.findMany({});

      return partners.map((partner) => ({
        id: partner.id,
        name: locale === "ar" ? partner.partnerNameAr : partner.partnerNameEn,
        description:
          locale === "ar"
            ? partner.partnerDescriptionAr
            : partner.partnerDescriptionEn,
        logo: partner.logo,
        referenceLink: partner.referenceLink,
      }));
    },
    [`partners-locale-${locale}`],
    {
      tags: [PARTNERS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

/* -------------------- Caching Helps --------------------  */

export const getAllPartners = async () => {
  try {
    const partners = await getCachedPartners();

    return {
      success: true,
      message: "PARTNERS_RETRIEVED_SUCCESSFULLY",
      status: 200,
      partners,
    };
  } catch (error) {
    console.error("getAllPartners error:", error);

    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getPartnerById = async (id: string) => {
  try {
    if (!id)
      return {
        success: false,
        message: "PARTNER_ID_REQUIRED",
        status: 400,
      };

    const partner = await getCachedPartnerById(id);

    if (!partner)
      return {
        success: false,
        message: "PARTNER_NOT_FOUND",
        status: 404,
      };

    return {
      success: true,
      message: "PARTNER_RETRIEVED_SUCCESSFULLY",
      status: 200,
      partner,
    };
  } catch (error) {
    console.error("getPartnerById error:", error);

    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getAllPartnersByLocale = async (locale: "ar" | "en") => {
  try {
    const partners = await getCachedPartnersByLocale(locale);

    return {
      success: true,
      message: "PARTNERS_RETRIEVED_SUCCESSFULLY",
      status: 200,
      partners,
    };
  } catch (error) {
    console.error("getAllPartnersByLocale error:", error);

    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};
