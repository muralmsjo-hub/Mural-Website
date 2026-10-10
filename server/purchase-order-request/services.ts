import { prisma } from "@/lib/prisma";
import {
  newPurchaseOrderRequestSchema,
  NewPurchaseOrderRequestFormType,
} from "./validators";
import { unstable_cache, updateTag } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { PurchaseRequestFiltrationObj } from "./types";
import { PURCHASE_REQUEST_CACHE_TAG } from "@/lib/constants/allCacheTags";

export const newPurchaseOrderRequest = async (
  requestData: NewPurchaseOrderRequestFormType,
) => {
  try {
    const validation = newPurchaseOrderRequestSchema.safeParse(requestData);

    if (!validation.success)
      return {
        success: false,
        message: "VALIDATION_ERROR",
        status: 400,
      };

    const { productsAndQuantity, ...requesterData } = validation.data;

    const productIds = productsAndQuantity.map((p) => p.productId);

    const uniqueProductsIds = new Set(productIds);
    if (uniqueProductsIds.size !== productIds.length)
      return {
        success: false,
        message: "REDUNDANT_PRODUCTS_IDS",
        status: 400,
      };

    const existingProductsCount = await prisma.products.count({
      where: {
        id: { in: productIds },
      },
    });
    if (productIds.length !== existingProductsCount)
      return {
        success: false,
        message: "SOME_PRODUCTS_ARE_NOT_FOUND",
        status: 404,
      };
    return await prisma.$transaction(async (tx) => {
      const purchaseOrderRequestData = await tx.purchase_order_requests.create({
        data: requesterData,
      });

      const purchaseOrderRequestItems = productsAndQuantity.map((p) => ({
        productId: p.productId,
        quantity: p.quantity,
        purchaseRequestId: purchaseOrderRequestData.id,
      }));

      await tx.purchase_order_request_items.createMany({
        data: purchaseOrderRequestItems,
      });
      updateTag(PURCHASE_REQUEST_CACHE_TAG);
      return {
        success: true,
        message: "PURCHASE_ORDER_REQUEST_SUBMITTED_SUCCESSFULLY",
        status: 201,
      };
    });
  } catch (error) {
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const deletePurchaseRequest = async (requestId: string) => {
  try {
    if (!requestId)
      return {
        success: false,
        message: "REQUEST_ID_REQUIRED",
        status: 400,
      };

    await prisma.purchase_order_requests.delete({
      where: {
        id: requestId,
      },
    });

    updateTag(PURCHASE_REQUEST_CACHE_TAG);
    return {
      success: true,
      message: "REQUEST_DELETED_SUCCESSFULLY",
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

export const deleteManyPurchaseRequests = async (ids: string[]) => {
  try {
    if (!ids.length) {
      return {
        success: false,
        message: "REQUEST_IDS_REQUIRED",
        status: 400,
        deletedCount: 0,
      };
    }

    const result = await prisma.purchase_order_requests.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    updateTag(PURCHASE_REQUEST_CACHE_TAG);
    return {
      success: true,
      message: "ITEMS_DELETED",
      status: 200,
      deletedCount: result.count,
    };
  } catch (error) {
    console.error("deleteManyPurchaseRequests error:", error);
    return {
      success: false,
      message: "INTERNAL_SERVER_ERROR",
      status: 500,
      deletedCount: 0,
    };
  }
};

/* -------------------- Caching Helps --------------------  */

const cachedAllRequests = (filtrationObj: PurchaseRequestFiltrationObj) => {
  const { take, page, companyName, productId } = filtrationObj;
  return unstable_cache(
    async () => {
      const skip = take * (page - 1);
      const where: Prisma.purchase_order_requestsWhereInput = {};
      if (companyName)
        where.companyName = { contains: companyName, mode: "insensitive" };
      if (productId) {
        where.items = {
          some: { productId },
        };
      }

      const requestsCount = await prisma.purchase_order_requests.count({
        where,
      });
      const result = await prisma.purchase_order_requests.findMany({
        where,
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          companyName: true,
          personName: true,
          email: true,
          deliveryCity: true,
          phoneNumber: true,
          createdAt: true,
          items: {
            select: {
              productId: true,
              quantity: true,
            },
          },
        },
      });

      return {
        requestData: result.map((request) => ({
          id: request.id,
          companyName: request.companyName,
          personName: request.personName,
          email: request.email,
          deliveryCity: request.deliveryCity,
          phoneNumber: request.phoneNumber,
          createdAt: request.createdAt,
          numberOfProducts: request.items.length,
          totalQuantity: request.items.reduce(
            (total, item) => total + item.quantity,
            0,
          ),
        })),
        pagination: {
          currentPage: page,
          itemsPerPage: take,
          totalItems: requestsCount,
          totalPages: Math.ceil(requestsCount / take),
        },
      };
    },
    [`filtered-purchase-requests-${page}-${take}-${companyName}-${productId}`],
    { tags: [PURCHASE_REQUEST_CACHE_TAG], revalidate: 3600 },
  )();
};

const cachedRequestById = (requestId: string) =>
  unstable_cache(
    async () => {
      const result = await prisma.purchase_order_requests.findUnique({
        where: {
          id: requestId,
        },
        include: {
          items: {
            select: {
              product: {
                select: {
                  productNameEn: true,
                  productCardImage: true,
                  productDescriptionEn: true,
                },
              },
              quantity: true,
            },
          },
        },
      });

      if (!result) return null;

      const { items, ...requesterData } = result;

      return {
        ...requesterData,
        productsCount: items.length,
        totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
        productDetails: items.map((item) => ({
          productName: item.product.productNameEn,
          productDescription: item.product.productDescriptionEn,
          productImage: item.product.productCardImage,
          quantity: item.quantity,
        })),
      };
    },
    [`request-by-id-${requestId}`],
    {
      tags: [PURCHASE_REQUEST_CACHE_TAG, `request-by-id-${requestId}`],
      revalidate: 3600,
    },
  )();

/* -------------------- Caching Helps --------------------  */

export const getAllPurchaseRequest = async (
  filtrationObj: PurchaseRequestFiltrationObj,
) => {
  try {
    const data = await cachedAllRequests(filtrationObj);
    return {
      data,
      success: true,
      messgae: "ALL_PURCHASE_REQUEST",
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      messgae: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getRequestById = async (requestId: string) => {
  try {
    const data = await cachedRequestById(requestId);
    return {
      data,
      success: true,
      messgae: "REQUEST_BY_ID",
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      messgae: "INTERNAL_SERVER_ERROR",
      status: 500,
    };
  }
};

export const getPurchaseOrderRequestsCount = async () => {
  try {
    const count = await prisma.purchase_order_requests.count();
    return {
      success: true,
      data: count,
      status: 200,
    };
  } catch (error) {
    return {
      success: false,
      data: 0,
      status: 500,
    };
  }
};
