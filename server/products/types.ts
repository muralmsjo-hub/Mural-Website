type ProductVariantNestedCreateInput = {
  sku: string;
  variantImage?: string | null;
  price: number;
  discountPercentage?: number;
  stock?: number;
  isDefault?: boolean;
  attributeValueIds?: string[];
};

export type ProductWithVaraintsCreateInput = {
  productNameEn: string;
  productNameAr: string;
  productDescriptionEn: string;
  productDescriptionAr: string;
  productCardImage: string;
  productImages?: string[];
  isFeatured: boolean;
  categoryId: string;
  variants: ProductVariantNestedCreateInput[];
};

type ProductVariantNestedUpdateInput = {
  id: string;
  sku: string;
  variantImage?: string | null;
  price: number;
  discountPercentage?: number;
  stock?: number;
  isDefault?: boolean;
  attributeValueIds?: string[];
};

export type ProductWithVaraintsUpdateInput = {
  productNameEn: string;
  productNameAr: string;
  productDescriptionEn: string;
  productDescriptionAr: string;
  productCardImage: string;
  productImages?: string[];
  isFeatured: boolean;
  categoryId: string;
  variants: ProductVariantNestedUpdateInput[];
};

export type ProductFilters = {
  page?: number;
  search?: string;
  categories?: string[];
  sort?: SortType;
};

export type SortType =
  | "newest"
  | "oldest"
  | "price_asc"
  | "price_desc"
  | undefined;

export type AdminProductsFiltrationObject = {
  page?: number;
  take?: number;
  category?: string | null;
  categories?: string[] | null;
};

export type AllProducts = {
  id: string;
  slug: string;
  productNameEn: string;
  productNameAr: string;
  productDescriptionEn: string;
  productDescriptionAr: string;
  productCardImage: string;
  productImages: string[];
  manufacturerNameEN: string;
  manufacturerNameAr: string;
  manufacturerLogo: string;
  categoryId: string;
  createdAt: Date;
  isFeatured: boolean;
  categories: {
    categoryNameEn: string;
  };
};

export type ProductById = {
  id: string;
  productNameEn: string;
  productNameAr: string;
  productDescriptionEn: string;
  productDescriptionAr: string;
  productCardImage: string;
  productImages: string[];
  isFeatured: boolean;
  categoryId: string;
  slug: string;
  createdAt: Date;
  manufacturerNameEN?: string;
  manufacturerNameAr?: string;
  manufacturerLogo?: string;
};

export type FeaturedProduct = {
  id: string;
  productName: string;
  productDescription: string;
  productCardImage: string;
  slug: string;
  categoryName: string;
  manufacturerName: string;
  manufacturerLogo: string;
};

export type ProductItem = {
  id: string;
  productName: string;
  productDescription: string;
  productCardImage: string;
  slug: string;
  categoryName: string;
  manufacturerName?: string;
};

export type ProductDetails = {
  id: string;
  productName: string;
  productDescription: string;
  productCardImage: string;
  productImages: string[];
  slug: string;
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  manufacturerName?: string;
  manufacturerLogo?: string;
};
