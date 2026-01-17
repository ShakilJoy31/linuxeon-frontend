import { apiSlice } from "../apiSlice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getAllProject: builder.query({
      query: ({ page = 1, size = 10, search = "" }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", size.toString());
        if (search) params.append("search", search);

        const url = `/project/get-project-all?${params.toString()}`;
        console.log('Constructed URL:', url);

        return {
          url: url,
          method: "GET",
        };
      },
      providesTags: ["project"],
    }),

    getProjectById: builder.query({
      query: (id) => ({
        url: `/project/get-project-by-id/${id}`,
        method: "GET",
      }),
      providesTags: ["project"],
    }),

  }),
});

export const {
  useGetAllProjectQuery,
  useGetProjectByIdQuery
} = projectApi;