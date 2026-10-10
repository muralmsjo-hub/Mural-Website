export type ApplicationCreateInput = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  major: string;
  cv: string;
  careerSlug: string;
};

// the balow types are the types of the return of all get function (delete the unused types and the unsed get function)
export type AllApplicationsType = {
  email: string;
  phoneNumber: string;
  id: string;
  major: string | null;
  cv: string;
  careerId: string;
  isShown: boolean;
  appliedAt: Date;
  firstName: string;
  lastName: string | null;
};

export type ApplicationsByCareerType = {
  applicationsData: {
    possitionName: string;
    careerId: string;
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
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};

export type ApplicationById = {
  id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string | null;
  major: string | null;
  cv: string;
  appliedAt: Date;
  isShown: boolean;
  careerId: string;
};

export type FilteredApplication = {
  applications: {
    id: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string | null;
    major: string | null;
    cv: string;
    appliedAt: Date;
    isShown: boolean;
    careerId: string;
  }[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export type ApplicationByIdWithCareer = {
  possitionName: string;
  possitionDescription: string;
  possitionImage: string;
  email: string;
  phoneNumber: string;
  major: string | null;
  cv: string;
  isShown: boolean;
  appliedAt: Date;
  firstName: string;
  lastName: string | null;
};
