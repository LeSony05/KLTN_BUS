// admin/src/modules/contact-management/components/ContactManagementView.tsx
import React, { useState } from 'react';
import type { AdminContactItem } from '../models/contact-management.model';
import type { ContactStatus } from '../../../common/config/enums';
import {
  DataTable,
  MultiFilterBar,
  ActionDropdown,
  Badge,
  type Column,
} from '../../../common/components/ui';
import { CheckCircle2, MessageSquare, Trash2, Clock } from 'lucide-react';

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
    subject: 'Góp ý về việc xác thực số điện thoại OTP',
    message:
      'Tôi thấy hệ thống nhận mã OTP rất nhanh, xin cảm ơn ban quản trị.',
    createdAt: '08/09/2026',
    status: 'RESOLVED',
  },
];

export const ContactManagementView: React.FC = () => {
  const [contacts, setContacts] = useState<AdminContactItem[]>(MOCK_CONTACTS);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingContact, setViewingContact] = useState<AdminContactItem | null>(null);

  const handleUpdateStatus = (id: string, newStatus: ContactStatus) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa yêu cầu liên hệ này?')) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const filteredContacts = contacts.filter((c) => {
    const matchesKeyword =
      c.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      c.phone.includes(searchKeyword) ||
      c.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchKeyword.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesKeyword && matchesStatus;
  });

  const filterGroups = [
    {
      key: 'status',
      label: 'Trạng thái xử lý',
      value: statusFilter,
      options: [
        { value: 'ALL', label: 'Tất cả trạng thái' },
        { value: 'PENDING', label: 'Chờ xử lý' },
        { value: 'RESOLVED', label: 'Đã xử lý' },
      ],
    },
  ];

  const columns: Column<AdminContactItem>[] = [
    {
      key: 'id',
      header: 'Mã YC',
      className: 'font-bold text-[#11382b] w-24',
      render: (item) => <span>{item.id}</span>,
    },
    {
      key: 'fullName',
      header: 'Người Gửi & Liên Hệ',
      render: (item) => (
        <div>
          <p className="font-semibold text-slate-800">{item.fullName}</p>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
            <span className="text-emerald-700 font-medium">{item.phone}</span>
            <span>•</span>
            <span className="truncate">{item.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'subject',
      header: 'Chủ Đề & Nội Dung',
      render: (item) => (
        <div className="max-w-md">
          <p className="font-semibold text-slate-800 line-clamp-1">{item.subject}</p>
          <p className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">{item.message}</p>
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Ngày Gửi',
      className: 'w-32 text-slate-500 text-[11px]',
      render: (item) => <span>{item.createdAt}</span>,
    },
    {
      key: 'status',
      header: 'Trạng Thái',
      className: 'w-32',
      render: (item) =>
        item.status === 'RESOLVED' ? (
          <Badge variant="approved">Đã xử lý</Badge>
        ) : (
          <Badge variant="pending">Chờ xử lý</Badge>
        ),
    },
    {
      key: 'actions',
      header: 'Thao Tác',
      className: 'w-16 text-right',
      render: (item) => (
        <ActionDropdown
          items={[
            {
              key: 'view',
              label: 'Xem chi tiết tin nhắn',
              icon: <MessageSquare className="w-4 h-4 text-slate-500" />,
              onClick: () => setViewingContact(item),
            },
            {
              key: 'resolve',
              label: item.status === 'RESOLVED' ? 'Đánh dấu Chưa xử lý' : 'Đánh dấu Đã xử lý',
              icon: item.status === 'RESOLVED' ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />,
              variant: item.status === 'RESOLVED' ? 'default' : 'success',
              onClick: () =>
                handleUpdateStatus(item.id, item.status === 'RESOLVED' ? 'PENDING' : 'RESOLVED'),
            },
            {
              key: 'delete',
              label: 'Xóa yêu cầu',
              icon: <Trash2 className="w-4 h-4" />,
              variant: 'danger',
              onClick: () => handleDelete(item.id),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Quản lý yêu cầu liên hệ
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Tiếp nhận và cập nhật trạng thái xử lý các tin nhắn liên hệ từ website.
        </p>
      </div>

      <MultiFilterBar
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
        searchPlaceholder="Tìm tên, số điện thoại, email, nội dung..."
        filterGroups={filterGroups}
        onFilterChange={(_k, v) => setStatusFilter(v)}
        onResetFilters={() => {
          setSearchKeyword('');
          setStatusFilter('ALL');
        }}
      />

      <DataTable
        columns={columns}
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        emptyMessage="Không có yêu cầu liên hệ nào phù hợp"
        pagination={{
          currentPage,
          totalPages: Math.ceil(filteredContacts.length / 10) || 1,
          totalItems: filteredContacts.length,
          pageSize: 10,
          onPageChange: setCurrentPage,
        }}
      />

      {/* Detail Modal */}
      {viewingContact && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 border border-slate-200/90">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#11382b] bg-[#11382b]/10 px-2.5 py-1 rounded-lg">
                  {viewingContact.id}
                </span>
                <h3 className="text-base font-bold text-slate-900">Chi Tiết Yêu Cầu Liên Hệ</h3>
              </div>
              <Badge variant={viewingContact.status === 'RESOLVED' ? 'approved' : 'pending'}>
                {viewingContact.status === 'RESOLVED' ? 'Đã xử lý' : 'Chờ xử lý'}
              </Badge>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 font-medium block mb-0.5">Người gửi:</span>
                  <p className="font-bold text-slate-800 text-sm">{viewingContact.fullName}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block mb-0.5">Thông tin liên hệ:</span>
                  <p className="text-emerald-700 font-bold text-xs">{viewingContact.phone}</p>
                  <p className="text-slate-600 font-medium text-xs">{viewingContact.email}</p>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-medium block mb-1">Chủ đề:</span>
                <p className="font-bold text-slate-800 text-sm bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  {viewingContact.subject}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-slate-400 font-medium block mb-1.5">Nội dung tin nhắn:</span>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{viewingContact.message}</p>
              </div>

              <p className="text-xs text-slate-400 text-right">Ngày gửi: {viewingContact.createdAt}</p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setViewingContact(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 cursor-pointer transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
