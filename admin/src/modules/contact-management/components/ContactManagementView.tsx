// admin/src/modules/contact-management/components/ContactManagementView.tsx
import React, { useState } from 'react';
import type { AdminContactItem } from '../models/contact-management.model';
import type { ContactStatus } from '../../../common/config/enums';
import { ContactItemCard } from './ContactItemCard';

const MOCK_CONTACTS: AdminContactItem[] = [
  {
    id: 'ct-1',
    fullName: 'Hoàng Quốc Bảo',
    phone: '0908.123.456',
    email: 'bao.hoang@gmail.com',
    subject: 'Hỏi về quy trình gia nhập hội viên chính thức',
    message:
      'Chào ban quản trị, tôi là môi giới BĐS khu vực Quận 7 muốn đăng ký gia nhập hội King Connect Land để kết nối nguồn khách thì cần điều kiện gì?',
    createdAt: '11/09/2026',
    status: 'PENDING',
  },
  {
    id: 'ct-2',
    fullName: 'Đỗ Thúy Hằng',
    phone: '0933.999.888',
    email: 'thuyhang@yahoo.com',
    subject: 'Góp ý về việc xác thực số điện thoại',
    message:
      'Tôi thấy hệ thống nhận mã OTP rất nhanh, xin cảm ơn ban quản trị.',
    createdAt: '08/09/2026',
    status: 'RESOLVED',
  },
];

export const ContactManagementView: React.FC = () => {
  const [contacts, setContacts] = useState<AdminContactItem[]>(MOCK_CONTACTS);

  const handleUpdateStatus = (id: string, newStatus: ContactStatus) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Quản Lý Yêu Cầu Liên Hệ
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Tiếp nhận và cập nhật trạng thái xử lý các tin nhắn liên hệ gửi từ website.
        </p>
      </div>

      <div className="space-y-4">
        {contacts.map((c) => (
          <ContactItemCard
            key={c.id}
            contact={c}
            onUpdateStatus={handleUpdateStatus}
          />
        ))}
      </div>
    </div>
  );
};
