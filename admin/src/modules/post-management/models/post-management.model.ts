// admin/src/modules/post-management/models/post-management.model.ts
import type { PostStatus, NeedType } from '../../../common/config/enums';

export interface AdminPostItem {
  id: string;
  title: string;
  needType: NeedType;
  propertyType: string;
  location: string;
  priceRange: string;
  areaRange: string;
  authorName: string;
  authorPhone: string;
  createdAt: string;
  status: PostStatus;
  description: string;
  rejectReason?: string;
}

export type PostFilterStatus = 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED';
