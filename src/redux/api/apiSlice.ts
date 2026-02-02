import { appConfiguration } from "@/utils/constant/appConfiguration";
import { shareWithCookies } from "@/utils/helper/shareWithCookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = appConfiguration.baseUrl;

// Create a more specific base query for debugging
const customBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders(headers) {
    const token = shareWithCookies("get", `${appConfiguration.appCode}token`, 0) as string | null;
    
    console.log('Base URL:', BASE_URL);
    console.log('Token from cookies:', token);
    
    // Only set authorization header if token exists
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      console.log('No token found in cookies');
    }
    
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
  tagTypes: ["clients", "file"],
});