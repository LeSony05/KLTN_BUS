// admin/src/modules/member-management/components/MemberManagementView.tsx
import React, { useState } from 'react';
import type { AdminMemberItem } from '../models/member-management.model';
import { MemberDetailModal } from './MemberDetailModal';
import { MemberLockModal } from './MemberLockModal';
import { MemberEditModal } from './MemberEditModal';
import {
  DataTable,
  MultiFilterBar,
  ActionDropdown,
  Badge,
  type Column,
} from '../../../common/components/ui';
import { Eye, Lock, Unlock, Edit3 } from 'lucide-react';

const MOCK_MEMBERS: AdminMemberItem[] = [
  {
    id: 'mem-1',
    memberCode: 'KC-001',
    fullName: 'Nguyễn Văn Hùng',
    phone: '0912.345.678',
    address: 'Quận 7, TP. Hồ Chí Minh',
    joinedDate: '10/01/2026',
    postsCount: 8,
    status: 'ACTIVE',
  },
  {
    id: 'mem-2',
    memberCode: 'KC-002',
    fullName: 'Trần Thị Mai',
    phone: '0988.765.432',
    address: 'Quận 1, TP. Hồ Chí Minh',
    joinedDate: '15/02/2026',
    postsCount: 3,
    status: 'ACTIVE',
  },
  {
    id: 'mem-3',
    memberCode: 'KC-003',
    fullName: 'Phạm Minh Tuấn',
    phone: '0903.112.233',
    address: 'TP. Thủ Đức, TP. Hồ Chí Minh',
    joinedDate: '01/03/2026',
    postsCount: 1,
    status: 'BLOCKED',
    blockReason: 'Đăng tin ảo, thông tin sai lệch nhiều lần',
  },
  {
    id: 'mem-4',
    memberCode: 'KC-004',
    fullName: 'Lê Hoàng Nam',
    phone: '0977.889.900',
    address: 'Huyện Bình Chánh, TP. Hồ Chí Minh',
    joinedDate: '05/03/2026',
    postsCount: 5,
    status: 'ACTIVE',
  },
];

// Helper to parse DD/MM/YYYY into Date
const parseDDMMYYYY = (dateStr: string): Date => {
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
  }
  return new Date(dateStr);
};

export const MemberManagementView: React.FC = () => {
  const [members, setMembers] = useState<AdminMemberItem[]>(MOCK_MEMBERS);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [locationFilter, setLocationFilter] = useState<string>('ALL');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedMember, setSelectedMember] = useState<AdminMemberItem | null>(null);
  const [lockingMember, setLockingMember] = useState<AdminMemberItem | null>(null);
  const [editingMember, setEditingMember] = useState<AdminMemberItem | null>(null);

  const filteredMembers = members.filter((m) => {
    const matchKeyword =
      m.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      m.phone.includes(searchKeyword) ||
      m.memberCode.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      m.address.toLowerCase().includes(searchKeyword.toLowerCase());

    const matchStatus = statusFilter === 'ALL' || m.status === statusFilter;
    const matchLocation =
      locationFilter === 'ALL' ||
      m.address.toLowerCase().includes(locationFilter.toLowerCase());

    // Date range filtering
    let matchDateRange = true;
    const itemDate = parseDDMMYYYY(m.joinedDate);

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      if (itemDate < start) matchDateRange = false;
    }

    if (endDate && matchDateRange) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      if (itemDate > end) matchDateRange = false;
    }

    return matchKeyword && matchStatus && matchLocation && matchDateRange;
  });

  const handleConfirmLock = (member: AdminMemberItem, reason?: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === member.id
          ? {
              ...m,
              status: m.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE',
              blockReason: m.status === 'ACTIVE' ? reason : undefined,
            }
          : m
      )
    );
    setLockingMember(null);
  };

  const handleSaveMember = (updatedMember: AdminMemberItem) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === updatedMember.id ? updatedMember : m))
    );
    setEditingMember(null);
  };

  const filterGroups = [
    {
      key: 'status',
      label: 'Trạng thái',
      value: statusFilter,
      options: [
        { value: 'ALL', label: 'Tất cả trạng thái' },
        { value: 'ACTIVE', label: 'Hoạt động' },
        { value: 'BLOCKED', label: 'Bị khóa' },
      ],
    },
    {
      key: 'location',
      label: 'Khu vực hoạt động',
      value: locationFilter,
      options: [
        { value: 'ALL', label: 'Tất cả khu vực' },
        { value: 'Hồ Chí Minh', label: 'TP. Hồ Chí Minh' },
        { value: 'Hà Nội', label: 'Hà Nội' },
        { value: 'Đà Nẵng', label: 'Đà Nẵng' },
        { value: 'Bình Dương', label: 'Bình Dương' },
        { value: 'Đồng Nai', label: 'Đồng Nai' },
      ],
    },
  ];

  const handleFilterChange = (key: string, value: string) => {
    if (key === 'status') setStatusFilter(value);
    if (key === 'location') setLocationFilter(value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchKeyword('');
    setStatusFilter('ALL');
    setLocationFilter('ALL');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  // Columns definition for DataTable
  const columns: Column<AdminMemberItem>[] = [
    {
      key: 'memberCode',
      header: 'Mã HV',
      className: 'font-bold text-[#11382b] w-24 whitespace-nowrap',
      render: (item) => <span>{item.memberCode}</span>,
    },
    {
      key: 'fullName',
      header: 'Họ và Tên / Số Điện Thoại',
      className: 'min-w-[200px]',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#11382b]/10 text-[#11382b] flex items-center justify-center font-bold text-xs flex-shrink-0">
            {item.fullName.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-slate-800">{item.fullName}</p>
            <p className="text-[11px] text-emerald-700 font-medium">{item.phone}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'address',
      header: 'Khu Vực Hoạt Động',
      className: 'min-w-[180px]',
      render: (item) => <span className="text-slate-600">{item.address}</span>,
    },
    {
      key: 'joinedDate',
      header: 'Ngày Gia Nhập',
      className: 'w-32 text-slate-500 text-[11px] whitespace-nowrap',
      render: (item) => <span>{item.joinedDate}</span>,
    },
    {
      key: 'postsCount',
      header: 'Tin Đã Đăng',
      className: 'w-28 text-center whitespace-nowrap',
      render: (item) => (
        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-slate-100 font-bold text-slate-700 text-xs">
          {item.postsCount} tin
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Trạng Thái',
      className: 'w-32 whitespace-nowrap',
      render: (item) =>
        item.status === 'ACTIVE' ? (
          <Badge variant="active">Hoạt động</Badge>
        ) : (
          <Badge variant="locked">Đã khóa</Badge>
        ),
    },
    {
      key: 'actions',
      header: 'Thao Tác',
      className: 'w-16 text-center whitespace-nowrap',
      render: (item) => (
        <ActionDropdown
          items={[
            {
              key: 'view',
              label: 'Xem chi tiết',
              icon: <Eye className="w-4 h-4 text-slate-500" />,
              onClick: () => setSelectedMember(item),
            },
            {
              key: 'edit',
              label: 'Chỉnh sửa hồ sơ',
              icon: <Edit3 className="w-4 h-4 text-slate-500" />,
              onClick: () => setEditingMember(item),
            },
            {
              key: 'lock',
              label: item.status === 'ACTIVE' ? 'Khóa tài khoản' : 'Mở khóa tài khoản',
              icon: item.status === 'ACTIVE' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />,
              variant: item.status === 'ACTIVE' ? 'danger' : 'success',
              onClick: () => setLockingMember(item),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Quản lý hội viên
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Danh sách tài khoản, lọc khu vực hoạt động, ngày gia nhập, trạng thái và quản lý thông tin.
          </p>
        </div>

        <span className="text-xs text-slate-500 font-medium self-start sm:self-auto">
          Tổng cộng: <strong className="text-[#11382b] font-bold">{members.length}</strong> hội viên
        </span>
      </div>

      {/* Multi Criteria Filter Bar with Location Filter & Date Pickers */}
      <MultiFilterBar
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
        searchPlaceholder="Tìm tên, số điện thoại, mã hội viên..."
        filterGroups={filterGroups}
        onFilterChange={handleFilterChange}
        showDateFilter={true}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onResetFilters={handleResetFilters}
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredMembers}
        keyExtractor={(item) => item.id}
        emptyMessage="Không tìm thấy hội viên nào phù hợp với bộ lọc"
        pagination={{
          currentPage,
          totalPages: Math.ceil(filteredMembers.length / 10) || 1,
          totalItems: filteredMembers.length,
          pageSize: 10,
          onPageChange: setCurrentPage,
        }}
      />

      {/* Detail Modal */}
      <MemberDetailModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      {/* Edit Modal */}
      <MemberEditModal
        member={editingMember}
        onClose={() => setEditingMember(null)}
        onSave={handleSaveMember}
      />

      {/* Lock Modal */}
      <MemberLockModal
        member={lockingMember}
        onClose={() => setLockingMember(null)}
        onConfirmLock={handleConfirmLock}
      />
    </div>
  );
};
