// admin/src/modules/post-management/services/post-management.service.ts
import { httpClient } from '../../../common/services';
import type { AdminPostItem } from '../models/post-management.model';

export const postManagementService = {
  getPosts: async (params?: { status?: string; page?: number }) => {
    return httpClient.get<{ data: AdminPostItem[] }>('/admin/posts', { params });
  },

  approvePost: async (id: string) => {
    return httpClient.patch(`/admin/posts/${id}/approve`);
  },

  rejectPost: async (id: string, reason: string) => {
    return httpClient.patch(`/admin/posts/${id}/reject`, { reason });
  },
};
