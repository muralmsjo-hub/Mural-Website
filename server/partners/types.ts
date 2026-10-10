import { Prisma } from "@/generated/prisma/client";

export type PartnersCreateInput = Prisma.partnersCreateInput;
export type PartnersUpdateInput = Prisma.partnersUpdateInput;

export type TranslatedPartner = {
  id: string;
  name: string;
  description: string;
  logo: string;
  referenceLink: string | null;
};

export type PartnerType = {
  id: string;
  partnerNameEn: string;
  partnerNameAr: string;
  partnerDescriptionEn: string;
  partnerDescriptionAr: string;
  logo: string;
  referenceLink: string | null;
};

export type AllPartners = PartnerType;
export type PartnerById = PartnerType;

export type PartnerItem = {
  id: string;
  name: string;
  description?: string | null;
  logo: string;
  referenceLink?: string | null;
};

