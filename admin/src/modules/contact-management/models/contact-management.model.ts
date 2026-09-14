// admin/src/modules/contact-management/models/contact-management.model.ts
import type { ContactStatus } from '../../../common/config/enums';

export interface AdminContactItem {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: ContactStatus;
}
