// admin/src/common/config/enums.ts

export const PostStatus = {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  HIDDEN: 'HIDDEN',
  EXPIRED: 'EXPIRED',
  COMPLETED: 'COMPLETED',
} as const;
export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus];

export const NeedType = {
  BUY: 'BUY',
  RENT: 'RENT',
} as const;
export type NeedType = (typeof NeedType)[keyof typeof NeedType];

export const PropertyType = {
  RESIDENTIAL_LAND: 'RESIDENTIAL_LAND',
  TOWNHOUSE: 'TOWNHOUSE',
  VILLA: 'VILLA',
  APARTMENT: 'APARTMENT',
  COMMERCIAL: 'COMMERCIAL',
  WAREHOUSE: 'WAREHOUSE',
  AGRICULTURAL_LAND: 'AGRICULTURAL_LAND',
  OTHER: 'OTHER',
} as const;
export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];

export const MemberStatus = {
  ACTIVE: 'ACTIVE',
  BLOCKED: 'BLOCKED',
} as const;
export type MemberStatus = (typeof MemberStatus)[keyof typeof MemberStatus];

export const ContactStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
} as const;
export type ContactStatus = (typeof ContactStatus)[keyof typeof ContactStatus];
