import { Prisma } from "@/generated/prisma/client";
export type CategoriesCreateInput = Prisma.categoriesCreateInput;
export type CategoriesUpdateInput = Prisma.categoriesUpdateInput;

export type AllCategories = {
  id: string;
  createdAt: Date;
  image: string;
  categoryNameEn: string;
  categoryNameAr: string;
  categoryDescriptionEn: string;
  categoryDescriptionAr: string;
  isFeatured: boolean;
  slug: string;
};

export type CategoryById = {
  id: string;
  categoryNameEn: string;
  slug: string;
  categoryNameAr: string;
  categoryDescriptionEn: string;
  categoryDescriptionAr: string;
  image: string;
  createdAt: Date;
  isFeatured: boolean;
};

export type CategoryFilterItem = {
  id: string;
  name: string;
};

export type CategoryItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  isFeatured: boolean;
  slug: string;
  createdAt?: Date;
};

