// admin/src/modules/member-management/models/member-management.model.ts
import type { MemberStatus } from '../../../common/config/enums';

export interface AdminMemberItem {
  id: string;
  memberCode: string;
  fullName: string;
  phone: string;
  address: string;
  joinedDate: string;
  postsCount: number;
  status: MemberStatus;
  blockReason?: string;
}

export type MemberFilterStatus = 'ALL' | 'ACTIVE' | 'BLOCKED';
