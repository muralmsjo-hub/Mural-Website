import { prisma } from "@/lib/prisma";
import { CareersGetPayload } from "./types";
import { Locale } from "@/types/index";
import { unstable_cache, updateTag } from "next/cache";
import { UTApi } from "uploadthing/server";
import {
  careerSchema,
  updateCareerSchema,
  CreateCareerFormType,
  UpdateCareerFormType,
} from "./validators";
import { generateSlug } from "@/lib/helpers";
import {
  APPLICATIONS_CACHE_TAG,
  CAREERS_CACHE_TAG,
} from "@/lib/constants/allCacheTags";

const utapi = new UTApi();

export const addNewCareer = async (newCareer: CreateCareerFormType) => {
  try {
    const validation = careerSchema.safeParse(newCareer);

    if (validation.success) {
      const existingCareer = await prisma.careers.findFirst({
        where: {
          positionEn: validation.data.positionEn,
        },
      });

      if (existingCareer)
        return {
          success: false,
          message: "POSITION_ALREADY_EXISTS",
          status: 409,
        };

      const slug = generateSlug(validation.data.positionEn);

      await prisma.careers.create({
        data: { ...validation.data, slug },
      });

      updateTag(CAREERS_CACHE_TAG);

      return {
        success: true,
        message: "CAREER_ADDED_SUCCESSFULLY",
        status: 201,
      };
    }

    return {
      success: false,
      message: "VALIDATION_ERROR",
      status: 400,
    };
  } catch (error) {
    console.error("addNewCareer error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const updateCareer = async (
  id: string,
  updatedCareerData: UpdateCareerFormType,
) => {
  try {
    if (!id)
      return {
        success: false,
        message: "CAREER_ID_REQUIRED",
        status: 400,
      };

    const validation = updateCareerSchema.safeParse(updatedCareerData);

    if (validation.success) {
      const existingCareer = await prisma.careers.findUnique({
        where: { id },
      });

      if (!existingCareer)
        return {
          success: false,
          message: "CAREER_NOT_FOUND",
          status: 404,
        };

      let slug = existingCareer.slug;

      if (validation.data.positionEn) {
        const careerWithSameName = await prisma.careers.findFirst({
          where: {
            positionEn: validation.data.positionEn,
            NOT: {
              id,
            },
          },
        });

        if (careerWithSameName)
          return {
            success: false,
            message: "CAREER_ALREADY_EXISTS",
            status: 409,
          };

        slug = generateSlug(validation.data.positionEn);
      }

      await prisma.careers.update({
        where: { id },
        data: {
          ...validation.data,
          slug,
        },
      });

      updateTag(CAREERS_CACHE_TAG);

      return {
        success: true,
        message: "CAREER_UPDATED_SUCCESSFULLY",
        status: 200,
      };
    }

    return {
      success: false,
      message: "VALIDATION_ERROR",
      status: 400,
    };
  } catch (error) {
    console.error("updateCareer error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const deleteCareer = async (id: string) => {
  try {
    if (!id)
      return {
        success: false,
        message: "CAREER_ID_REQUIRED",
        status: 400,
      };

    const existingCareer = await prisma.careers.findUnique({
      where: { id },
      select: {
        id: true,
        image: true,
      },
    });

    if (!existingCareer)
      return {
        success: false,
        message: "CAREER_NOT_FOUND",
        status: 404,
      };

    await prisma.careers.delete({
      where: { id },
    });

    const imageKey = existingCareer.image?.split("/f/")[1];

    if (imageKey) {
      await utapi.deleteFiles(imageKey);
    }

    updateTag(CAREERS_CACHE_TAG);
    updateTag(APPLICATIONS_CACHE_TAG);

    return {
      success: true,
      message: "CAREER_DELETED_SUCCESSFULLY",
      status: 200,
    };
  } catch (error) {
    console.error("deleteCareer error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const deleteManyCareers = async (ids: string[]) => {
  try {
    if (!ids.length) {
      return {
        success: false,
        message: "CAREERS_IDS_REQUIRED",
        status: 400,
        deletedCount: 0,
      };
    }

    const existingCareers = await prisma.careers.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (existingCareers.length === 0) {
      return {
        success: false,
        message: "CAREERS_NOT_FOUND",
        status: 404,
        deletedCount: 0,
      };
    }

    const result = await prisma.careers.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (result.count === 0) {
      return {
        success: false,
        message: "CAREERS_DELETE_FAILED",
        status: 400,
        deletedCount: result.count,
      };
    }

    const fileKeys = existingCareers
      .map((career) => career.image.split("/f/")[1])
      .filter(Boolean);

    if (fileKeys.length) {
      await utapi.deleteFiles(fileKeys);
    }

    updateTag(CAREERS_CACHE_TAG);
    updateTag(APPLICATIONS_CACHE_TAG);
    return {
      success: true,
      message: "ITEMS_DELETED",
      status: 200,
      deletedCount: result.count,
    };
  } catch (error) {
    console.error("deleteManyCareers error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

/* -------------------- Caching Helps --------------------  */

// cached Careers used with getAllCareers and getAllCareersByLocale
const getCachedCareers = () =>
  unstable_cache(
    async () => {
      const result = await prisma.careers.findMany({
        include: {
          applications: {
            select: {
              id: true,
            },
          },
        },
      });

      return result.map((career) => ({
        numberOfApplications: career.applications.length,
        id: career.id,
        createdAt: career.createdAt,
        image: career.image,
        positionEn: career.positionEn,
        positionAr: career.positionAr,
        descriptionEn: career.descriptionEn,
        descriptionAr: career.descriptionAr,
        requirementsEn: career.requirementsEn,
        requirementsAr: career.requirementsAr,
        experienceEn: career.experienceEn,
        experienceAr: career.experienceAr,
        roleEn: career.roleEn,
        roleAr: career.roleAr,
        slug: career.slug,
      }));
    },
    ["all-careers"],
    {
      tags: [CAREERS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

// cached Careers With Applications used with getAllCareersWithApplications
const getCachedCareersWithApplications = () =>
  unstable_cache(
    async () => {
      const result = await prisma.careers.findMany({
        include: {
          applications: true,
        },
      });

      return result.map((career) => ({
        applications: career.applications.map((application) => ({
          id: application.id,
          email: application.email,
          phoneNumber: application.phoneNumber,
          major: application.major,
          cv: application.cv,
          isShown: application.isShown,
          appliedAt: application.appliedAt,
          firstName: application.firstName,
          lastName: application.lastName,
        })),
        career: {
          id: career.id,
          positionEn: career.positionEn,
          positionAr: career.positionAr,
          descriptionEn: career.descriptionEn,
          descriptionAr: career.descriptionAr,
          requirementsEn: career.requirementsEn,
          requirementsAr: career.requirementsAr,
          experienceEn: career.experienceEn,
          experienceAr: career.experienceAr,
          roleEn: career.roleEn,
          roleAr: career.roleAr,
          image: career.image,
          slug: career.slug,
          createdAt: career.createdAt,
        },
      }));
    },
    ["careers-with-applications"],
    {
      tags: [CAREERS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

// cached Career By ID used with getCareerById
const getCachedCareerById = (id: string) =>
  unstable_cache(
    async () => {
      return prisma.careers.findUnique({
        where: { id },
      });
    },
    [`career-${id}`],
    {
      tags: [CAREERS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

// cached Career By Slug used with getCareerBySlug
const getCachedCareerBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      return prisma.careers.findUnique({
        where: { slug },
      });
    },
    [`career-slug-${slug}`],
    {
      tags: [CAREERS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

// cached Career With Applications By ID used with getCareerWithApplicationsById
const getCachedCareerWithApplicationsById = (id: string) =>
  unstable_cache(
    async () => {
      return prisma.careers.findUnique({
        where: { id },
        include: {
          applications: true,
        },
      });
    },
    [`career-with-applications-${id}`],
    {
      tags: [CAREERS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

// cached Career By Locale used with getCareersByLocale
const getCachedCareersByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      const careers = await prisma.careers.findMany({});

      return careers.map((career: CareersGetPayload) => ({
        id: career.id,
        position: locale === "en" ? career.positionEn : career.positionAr,
        description:
          locale === "en" ? career.descriptionEn : career.descriptionAr,
        image: career.image,
        requirements:
          locale === "en" ? career.requirementsEn : career.requirementsAr,
        role: locale === "en" ? career.roleEn : career.roleAr,
        experience: locale === "en" ? career.experienceEn : career.experienceAr,
        slug: career.slug,
      }));
    },
    [`careers-locale-${locale}`],
    {
      tags: [CAREERS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

// cached Career By ID and Locale used with getCareerByIdAndLocale
const getCachedCareerByIdAndLocale = (id: string, locale: Locale) =>
  unstable_cache(
    async () => {
      const career = await prisma.careers.findUnique({
        where: { id },
      });

      if (!career) return null;

      return {
        id: career.id,
        position: locale === "en" ? career.positionEn : career.positionAr,
        description:
          locale === "en" ? career.descriptionEn : career.descriptionAr,
        image: career.image,
        requirements:
          locale === "en" ? career.requirementsEn : career.requirementsAr,
        role: locale === "en" ? career.roleEn : career.roleAr,
        experience: locale === "en" ? career.experienceEn : career.experienceAr,
        slug: career.slug,
      };
    },
    [`career-${id}-locale-${locale}`],
    {
      tags: [CAREERS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

// cached Career By Slug and Locale used with getCareerBySlugAndLocale
const getCachedCareerBySlugAndLocale = (slug: string, locale: Locale) =>
  unstable_cache(
    async () => {
      const career = await prisma.careers.findUnique({
        where: { slug },
      });

      if (!career) return null;

      return {
        id: career.id,
        position: locale === "en" ? career.positionEn : career.positionAr,
        description:
          locale === "en" ? career.descriptionEn : career.descriptionAr,
        image: career.image,
        requirements:
          locale === "en" ? career.requirementsEn : career.requirementsAr,
        role: locale === "en" ? career.roleEn : career.roleAr,
        experience: locale === "en" ? career.experienceEn : career.experienceAr,
        slug: career.slug,
      };
    },
    [`career-slug-${slug}-locale-${locale}`],
    {
      tags: [CAREERS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

/* -------------------- Caching Helps --------------------  */

export const getAllCareers = async () => {
  try {
    const careers = await getCachedCareers();

    return {
      success: true,
      message: "CAREERS_RETRIEVED_SUCCESSFULLY",
      status: 200,
      careers,
    };
  } catch (error) {
    console.error("getAllCareers error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getAllCareersWithApplications = async () => {
  try {
    const careers = await getCachedCareersWithApplications();

    return {
      success: true,
      message: "CAREERS_WITH_APPLICATIONS_RETRIEVED_SUCCESSFULLY",
      status: 200,
      careers,
    };
  } catch (error) {
    console.error("getAllCareersWithApplications error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getCareerById = async (id: string) => {
  try {
    if (!id)
      return {
        success: false,
        message: "CAREER_ID_REQUIRED",
        status: 400,
      };

    const career = await getCachedCareerById(id);

    if (!career)
      return {
        success: false,
        message: "CAREER_NOT_FOUND",
        status: 404,
      };

    return {
      success: true,
      message: "CAREER_RETRIEVED_SUCCESSFULLY",
      status: 200,
      career,
    };
  } catch (error) {
    console.error("getCareerById error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getCareerBySlug = async (slug: string) => {
  try {
    if (!slug)
      return {
        success: false,
        message: "CAREER_SLUG_REQUIRED",
        status: 400,
      };

    const career = await getCachedCareerBySlug(slug);

    if (!career)
      return {
        success: false,
        message: "CAREER_NOT_FOUND",
        status: 404,
      };

    return {
      success: true,
      message: "CAREER_RETRIEVED_SUCCESSFULLY",
      status: 200,
      career,
    };
  } catch (error) {
    console.error("getCareerBySlug error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getCareerWithApplicationsById = async (id: string) => {
  try {
    if (!id)
      return {
        success: false,
        message: "CAREER_ID_REQUIRED",
        status: 400,
      };

    const career = await getCachedCareerWithApplicationsById(id);

    if (!career)
      return {
        success: false,
        message: "CAREER_NOT_FOUND",
        status: 404,
      };

    return {
      success: true,
      message: "CAREER_RETRIEVED_SUCCESSFULLY",
      status: 200,
      career,
    };
  } catch (error) {
    console.error("getCareerWithApplicationsById error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getCareerNameAndIdById = async (id: string) => {
  try {
    if (!id)
      return {
        success: false,
        message: "CAREER_ID_REQUIRED",
        status: 400,
      };

    const career = await prisma.careers.findUnique({
      where: { id },
      select: {
        id: true,
        positionEn: true,
      },
    });

    if (!career)
      return {
        success: false,
        message: "CAREER_NOT_FOUND",
        status: 404,
      };

    return {
      success: true,
      message: "CAREER_RETRIEVED_SUCCESSFULLY",
      status: 200,
      career,
    };
  } catch (error) {
    console.error("getCareerNameAndIdById error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getCareersByLocale = async (locale: Locale) => {
  try {
    const careers = await getCachedCareersByLocale(locale);

    return {
      success: true,
      message: "CAREERS_RETRIEVED_SUCCESSFULLY",
      status: 200,
      careers,
    };
  } catch (error) {
    console.error("getCareersByLocale error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getCareerByIdAndLocale = async (id: string, locale: Locale) => {
  try {
    if (!id)
      return {
        success: false,
        message: "CAREER_ID_REQUIRED",
        status: 400,
      };

    const career = await getCachedCareerByIdAndLocale(id, locale);

    if (!career)
      return {
        success: false,
        message: "CAREER_NOT_FOUND",
        status: 404,
      };

    return {
      success: true,
      message: "CAREER_RETRIEVED_SUCCESSFULLY",
      status: 200,
      career,
    };
  } catch (error) {
    console.error("getCareerByIdAndLocale error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getCareerBySlugAndLocale = async (
  slug: string,
  locale: Locale,
) => {
  try {
    if (!slug)
      return {
        success: false,
        message: "CAREER_SLUG_REQUIRED",
        status: 400,
      };

    const career = await getCachedCareerBySlugAndLocale(slug, locale);

    if (!career)
      return {
        success: false,
        message: "CAREER_NOT_FOUND",
        status: 404,
      };

    return {
      success: true,
      message: "CAREER_RETRIEVED_SUCCESSFULLY",
      status: 200,
      career,
    };
  } catch (error) {
    console.error("getCareerBySlugAndLocale error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};
