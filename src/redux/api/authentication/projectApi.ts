import { apiSlice } from "../apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // Login user
    login: builder.mutation({
      query: (credentials) => ({
        url: "/authentication/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Register new client
    registerClient: builder.mutation({
      query: (clientData) => ({
        url: "/authentication/register-new-client",
        method: "POST",
        body: clientData,
      }),
      invalidatesTags: ["clients"],
    }),

    // Get all clients with pagination and filtering
    getAllClients: builder.query({
      query: ({ 
        page = 1, 
        limit = 10, 
        search = "", 
        status = "", 
        role = "client" 
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
      providesTags: ["clients"],
    }),

    // Get client by ID
    getClientById: builder.query({
      query: (id) => ({
        url: `/authentication/get-client-according-to-id/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "clients", id }],
    }),

    // Update client
    updateClient: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/authentication/update-client/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "clients", id },
        "clients"
      ],
    }),

    // Delete client
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/authentication/delete-client/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["clients"],
    }),

    // Update client status
    updateClientStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/authentication/update-client-status/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "clients", id },
        "clients"
      ],
    }),

    //! Refresh access token. Will be used in the future for token refresh mechanism
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
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
  useUpdateClientMutation,
  useDeleteClientMutation,
  useUpdateClientStatusMutation,
  useRefreshTokenMutation,
} = authApi;