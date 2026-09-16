// admin/src/modules/dashboard/models/dashboard.model.ts

export interface DashboardStatsData {
  totalMembers: number;
  membersGrowthPercent: number;
  pendingPostsCount: number;
  activePostsCount: number;
  pendingContactsCount: number;
}

export interface RecentPendingPost {
  id: string;
  title: string;
  needType: 'BUY' | 'RENT';
  authorName: string;
  authorPhone: string;
  location: string;
  priceRange: string;
}
