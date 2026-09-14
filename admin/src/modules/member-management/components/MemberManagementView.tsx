// admin/src/modules/member-management/components/MemberManagementView.tsx
import React, { useState } from 'react';
import type {
  AdminMemberItem,
  MemberFilterStatus,
} from '../models/member-management.model';
import { MemberFilterToolbar } from './MemberFilterToolbar';
import { MemberTable } from './MemberTable';
import { MemberDetailModal } from './MemberDetailModal';
import { MemberLockModal } from './MemberLockModal';

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

export const MemberManagementView: React.FC = () => {
  const [members, setMembers] = useState<AdminMemberItem[]>(MOCK_MEMBERS);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<MemberFilterStatus>('ALL');
  const [selectedMember, setSelectedMember] = useState<AdminMemberItem | null>(null);
  const [lockingMember, setLockingMember] = useState<AdminMemberItem | null>(null);

  const filteredMembers = members.filter((m) => {
    const matchKeyword =
      m.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      m.phone.includes(searchKeyword) ||
      m.memberCode.toLowerCase().includes(searchKeyword.toLowerCase());

    const matchStatus = statusFilter === 'ALL' || m.status === statusFilter;
    return matchKeyword && matchStatus;
  });

  const counts = {
    all: members.length,
    active: members.filter((m) => m.status === 'ACTIVE').length,
    blocked: members.filter((m) => m.status === 'BLOCKED').length,
  };

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

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Quản lý hội viên
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Danh sách tài khoản, trạng thái hoạt động và các tin đăng của hội viên.
          </p>
        </div>

        <span className="text-xs text-slate-500 font-medium self-start sm:self-auto">
          Tổng cộng: <strong className="text-[#143D30] font-bold">{members.length}</strong> hội viên
        </span>
      </div>

      {/* Toolbar */}
      <MemberFilterToolbar
        searchKeyword={searchKeyword}
        onChangeKeyword={setSearchKeyword}
        statusFilter={statusFilter}
        onChangeStatusFilter={setStatusFilter}
        counts={counts}
      />

      {/* Data Table */}
      <MemberTable
        members={filteredMembers}
        onViewDetail={setSelectedMember}
        onToggleLock={setLockingMember}
      />

      {/* MODAL CHI TIẾT */}
      <MemberDetailModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      {/* MODAL KHÓA */}
      <MemberLockModal
        member={lockingMember}
        onClose={() => setLockingMember(null)}
        onConfirmLock={handleConfirmLock}
      />
    </div>
  );
};
