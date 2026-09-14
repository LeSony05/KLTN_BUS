// admin/src/modules/member-management/services/member-management.service.ts
import { httpClient } from '../../../common/services';
import type { AdminMemberItem } from '../models/member-management.model';

export const memberManagementService = {
  getMembers: async (params?: { status?: string; keyword?: string }) => {
    return httpClient.get<{ data: AdminMemberItem[] }>('/admin/members', { params });
  },

  lockMember: async (id: string, reason: string) => {
    return httpClient.patch(`/admin/members/${id}/lock`, { reason });
  },

  unlockMember: async (id: string) => {
    return httpClient.patch(`/admin/members/${id}/unlock`);
  },
};
