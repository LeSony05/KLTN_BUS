// frontend/src/modules/client/post-property/models/post-property.model.ts

export type NeedType = 'BUY' | 'RENT';

export type PostStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';

export interface PropertyTypeOption {
  id: string;
  label: string;
  iconName: string;
}

export interface CreatePostFormData {
  needType: NeedType;
  propertyType: string;
  title: string;
  price: string;
  minArea: string;
  province: string;
  district: string;
  legal: string;
  direction: string;
  note: string;
  fullName: string;
  phone: string;
  memberCode?: string;
  status?: PostStatus;
}

export const INITIAL_FORM_DATA: CreatePostFormData = {
  needType: 'BUY',
  propertyType: 'Đất nền',
  title: '',
  price: '',
  minArea: '',
  province: '',
  district: '',
  legal: '',
  direction: '',
  note: '',
  fullName: '',
  phone: '',
  memberCode: '',
  status: 'DRAFT',
};
