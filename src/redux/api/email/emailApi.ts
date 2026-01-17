import { apiSlice } from "../apiSlice";
export const emailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEmailClient: builder.mutation({
      query: (data) => ({
        url: "/email/create-email",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["email-client"],
    }),
  }),
});

export const {
    useCreateEmailClientMutation,
} = emailApi;
