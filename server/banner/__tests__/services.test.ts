import { describe, beforeEach, it, expect, vi } from "vitest";
import { createBanner, getBannerById } from "../services";
import { prisma } from "@/lib/prisma";
import { unstable_cache, updateTag } from "next/cache";
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
        
    });
  });
});
