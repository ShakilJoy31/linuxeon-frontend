// utils/interface/smsHistoryInterface.ts
export interface SMSHistory {
  id: number;
  clientId: number;
  configId: number;
  phoneNumber: string;
  message: string;
  messageType: 'config' | 'custom';
  gatewayMessageId: string | null;
  gatewayResponse: string | null;
  status: 'sent' | 'failed' | 'delivered' | 'pending';
  deliveryStatus: 'pending' | 'delivered' | 'failed' | 'unknown';
  sentAt: string;
  deliveryConfirmedAt: string | null;
  cost: string;
  characterCount: number;
  smsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SMSHistoryResponse {
  success: boolean;
  message: string;
  data: {
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    history: SMSHistory[];
  };
}

export interface SMSHistoryFilters {
  page?: number;
  limit?: number;
  clientId?: number | string;
  configId?: number | string;
  phoneNumber?: string;
  messageType?: 'config' | 'custom';
  status?: 'sent' | 'failed' | 'delivered' | 'pending';
  deliveryStatus?: 'pending' | 'delivered' | 'failed' | 'unknown';
  startDate?: string;
  endDate?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}