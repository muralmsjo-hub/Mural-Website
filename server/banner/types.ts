import { Prisma } from "@/generated/prisma/client";

export type NewBanner = Prisma.bannersCreateInput;
export type UpdateBanner = Prisma.bannersUpdateInput;

export type TranslatedBanner = {
  id: string;
  name: string;
  image: string;
};

export type BannerType = {
  id: string;
  createdAt: Date | null;
  image: string;
  nameEn: string;
  nameAr: string;
};

export type AllBanners = BannerType;
export type BannerById = BannerType;
