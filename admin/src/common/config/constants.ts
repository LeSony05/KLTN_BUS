// admin/src/common/config/constants.ts
import { PostStatus, MemberStatus, ContactStatus } from './enums';

export const ADMIN_CONFIG = {
  APP_NAME: 'King Connect Land Admin',
  SHORT_NAME: 'KC Admin',
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  MAIN_SITE_URL: 'http://localhost:3000',
};

export const POST_STATUS_BADGES: Record<
  PostStatus,
  { label: string; className: string }
> = {
  [PostStatus.APPROVED]: {
    label: 'Đã duyệt',
    className: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  [PostStatus.PENDING]: {
    label: 'Chờ duyệt',
    className: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  [PostStatus.REJECTED]: {
    label: 'Từ chối',
    className: 'bg-rose-100 text-rose-800 border-rose-300',
  },
  [PostStatus.DRAFT]: {
    label: 'Bản nháp',
    className: 'bg-slate-100 text-slate-700 border-slate-300',
  },
  [PostStatus.HIDDEN]: {
    label: 'Tạm ẩn',
    className: 'bg-purple-100 text-purple-800 border-purple-300',
  },
  [PostStatus.EXPIRED]: {
    label: 'Hết hạn',
    className: 'bg-orange-100 text-orange-800 border-orange-300',
  },
  [PostStatus.COMPLETED]: {
    label: 'Đã hoàn tất',
    className: 'bg-sky-100 text-sky-800 border-sky-300',
  },
};

export const MEMBER_STATUS_BADGES: Record<
  MemberStatus,
  { label: string; className: string }
> = {
  [MemberStatus.ACTIVE]: {
    label: 'Đang hoạt động',
    className: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  [MemberStatus.BLOCKED]: {
    label: 'Đang bị khóa',
    className: 'bg-rose-100 text-rose-800 border-rose-300',
  },
};

export const CONTACT_STATUS_BADGES: Record<
  ContactStatus,
  { label: string; className: string }
> = {
  [ContactStatus.PENDING]: {
    label: 'Chưa xử lý',
    className: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  [ContactStatus.IN_PROGRESS]: {
    label: 'Đang xử lý',
    className: 'bg-sky-100 text-sky-800 border-sky-300',
  },
  [ContactStatus.RESOLVED]: {
    label: 'Đã hoàn tất',
    className: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
};
