import { unstable_cache } from "next/cache";
import {
  PRODUCTS_CACHE_TAG,
  CAREERS_CACHE_TAG,
  PURCHASE_REQUEST_CACHE_TAG,
  APPLICATIONS_CACHE_TAG,
} from "@/lib/constants/allCacheTags";
import { prisma } from "@/lib/prisma";

const getCachedProductsNumebr = () =>
  unstable_cache(
    async () => {
      return prisma.products.count({});
    },
    ["number-of-products"],
    {
      tags: [PRODUCTS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

const getCachedCareersNumber = () =>
  unstable_cache(
    async () => {
      return prisma.careers.count({});
    },
    ["number-of-careers"],
    {
      tags: [CAREERS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

const getCachedApplicationsNumber = () =>
  unstable_cache(
    async () => {
      return prisma.applications.count({});
    },
    ["number-of-applications"],
    {
      tags: [APPLICATIONS_CACHE_TAG],
      revalidate: 3600,
    },
  )();

const getCachedRequestsNumber = () =>
  unstable_cache(
    async () => {
      return prisma.purchase_order_requests.count({});
    },
    ["number-of-requests"],
    {
      tags: [PURCHASE_REQUEST_CACHE_TAG],
      revalidate: 3600,
    },
  )();

export const dashboardNumbers = async () => {
  try {
    const [
      numberOfProducts,
      numberOfCareers,
      numberOfApplications,
      numberOfRequests,
    ] = await Promise.all([
      getCachedProductsNumebr(),
      getCachedCareersNumber(),
      getCachedApplicationsNumber(),
      getCachedRequestsNumber(),
    ]);

    return {
      data: {
        numberOfProducts,
        numberOfCareers,
        numberOfApplications,
        numberOfRequests,
      },
      message: "ALL_DASHBOARD_NUMBERS",
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};
