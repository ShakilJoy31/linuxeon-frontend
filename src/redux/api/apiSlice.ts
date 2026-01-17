import { appConfiguration } from "@/utils/constant/appConfiguration";
import { shareWithCookies } from "@/utils/helper/shareWithCookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = appConfiguration.baseUrl;
// Create a more specific base query for debugging
const customBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders(headers) {
    const token = shareWithCookies("get", `${appConfiguration.appCode}token`);
    console.log('Base URL:', BASE_URL);
    console.log('Token:', token);
    
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
  tagTypes: [
    "user",
    "products",
    "category",
    "subcategory",
    "brand",
    "color",
    "size",
    "file",
    "feature",
    "cart",
    "order",
    "company",
    "discount",
    "productsOffer",
    "banner",
    "offers",
    "smallBanner",
    "bank",
    "emi",
    "review",
    "ram",
    "rom",
    "highlightText",
    "whatsapp",
    "sim",
    "region",
    "chipset",
    "report",
    "returnProduct",
    "search",
    "feature-list",
    "condition",
    "categoryWiseProduct",
    "brandWiseProduct",
    "dealProduct",
    "vendor",
    "Gift",
    "payment",
    "warranty",
    "categoryOffer",
    "brandOffer",
    "deliveryCampaign",
    "material",
    "connectivity",
    "connector-type",
    "plug-type",
    "customer",
    "blogTags",
    "blogPost",
    "pages",
    "pupupList",
    "regularWarranties",
    "newArrivalProduct",
    "popularProduct",
    "Tags",
    "courier",
    "custom-message",
    "orderMessageTemplate",
    "customers",
    "section",
    "sectionWise",
    "shippingMethod",
    "branch",
    "warrantyInfos",
    "ShippingAddress",
    "shippingInfo",
    "PreOrder",
    "subcategoryOffer",
    "variation",
    "seller-login",
    "faq",
    "project",
    "blog-category",
    "email-client"
  ],
});
