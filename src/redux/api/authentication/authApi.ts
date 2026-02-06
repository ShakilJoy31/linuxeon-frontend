import { apiSlice } from "../apiSlice";


export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/authentication/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Client"],
    }),

    registerClient: builder.mutation({
      query: (clientData: { email: string, password: string }) => ({
        url: "/authentication/register-new-client",
        method: "POST",
        body: clientData,
      }),
    }),

    getAllClients: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        status = "",
        role = "client"
      }: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        role?: string;
      }) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search) params.append("search", search);
        if (status) params.append("status", status);
        if (role) params.append("role", role);

        return {
          url: `/authentication/get-clients?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: (result) => {
        return result?.data
          ? [
            ...result.data.map(({ id }: { id: string }) => ({ type: 'Client' as const, id })),
            { type: 'Client', id: 'LIST' },
          ]
          : [{ type: 'Client', id: 'LIST' }];
      },
    }),

    getClientById: builder.query({
      query: (id: string) => ({
        url: `/authentication/get-client-according-to-id/${id}`,
        method: "GET",
      }),
    }),



    // Add these to your existing authApi endpoints
    deleteClient: builder.mutation({
      query: (id: number) => ({
        url: `/authentication/delete-client/${id}`,
        method: 'DELETE',
      }),
    }),

    updateClientStatus: builder.mutation({
      query: ({ id, status }: { id: number; status: 'active' | 'pending' | 'inactive' }) => ({
        url: `/authentication/update-client-status/${id}`,
        method: 'PUT',
        body: { status },
      }),
    }),

    refreshToken: builder.mutation({
      query: (refreshToken: string) => ({
        url: "/authentication/refresh",
        method: "POST",
        body: { refreshToken },
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterClientMutation,
  useGetAllClientsQuery,
  useGetClientByIdQuery,
  useRefreshTokenMutation,
  useDeleteClientMutation,
  useUpdateClientStatusMutation,
} = authApi;