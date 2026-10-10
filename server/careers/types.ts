import { Prisma } from "@/generated/prisma/client";

export type Locale = "ar" | "en";
export type CareersCreateInput = {
  id?: string | undefined;
  positionEn: string;
  positionAr: string;
  descriptionEn: string;
  descriptionAr: string;
  roleEn: string;
  roleAr: string;
  experienceEn: string;
  experienceAr: string;
  requirementsEn?: string[];
  requirementsAr?: string[];
  image: string;
};
export type CareersUpdateInput = Prisma.careersUpdateInput;
export type CareersGetPayload = Prisma.careersGetPayload<{}>;

// the balow types are the types of the return of all get function (delete the unused types and the unsed get function)

export type CareerItem = {
  id: string;
  position: string;
  description: string;
  image: string;
  requirements: string[];
  role: string;
  experience: string;
  slug: string;
};

export type CareerDetails = CareerItem;

export type AllCareersType = {
  numberOfApplications: number;
  id: string;
  createdAt: Date;
  image: string;
  positionEn: string;
  positionAr: string;
  descriptionEn: string;
  descriptionAr: string;
  requirementsEn: string[];
  requirementsAr: string[];
  experienceEn: string;
  experienceAr: string;
  roleEn: string;
  roleAr: string;
  slug: string;
};

export type AllCareersWithApplications = {
  applications: {
    id: string;
    email: string;
    phoneNumber: string;
    major: string | null;
    cv: string;
    isShown: boolean;
    appliedAt: Date;
    firstName: string;
    lastName: string | null;
  }[];
  career: {
    id: string;
    positionEn: string;
    positionAr: string;
    descriptionEn: string;
    descriptionAr: string;
    requirementsEn: string[];
    requirementsAr: string[];
    experienceEn: string;
    experienceAr: string;
    roleEn: string;
    roleAr: string;
    image: string;
    slug: string;
    createdAt: Date;
  };
}[];

export type CareerById = {
  id: string;
  positionEn: string;
  positionAr: string;
  descriptionEn: string;
  descriptionAr: string;
  requirementsEn: string[];
  requirementsAr: string[];
  experienceEn: string;
  experienceAr: string;
  roleEn: string;
  roleAr: string;
  image: string;
  slug: string;
  createdAt: Date;
};
