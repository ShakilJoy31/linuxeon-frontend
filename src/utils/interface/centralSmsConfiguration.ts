export interface CentralSMS {
    id: number;
    appName: string;
    apiKey: string;
    type: 'unicode' | 'text' | 'flash';
    senderId: string;
    message: string;
    baseUrl: string;
    status: 'active' | 'inactive';
    createdAt?: string;
    updatedAt?: string;
}

export interface CentralSMSResponse {
    message: string;
    data: CentralSMS[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

export interface CentralSMSStats {
    totalSMS: number;
    activeSMS: number;
    inactiveSMS: number;
    uniqueServices: number;
}

export interface CentralSMSStatsResponse {
    message: string;
    data: CentralSMSStats;
}

export interface CreateCentralSMSRequest {
    appName: string;
    apiKey: string;
    type: string;
    senderId: string;
    message: string;
}

export interface UpdateCentralSMSRequest {
    id: number;
    data: Partial<CreateCentralSMSRequest>;
}