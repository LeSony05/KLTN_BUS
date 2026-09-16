// admin/src/modules/settings/services/settings.service.ts
import { httpClient } from '../../../common/services';
import type { AdminSettingsPayload } from '../models/settings.model';

export const settingsService = {
  saveBankConfig: async (configs: AdminSettingsPayload) => {
    return httpClient.post('/admin/settings/banks', configs);
  },

  getBankConfig: async () => {
    return httpClient.get<AdminSettingsPayload>('/admin/settings/banks');
  },
};
