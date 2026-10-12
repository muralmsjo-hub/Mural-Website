import { describe, beforeEach, it, expect, vi } from "vitest";
import {
  createBanner,
  getBannerById,
  deleteBanner,
  deleteManyBanner,
  updateBanner,
  getAllBannersByLocale,
} from "../services";
import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";
import { BANEERS_CACHE_TAG } from "@/lib/constants/allCacheTags";

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
    banners: {
      create: vi.fn(),
      delete: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}));
describe("banner services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe("createBanner", () => {
    it("should add a new banner, revalidate cache and return 201", async () => {
      const validBannerData = {
        nameEn: "ViTest Create Banner En",
        nameAr: "ViTest Create Banner Ar",
        image: "https://utfs.io/f/banner-123.jpg",
      };

      vi.mocked(prisma.banners.create).mockResolvedValue({
        id: "banner-id-1",
        ...validBannerData,
        createdAt: new Date(),
      } as any);
      const result = await createBanner(validBannerData);

      expect(result).toEqual({
        success: true,
        message: "BANNER_CREATED_SUCCESSFULLY",
        status: 201,
      });

      expect(prisma.banners.create).toHaveBeenCalledWith({
        data: validBannerData,
      });

      expect(updateTag).toHaveBeenCalledWith(BANEERS_CACHE_TAG);
    });

    it("should return validation error", async () => {
      const unvalidBannerData = {
        nameEn: "",
        nameAr: "Invalid Data Ar",
        image: "https://utfs.io/f/banner-123.jpg",
      };

      vi.mocked(prisma.banners.create).mockResolvedValue({
        id: "banner-id-2",
        ...unvalidBannerData,
        createdAt: new Date(),
      });

      const result = await createBanner(unvalidBannerData);

      expect(result.status).toBe(400);

      expect(prisma.banners.create).not.toHaveBeenCalledWith(unvalidBannerData);

      expect(updateTag).not.toHaveBeenCalledWith(BANEERS_CACHE_TAG);
    });

    it("should return internal server error", async () => {
      const validBannerData = {
        nameEn: "ViTest Create Banner En",
        nameAr: "ViTest Create Banner Ar",
        image: "https://utfs.io/f/banner-123.jpg",
      };

      vi.mocked(prisma.banners.create).mockRejectedValue(
        new Error("Database Error"),
      );

      const result = await createBanner(validBannerData);

      expect(result).toEqual({
        success: false,
        message: "INTERNAL_SERVER_ERROR",
        status: 500,
      });

      expect(updateTag).not.toHaveBeenCalled();
    });
  });

  describe("getBannerById", () => {
    it("should return banner and 200 status", async () => {
      const fakeBanner = {
        id: "banner-id-1",
        nameEn: "ViTest Create Banner En",
        nameAr: "ViTest Create Banner Ar",
        image: "https://utfs.io/f/banner-123.jpg",
      };

      vi.mocked(prisma.banners.findUnique).mockResolvedValue(fakeBanner as any);

      const result = await getBannerById("banner-id-1");

      expect(result).toEqual({
        success: true,
        message: "BANNER_RETRIEVED_SUCCESSFULLY",
        status: 200,
        banner: fakeBanner,
      });
    });

    it("should return validation error", async () => {
      const result = await getBannerById("");

      expect(result.status).toEqual(400);
    });

    it("should return 404 status", async () => {
      vi.mocked(prisma.banners.findUnique).mockResolvedValue(null);

      const result = await getBannerById("non-existent-id");

      expect(result.status).toEqual(404);
    });

    it("should return internal server error", async () => {
      vi.mocked(prisma.banners.findUnique).mockRejectedValue(
        new Error("INternal Server Erroro"),
      );
      const result = await getBannerById("banner-id-1");
      expect(result.status).toEqual(500);
      expect(updateTag).not.toHaveBeenCalled();
    });
  });

  describe("deleteBanner", () => {
    it("should return 400 if id missing", async () => {
      const result = await deleteBanner("");
      expect(result.status).toEqual(400);
      expect(prisma.banners.delete).not.toHaveBeenCalled();
    });

    it("should return 404 if banner not found", async () => {
      vi.mocked(prisma.banners.findUnique).mockReturnValue(null);
      const result = await deleteBanner("babnner-id");
      expect(result.status).toEqual(404);
      expect(prisma.banners.findUnique).toHaveBeenCalledWith({
        where: { id: "babnner-id" },
      });
    });

    it("should delete banner and return 200 ", async () => {
      const banner = {
        id: "banner-1",
        nameEn: "Sale",
        nameAr: "تخفيضات",
        image: "https://utfs.io/f/image-key-123.jpg",
        createdAt: new Date(),
      };
      vi.mocked(prisma.banners.findUnique).mockResolvedValue(banner);
      vi.mocked(prisma.banners.delete).mockResolvedValue({} as any);

      const result = await deleteBanner(banner.id);

      expect(mockDeleteFiles).toHaveBeenCalledWith("image-key-123.jpg");
      expect(result.status).toEqual(200);
      expect(prisma.banners.findUnique).toHaveBeenCalledWith({
        where: {
          id: banner.id,
        },
      });
      expect(prisma.banners.delete).toHaveBeenCalledWith({
        where: { id: banner.id },
      });

      expect(updateTag).toHaveBeenCalledWith(BANEERS_CACHE_TAG);
    });
  });

  describe("deleteManyBanner", () => {
    it("should return 400 if no ids", async () => {
      const result = await deleteManyBanner([]);
      expect(result.status).toEqual(400);
      expect(prisma.banners.findMany).not.toHaveBeenCalled();
    });

    it("should return 404 if banners not found", async () => {
      vi.mocked(prisma.banners.findMany).mockResolvedValue([]);
      const result = await deleteManyBanner(["banner-id-1"]);
      expect(result.status).toEqual(404);
      expect(prisma.banners.findMany).toHaveBeenCalledWith({
        where: {
          id: {
            in: ["banner-id-1"],
          },
        },
      });
    });

    it("should  return 400 if no banners deleted", async () => {
      const banners = [
        {
          id: "banner-1",
          nameEn: "Sale",
          nameAr: "تخفيضات",
          image: "https://utfs.io/f/image-key-123.jpg",
          createdAt: new Date(),
        },
        {
          id: "banner-2",
          nameEn: "Sale",
          nameAr: "تخفيضات",
          image: "https://utfs.io/f/image-key-123.jpg",
          createdAt: new Date(),
        },
      ];

      const bannersIds = banners.map((b) => b.id);
      vi.mocked(prisma.banners.findMany).mockResolvedValue(banners);
      vi.mocked(prisma.banners.deleteMany).mockResolvedValue({
        count: 0,
      } as any);

      const result = await deleteManyBanner(bannersIds);

      expect(result.status).toEqual(400);
      expect(result.deletedCount).toEqual(0);
      expect(prisma.banners.findMany).toHaveBeenCalledWith({
        where: {
          id: {
            in: bannersIds,
          },
        },
      });
      expect(prisma.banners.deleteMany).toHaveBeenCalledWith({
        where: {
          id: {
            in: bannersIds,
          },
        },
      });
      expect(updateTag).not.toHaveBeenCalledWith(BANEERS_CACHE_TAG);
      expect(mockDeleteFiles).not.toHaveBeenCalled();
    });

    it("should return internal server error", async () => {
      const banners = [
        {
          id: "banner-1",
          nameEn: "Sale",
          nameAr: "تخفيضات",
          image: "https://utfs.io/f/image-key-123.jpg",
          createdAt: new Date(),
        },
        {
          id: "banner-2",
          nameEn: "Sale",
          nameAr: "تخفيضات",
          image: "https://utfs.io/f/image-key-123.jpg",
          createdAt: new Date(),
        },
      ];

      const bannersIds = banners.map((b) => b.id);
      vi.mocked(prisma.banners.findMany).mockResolvedValue(banners);
      vi.mocked(prisma.banners.deleteMany).mockRejectedValue(
        new Error("error"),
      );

      const result = await deleteManyBanner(bannersIds);

      expect(result.status).toEqual(500);
      expect(prisma.banners.findMany).toHaveBeenCalledWith({
        where: {
          id: {
            in: bannersIds,
          },
        },
      });
      expect(prisma.banners.deleteMany).toHaveBeenCalledWith({
        where: {
          id: {
            in: bannersIds,
          },
        },
      });
      expect(updateTag).not.toHaveBeenCalledWith(BANEERS_CACHE_TAG);
      expect(mockDeleteFiles).not.toHaveBeenCalled();
    });

    it("should delete banners, and return 200", async () => {
      const banners = [
        {
          id: "banner-1",
          nameEn: "Sale",
          nameAr: "تخفيضات",
          image: "https://utfs.io/f/image-key-123.jpg",
          createdAt: new Date(),
        },
        {
          id: "banner-2",
          nameEn: "Sale",
          nameAr: "تخفيضات",
          image: "https://utfs.io/f/image-key-123.jpg",
          createdAt: new Date(),
        },
      ];

      const bannersIds = banners.map((b) => b.id);
      vi.mocked(prisma.banners.findMany).mockResolvedValue(banners);
      vi.mocked(prisma.banners.deleteMany).mockResolvedValue({
        count: 2,
      } as any);

      const result = await deleteManyBanner(bannersIds);

      expect(result.status).toEqual(200);
      expect(result.deletedCount).toEqual(2);
      expect(prisma.banners.findMany).toHaveBeenCalledWith({
        where: {
          id: {
            in: bannersIds,
          },
        },
      });
      expect(prisma.banners.deleteMany).toHaveBeenCalledWith({
        where: {
          id: {
            in: bannersIds,
          },
        },
      });
      expect(updateTag).toHaveBeenCalledWith(BANEERS_CACHE_TAG);
      expect(mockDeleteFiles).toHaveBeenCalled();
    });
  });

  describe("updateBanner", () => {
    const bannerId = "banner-id";

    const bannerData = {
      nameEn: "banner 1 en",
      nameAr: "banner 1 ar",
      image: "image",
    };

    const fakeStoredBanner = {
      id: "banner-id",
      nameEn: "ViTest Create Banner En",
      nameAr: "ViTest Create Banner Ar",
      image: "https://utfs.io/f/banner-123.jpg",
      createdAt: new Date(),
    };

    it("should return 400 if not id", async () => {
      const result = await updateBanner(null, bannerData);

      expect(result.status).toEqual(400);
      expect(prisma.banners.update).not.toHaveBeenCalled();
    });

    it("should return 404 if banner not found", async () => {
      vi.mocked(prisma.banners.findUnique).mockResolvedValue(null);
      const result = await updateBanner(bannerId, bannerData);

      expect(result.status).toEqual(404);
      expect(prisma.banners.findUnique).toHaveBeenCalledWith({
        where: { id: bannerId },
      });
      expect(prisma.banners.update).not.toHaveBeenCalled();
      expect(updateTag).not.toHaveBeenCalled();
    });

    it("should return internal server error", async () => {
      vi.mocked(prisma.banners.findUnique).mockResolvedValue(fakeStoredBanner);
      vi.mocked(prisma.banners.update).mockRejectedValue(new Error("error"));

      const result = await updateBanner(bannerId, bannerData);

      expect(result.status).toEqual(500);
      expect(prisma.banners.findUnique).toHaveBeenCalledWith({
        where: { id: bannerId },
      });
      expect(prisma.banners.update).toHaveBeenCalled();
      expect(updateTag).not.toHaveBeenCalled();
    });

    it("should return 400 if validation fails", async () => {
      const invalidData = {
        nameEn: "Hi", // too short!
        nameAr: "مرحبا",
        image: "image",
      };
      const result = await updateBanner(bannerId, invalidData as any);
      expect(result.status).toEqual(400);
      expect(result.message).toEqual("VALIDATION_ERROR");
      expect(prisma.banners.findUnique).not.toHaveBeenCalled();
    });

    it("should update banner and return 200", async () => {
      vi.mocked(prisma.banners.findUnique).mockResolvedValue(fakeStoredBanner);
      vi.mocked(prisma.banners.update).mockResolvedValue({} as any);

      const result = await updateBanner(bannerId, bannerData);
      expect(result.status).toEqual(200);
      expect(prisma.banners.update).toHaveBeenCalledWith({
        data: bannerData,
        where: { id: bannerId },
      });
      expect(prisma.banners.findUnique).toHaveBeenCalledWith({
        where: { id: bannerId },
      });
      expect(updateTag).toHaveBeenCalledWith(BANEERS_CACHE_TAG);
      expect(mockDeleteFiles).toHaveBeenCalledWith("banner-123.jpg");
    });
  });

  describe("getAllBannersByLocale", () => {
    it("should return internal server error", async () => {
      vi.mocked(prisma.banners.findMany).mockRejectedValue(new Error("error"));

      const result = await getAllBannersByLocale("en");
      expect(prisma.banners.findMany).toHaveBeenCalled();
      expect(result.status).toEqual(500);
    });

    it("should return all banners by locale, and 200 status", async () => {
      const fakeBanners = [
        {
          id: "banner-id-1",
          nameEn: "ViTest Create Banner En",
          nameAr: "ViTest Create Banner Ar",
          image: "https://utfs.io/f/banner-123.jpg",
        },
        {
          id: "banner-id-2",
          nameEn: "ViTest Create Banner En",
          nameAr: "ViTest Create Banner Ar",
          image: "https://utfs.io/f/banner-123.jpg",
        },
      ];
      vi.mocked(prisma.banners.findMany).mockResolvedValue(fakeBanners as any);

      const result = await getAllBannersByLocale("en");
      expect(prisma.banners.findMany).toHaveBeenCalled();
      expect(result.status).toEqual(200);
      expect(result.banners[0].name).toEqual("ViTest Create Banner En");
    });
  });
});
