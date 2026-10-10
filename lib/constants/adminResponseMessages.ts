export const RESPONSE_MESSAGES: Record<string, string> = {
  VALIDATION_ERROR: "Please check the information you entered.",
  INTERNAL_SERVER_ERROR: "Something went wrong. Please try again later.",

  // User messages
  USER_NOT_FOUND: "The user could not be found.",
  ROLE_UPDATED_SUCCESSFULLY: "User role updated successfully.",
  USER_DELETED_SUCCESSFULLY: "User deleted successfully.",
  USERS_RETRIEVED_SUCCESSFULLY: "Users retrieved successfully.",
  USER_RETRIEVED_SUCCESSFULLY: "User retrieved successfully.",

  // Banner messages
  BANNER_CREATED_SUCCESSFULLY: "Banner created successfully.",
  BANNER_UPDATED_SUCCESSFULLY: "Banner updated successfully.",
  BANNER_DELETED_SUCCESSFULLY: "Banner deleted successfully.",
  ITEMS_DELETED: "Selected banners deleted successfully.",
  BANNER_NOT_FOUND: "The banner could not be found.",
  BANNERS_NOT_FOUND: "No banners found to delete.",
  BANNER_ID_REQUIRED: "Banner ID is required.",
  BANNER_IDS_REQUIRED: "At least one banner must be selected.",
  BANNERS_DELETE_FAILED: "Failed to delete banners.",
  // Category messages
  CATEGORY_ADDED_SUCCESSFULLY: "Category created successfully.",
  CATEGORY_UPDATED_SUCCESSFULLY: "Category updated successfully.",
  CATEGORY_DELETED_SUCCESSFULLY: "Category deleted successfully.",
  CATEGORY_ALREADY_EXISTS: "A category with this name already exists.",
  CATEGORY_NOT_FOUND: "The category could not be found.",
  CATEGORIES_NOT_FOUND: "No categories found to delete.",
  CATEGORY_ID_REQUIRED: "Category ID is required.",
  CATEGORY_IDS_REQUIRED: "At least one category must be selected.",
  MAXIMUM_FEATURED_CATEGORY_REACHED:
    "Maximum number of featured categories reached.",
  CATEGORIES_RETRIEVED_SUCCESSFULLY: "Categories retrieved successfully.",
  CATEGORY_RETRIEVED_SUCCESSFULLY: "Category retrieved successfully.",
  FEATURED_CATEGORIES_RETRIEVED_SUCCESSFULLY:
    "Featured categories retrieved successfully.",

  // Product messages
  PRODUCT_ADDED_SUCCESSFULLY: "Product created successfully.",
  PRODUCT_UPDATED_SUCCESSFULLY: "Product updated successfully.",
  PRODUCT_DELETED_SUCCESSFULLY: "Product deleted successfully.",
  PRODUCT_NAME_ALREADY_EXISTS: "A product with this name already exists.",
  PRODUCT_NOT_FOUND: "The product could not be found.",
  PRODUCT_ID_REQUIRED: "Product ID is required.",
  PRODUCTS_IDS_REQUIRED: "At least one product must be selected.",
  MAXIMUM_FEATURED_PRODUCTS_REACHED:
    "Maximum number of featured products reached.",
  PRODUCTS_RETRIEVED_SUCCESSFULLY: "Products retrieved successfully.",
  PRODUCT_RETRIEVED_SUCCESSFULLY: "Product retrieved successfully.",
  FEATURED_PRODUCTS_RETRIEVED_SUCCESSFULLY:
    "Featured products retrieved successfully.",
  RELATED_PRODUCTS_RETRIEVED_SUCCESSFULLY:
    "Related products retrieved successfully.",

  // Purchase Order Request messages
  PURCHASE_ORDER_REQUEST_SUBMITTED_SUCCESSFULLY:
    "Purchase request submitted successfully.",
  REQUEST_DELETED_SUCCESSFULLY: "Purchase request deleted successfully.",
  REQUEST_ID_REQUIRED: "Request ID is required.",
  REQUEST_IDS_REQUIRED: "At least one request must be selected.",
  REDUNDANT_PRODUCTS_IDS: "Duplicate products found in the request.",
  SOME_PRODUCTS_ARE_NOT_FOUND: "Some requested products could not be found.",

  // Career messages
  CAREER_ADDED_SUCCESSFULLY: "Career position created successfully.",
  CAREER_UPDATED_SUCCESSFULLY: "Career position updated successfully.",
  CAREER_DELETED_SUCCESSFULLY: "Career position deleted successfully.",
  CAREER_ALREADY_EXISTS: "A career position with this title already exists.",
  POSITION_ALREADY_EXISTS: "A career position with this title already exists.",
  CAREER_NOT_FOUND: "The career position could not be found.",
  CAREERS_NOT_FOUND: "No career positions found to delete.",
  CAREER_ID_REQUIRED: "Career ID is required.",
  CAREER_SLUG_REQUIRED: "Career slug is required.",
  CAREERS_IDS_REQUIRED: "At least one career position must be selected.",
  CAREERS_DELETE_FAILED: "Failed to delete career positions.",
  CAREERS_RETRIEVED_SUCCESSFULLY: "Careers retrieved successfully.",
  CAREER_RETRIEVED_SUCCESSFULLY: "Career retrieved successfully.",
  CAREERS_WITH_APPLICATIONS_RETRIEVED_SUCCESSFULLY:
    "Careers with applications retrieved successfully.",

  // Application messages
  APPLICATION_DELETED_SUCCESSFULLY: "Application deleted successfully.",
  APPLICATIONS_DELETED_SUCCESSFULLY: "Applications deleted successfully.",
  APPLICATION_ID_REQUIRED: "Application ID is required.",
  APPLICATION_NOT_FOUND: "The application could not be found.",
  APPLICATION_SUBMITTED_SUCCESSFULLY: "Application submitted successfully.",
  APPLICATIONS_DELETE_FAILED: "Failed to delete applications.",
  APPLICATIONS_IDS_REQUIRED: "At least one application must be selected.",
  APPLICATIONS_NOT_FOUND: "No applications found.",
  APPLICATIONS_RETRIEVED_SUCCESSFULLY: "Applications retrieved successfully.",
  FILTERED_APPLICATIONS_RETRIEVED_SUCCESSFULLY:
    "Applications retrieved successfully.",
  APPLICATION_RETRIEVED_SUCCESSFULLY: "Application retrieved successfully.",
  APPLICATION_MARKED_AS_SHOWN_SUCCESSFULLY: "Application marked as reviewed.",
  APPLICATION_MARKED_AS_UNSHOWN_SUCCESSFULLY:
    "Application marked as unreviewed.",

  // Partner messages
  PARTNER_ADDED_SUCCESSFULLY: "Partner created successfully.",
  PARTNER_UPDATED_SUCCESSFULLY: "Partner updated successfully.",
  PARTNER_DELETED_SUCCESSFULLY: "Partner deleted successfully.",
  PARTNERS_DELETED_SUCCESSFULLY: "Partners deleted successfully.",
  PARTNER_ID_REQUIRED: "Partner ID is required.",
  PARTNER_IDS_REQUIRED: "At least one partner must be selected.",
  PARTNER_NOT_FOUND: "The partner could not be found.",
  PARTNERS_NOT_FOUND: "No partners found to delete.",
  PARTNERS_DELETE_FAILED: "Failed to delete partners.",
  PARTNERS_RETRIEVED_SUCCESSFULLY: "Partners retrieved successfully.",
  PARTNER_RETRIEVED_SUCCESSFULLY: "Partner retrieved successfully.",
};
