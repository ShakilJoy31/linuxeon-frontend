import { apiSlice } from "../apiSlice";
import { 
    CentralSMSResponse, 
    CentralSMSStatsResponse, 
    CreateCentralSMSRequest,
    UpdateCentralSMSRequest,
    CentralSMS
} from "@/utils/interface/centralSmsConfiguration";

export const centralSmsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all central SMS configurations
        getAllCentralSMS: builder.query<CentralSMSResponse, {
            page?: number;
            limit?: number;
            search?: string;
            type?: string;
            service?: string;
        }>({
            query: ({ page = 1, limit = 10, search, type, service }) => {
                const queryParams = new URLSearchParams();
                queryParams.append('page', page.toString());
                queryParams.append('limit', limit.toString());
                if (search) queryParams.append('search', search);
                if (type) queryParams.append('type', type);
                if (service) queryParams.append('service', service);
                
                return {
                    url: `/central-configuration/get-sms?${queryParams.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ['CentralSMS'],
        }),

        // Get central SMS stats
        getCentralSMSStats: builder.query<CentralSMSStatsResponse, object>({
            query: () => ({
                url: `/central-configuration/stats`,
                method: "GET",
            }),
            providesTags: ['CentralSMS'],
        }),

        // Get single central SMS by ID
        getCentralSMSById: builder.query<{ data: CentralSMS; message: string }, number>({
            query: (id) => `/central-configuration/get-sms/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'CentralSMS', id }],
        }),

        // Create central SMS configuration
        createCentralSMS: builder.mutation<{ data: CentralSMS; message: string }, CreateCentralSMSRequest>({
            query: (data) => ({
                url: `/central-configuration/add-new-sms`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['CentralSMS'],
        }),

        // Update central SMS configuration
        updateCentralSMS: builder.mutation<{ data: CentralSMS; message: string }, UpdateCentralSMSRequest>({
            query: ({ id, data }) => ({
                url: `/central-configuration/update-sms/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'CentralSMS', id }, 'CentralSMS'],
        }),

        // Delete central SMS configuration
        deleteCentralSMS: builder.mutation<{ message: string }, number>({
            query: (id) => ({
                url: `/central-configuration/delete-sms/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CentralSMS'],
        }),

        // Test central SMS configuration
        testCentralSMS: builder.mutation<{ message: string }, { id: number; phoneNumber: string; customMessage?: string }>({
            query: ({ id, ...data }) => ({
                url: `/central-configuration/test/${id}`,
                method: 'POST',
                body: data,
            }),
        }),

        // Toggle central SMS status
        toggleCentralSMSStatus: builder.mutation<{ data: { id: number; status: string }; message: string }, number>({
            query: (id) => ({
                url: `/central-configuration/toggle-status/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'CentralSMS', id }, 'CentralSMS'],
        }),
    }),
});

export const {
    useGetAllCentralSMSQuery,
    useGetCentralSMSStatsQuery,
    useGetCentralSMSByIdQuery,
    useCreateCentralSMSMutation,
    useUpdateCentralSMSMutation,
    useDeleteCentralSMSMutation,
    useTestCentralSMSMutation,
    useToggleCentralSMSStatusMutation,
} = centralSmsApi;