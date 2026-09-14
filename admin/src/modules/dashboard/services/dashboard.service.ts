// admin/src/modules/dashboard/services/dashboard.service.ts
import { httpClient } from '../../../common/services';
import type { DashboardStatsData } from '../models/dashboard.model';

export const dashboardService = {
  getStats: async () => {
    return httpClient.get<DashboardStatsData>('/admin/stats');
  },
};
