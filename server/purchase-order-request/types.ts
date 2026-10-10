export type PurchaseRequestFiltrationObj = {
  page: number;
  take: number;
  companyName?: string;
  productId?: string;
};

// the balow types are the types of the return of all get function (delete the unused types and the unsed get function)
export type RequestByIdType = {
  id: string;
  companyName: string;
  personName: string;
  email: string;
  jobTitle: string;
  phoneNumber: string;
  city: string;
  streetName: string;
  additionalProductRequirements: string | null;
  deliveryCity: string;
  deliveryStreetName: string;
  deliveryBuildingNumber: string;
  supportingDocuments: string | null;
  createdAt: Date;
  productsCount: number;
  totalQuantity: number;
  productDetails: {
    productName: string;
    productDescription: string;
    productImage: string;
    quantity: number;
  }[];
};

export type AllRequestsData = {
  id: string;
  companyName: string;
  personName: string;
  email: string;
  phoneNumber: string;
  deliveryCity: string;
  numberOfProducts: number;
  totalQuantity: number;
  createdAt: Date | string;
};

export type AllRequestsType = {
  requestData: AllRequestsData[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};
