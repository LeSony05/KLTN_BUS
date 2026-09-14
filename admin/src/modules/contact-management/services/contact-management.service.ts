// admin/src/modules/contact-management/services/contact-management.service.ts
import { httpClient } from '../../../common/services';
import type { AdminContactItem } from '../models/contact-management.model';
import type { ContactStatus } from '../../../common/config/enums';

export const contactManagementService = {
  getContacts: async () => {
    return httpClient.get<{ data: AdminContactItem[] }>('/admin/contacts');
  },

  updateContactStatus: async (id: string, status: ContactStatus) => {
    return httpClient.patch(`/admin/contacts/${id}/status`, { status });
  },
};
