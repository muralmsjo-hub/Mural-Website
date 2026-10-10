import { prisma } from "@/lib/prisma";
import { updateTag, unstable_cache } from "next/cache";
import { UTApi } from "uploadthing/server";
import { applicationSchemaEn, ApplicationFormValues } from "./validators";
import {
  APPLICATIONS_CACHE_TAG,
  CAREERS_CACHE_TAG,
} from "@/lib/constants/allCacheTags";

const utapi = new UTApi();

export const addNewApplication = async (
  newApplication: ApplicationFormValues,
) => {
  try {
    const validation = applicationSchemaEn.safeParse(newApplication);

    if (validation.success) {
      let career = await prisma.careers.findUnique({
        where: { id: newApplication.careerId },
        select: { id: true },
      });

      if (!career)
        return {
          success: false,
          message: "CAREER_NOT_FOUND",
          status: 404,
        };

      const { phoneNumber, ...applicationData } = validation.data;

      await prisma.applications.create({
        data: {
          phoneNumber: String(phoneNumber),
          ...applicationData,
        },
      });

      updateTag(APPLICATIONS_CACHE_TAG);
      updateTag(CAREERS_CACHE_TAG);

      return {
        success: true,
        message: "APPLICATION_SUBMITTED_SUCCESSFULLY",
        status: 201,
      };
    }

    return {
      success: false,
      message: "VALIDATION_ERROR",
      status: 400,
    };
  } catch (error) {
    console.error("addNewApplication error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const deleteApplication = async (id: string) => {
  try {
    if (!id)
      return {
        success: false,
        message: "APPLICATION_ID_REQUIRED",
        status: 400,
      };

    const existingApplication = await prisma.applications.findUnique({
      where: { id },
      select: {
        id: true,
        cv: true,
      },
    });

    if (!existingApplication)
      return {
        success: false,
        message: "APPLICATION_NOT_FOUND",
        status: 404,
      };

    await prisma.applications.delete({
      where: { id },
    });

    const fileKey = existingApplication.cv.split("/f/")[1];

    if (fileKey) {
      await utapi.deleteFiles(fileKey);
    }

    updateTag(APPLICATIONS_CACHE_TAG);
    updateTag(CAREERS_CACHE_TAG);

    return {
      success: true,
      message: "APPLICATION_DELETED_SUCCESSFULLY",
      status: 200,
    };
  } catch (error) {
    console.error("deleteApplication error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const deleteAllExpiredApplications = async () => {
  try {
    const date = new Date();
    date.setDate(date.getDate() - 45);

    const expiredApplications = await prisma.applications.findMany({
      where: {
        appliedAt: {
          lt: date,
        },
      },
      select: {
        id: true,
        cv: true,
      },
    });

    if (expiredApplications.length === 0)
      return {
        success: false,
        message: "No expired applications found",
        status: 404,
        deletedCount: 0,
      };

    const expiredApplicationsIds = expiredApplications.map(
      (application) => application.id,
    );

    const result = await prisma.applications.deleteMany({
      where: {
        id: {
          in: expiredApplicationsIds,
        },
      },
    });

    const cvKeys = expiredApplications
      .map((application) => application.cv?.split("/f/")[1])
      .filter(Boolean);

    if (cvKeys.length > 0) {
      await utapi.deleteFiles(cvKeys as string[]);
    }

    updateTag(APPLICATIONS_CACHE_TAG);
    updateTag(CAREERS_CACHE_TAG);

    return {
      success: true,
      message: "Expired applications deleted successfully",
      status: 200,
      deletedCount: result.count,
    };
  } catch (error) {
    console.error("deleteAllExpiredApplications error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const deleteManyApplications = async (ids: string[]) => {
  try {
    if (!ids.length) {
      return {
        success: false,
        message: "APPLICATIONS_IDS_REQUIRED",
        status: 400,
        deletedCount: 0,
      };
    }

    const existingApplications = await prisma.applications.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (existingApplications.length === 0) {
      return {
        success: false,
        message: "APPLICATIONS_NOT_FOUND",
        status: 404,
        deletedCount: 0,
      };
    }

    const result = await prisma.applications.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (result.count === 0) {
      return {
        success: false,
        message: "APPLICATIONS_DELETE_FAILED",
        status: 400,
        deletedCount: result.count,
      };
    }

    const fileKeys = existingApplications
      .map((application) => application.cv.split("/f/")[1])
      .filter(Boolean);

    if (fileKeys.length) {
      await utapi.deleteFiles(fileKeys);
    }

    updateTag(APPLICATIONS_CACHE_TAG);

    return {
      success: true,
      status: 200,
      deletedCount: result.count,
    };
  } catch (error) {
    console.error("deleteManyApplications error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const markApplicationAsShown = async (id: string) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "APPLICATION_ID_REQUIRED",
        status: 400,
      };
    }

    const existingApplication = await prisma.applications.findUnique({
      where: { id },
    });

    if (!existingApplication) {
      return {
        success: false,
        message: "APPLICATION_NOT_FOUND",
        status: 404,
      };
    }

    await prisma.applications.update({
      where: { id },
      data: {
        isShown: !existingApplication.isShown,
      },
    });

    updateTag(APPLICATIONS_CACHE_TAG);
    updateTag(CAREERS_CACHE_TAG);

    return {
      success: true,
      message: existingApplication.isShown
        ? "APPLICATION_MARKED_AS_UNSHOWN_SUCCESSFULLY"
        : "APPLICATION_MARKED_AS_SHOWN_SUCCESSFULLY",
      status: 200,
    };
  } catch (error) {
    console.error("markApplicationAsShown error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

/* -------------------- Caching Helps --------------------  */

// cached Applications used with getAllApplications
const getCachedApplications = () =>
  unstable_cache(
    async () => {
      return prisma.applications.findMany({});
    },
    ["all-applications"],
    {
      tags: [APPLICATIONS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

// cached Applications by career ID used with getApplicationsByCareerId
const getCachedApplicationsByCareerId = (
  careerId: string,
  page: number,
  take: number,
) => {
  const skip = take * (page - 1);

  return unstable_cache(
    async () => {
      const applicationsCount = await prisma.applications.count({
        where: {
          careerId,
        },
      });
      const applications = await prisma.applications.findMany({
        skip,
        take,
        where: {
          careerId,
        },
        include: {
          careers: {
            select: {
              positionEn: true,
            },
          },
        },
      });

      const applicationsData = applications.map((application) => ({
        possitionName: application.careers.positionEn,
        careerId: application.careerId,
        id: application.id,
        email: application.email,
        phoneNumber: application.phoneNumber,
        major: application.major,
        cv: application.cv,
        isShown: application.isShown,
        appliedAt: application.appliedAt,
        firstName: application.firstName,
        lastName: application.lastName,
      }));
      return {
        applicationsData,
        pagination: {
          currentPage: page ?? 1,
          totalPages: Math.ceil(applicationsCount / take),
          totalItems: applicationsCount,
          itemsPerPage: take,
        },
      };
    },
    [`applications-career-${careerId}-${page}-${take}`],
    {
      tags: [APPLICATIONS_CACHE_TAG],
      revalidate: 3600,
    },
  )();
};

// cached Applications by ID used with getApplicationsByApplicationId
const getCachedApplicationById = (applicationId: string) =>
  unstable_cache(
    async () => {
      return prisma.applications.findUnique({
        where: {
          id: applicationId,
        },
      });
    },
    [`application-${applicationId}`],
    {
      tags: [APPLICATIONS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

export const getCachedFilteredApplications = (
  careerId: string,
  page: number,
  limit: number = 10,
) => {
  const skip = limit * (page - 1);

  return unstable_cache(
    async () => {
      const [applications, totalApplications] = await prisma.$transaction([
        prisma.applications.findMany({
          where: {
            careerId,
          },
          skip,
          take: limit,
          orderBy: {
            appliedAt: "desc",
          },
        }),

        prisma.applications.count({
          where: {
            careerId,
          },
        }),
      ]);

      return {
        applications,
        totalApplications,
      };
    },

    [
      `filtered-applications-by-career-id-${careerId}-and-page-${page}-limit-${limit}`,
    ],

    {
      tags: [APPLICATIONS_CACHE_TAG],
      revalidate: 3600,
    },
  )();
};

export const getCachedApplicationsWithCareerById = (applicationId: string) =>
  unstable_cache(
    async () => {
      const result = await prisma.applications.findUnique({
        where: { id: applicationId },
        include: {
          careers: {
            select: {
              positionEn: true,
              descriptionEn: true,
              image: true,
            },
          },
        },
      });

      if (!result) return null;

      return {
        id: result.id,
        possitionName: result.careers.positionEn,
        possitionDescription: result.careers.descriptionEn,
        possitionImage: result.careers.image,
        email: result.email,
        phoneNumber: result.phoneNumber,
        major: result.major,
        cv: result.cv,
        isShown: result.isShown,
        appliedAt: result.appliedAt,
        firstName: result.firstName,
        lastName: result.lastName,
      };
    },
    [`applications-with-career-by-id-${applicationId}`],
    {
      tags: [APPLICATIONS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

/* -------------------- Caching Helps --------------------  */

export const getAllApplications = async () => {
  try {
    const applications = await getCachedApplications();

    return {
      success: true,
      message: "APPLICATIONS_RETRIEVED_SUCCESSFULLY",
      status: 200,
      applications,
    };
  } catch (error) {
    console.error("getAllApplications error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getApplicationsByCareerId = async (
  careerId: string,
  page: number,
  take: number,
) => {
  try {
    if (!careerId)
      return {
        success: false,
        message: "CAREER_ID_REQUIRED",
        status: 400,
      };

    const data = await getCachedApplicationsByCareerId(careerId, page, take);

    return {
      success: true,
      message: "APPLICATIONS_RETRIEVED_SUCCESSFULLY",
      status: 200,
      data,
    };
  } catch (error) {
    console.error("getApplicationsByCareerId error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
      data: null,
    };
  }
};

export const getApplicationsByApplicationId = async (applicationId: string) => {
  try {
    if (!applicationId)
      return {
        success: false,
        message: "APPLICATION_ID_REQUIRED",
        status: 400,
      };

    const application = await getCachedApplicationById(applicationId);

    if (!application)
      return {
        success: false,
        message: "APPLICATION_NOT_FOUND",
        status: 404,
      };

    return {
      success: true,
      message: "APPLICATION_RETRIEVED_SUCCESSFULLY",
      status: 200,
      application,
    };
  } catch (error) {
    console.error("getApplicationsByApplicationId error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getFilteredApplications = async (
  careerId: string,
  page: number = 1,
  limit: number = 10,
) => {
  try {
    if (!careerId)
      return {
        success: false,
        message: "CAREER_ID_REQUIRED",
        status: 400,
        applications: [],
        pagination: null,
      };

    const result = await getCachedFilteredApplications(careerId, page, limit);

    return {
      success: true,
      message: "FILTERED_APPLICATIONS_RETRIEVED_SUCCESSFULLY",
      status: 200,

      applications: result.applications,

      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: result.totalApplications,
        totalPages: Math.ceil(result.totalApplications / limit),
      },
    };
  } catch (error) {

    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
      applications: [],
      pagination: null,
    };
  }
};

export const getApplicationsWithCareerById = async (id: string) => {
  try {
    if (!id)
      return {
        success: false,
        message: "APPLICATION_ID_REQUIRED",
        status: 400,
      };

    const data = await getCachedApplicationsWithCareerById(id);

    if (!data)
      return {
        success: false,
        message: "APPLICATION_NOT_FOUND",
        status: 404,
      };

    return {
      success: true,
      message: "APPLICATION_RETRIEVED_SUCCESSFULLY",
      status: 200,
      data,
    };
  } catch (error) {
    console.error("getApplicationsWithCareerById error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
      data: null,
    };
  }
};
