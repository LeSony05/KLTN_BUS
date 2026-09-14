// admin/src/modules/member-management/components/MemberFilterToolbar.tsx
import React from 'react';
import { Search } from 'lucide-react';
import type { MemberFilterStatus } from '../models/member-management.model';

interface MemberFilterToolbarProps {
  searchKeyword: string;
  onChangeKeyword: (val: string) => void;
  statusFilter: MemberFilterStatus;
  onChangeStatusFilter: (status: MemberFilterStatus) => void;
  counts: {
    all: number;
    active: number;
    blocked: number;
  };
}

export const MemberFilterToolbar: React.FC<MemberFilterToolbarProps> = ({
  searchKeyword,
  onChangeKeyword,
  statusFilter,
  onChangeStatusFilter,
  counts,
}) => {
  return (
    <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Search */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => onChangeKeyword(e.target.value)}
          placeholder="Tìm theo Mã HV, Tên, Số điện thoại..."
          className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 focus:border-[#143D30] outline-none transition-all"
        />
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 w-full sm:w-auto bg-slate-100 p-1 rounded-xl">
        <button
          type="button"
          onClick={() => onChangeStatusFilter('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
            statusFilter === 'ALL'
              ? 'bg-[#143D30] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Tất cả ({counts.all})
        </button>

        <button
          type="button"
          onClick={() => onChangeStatusFilter('ACTIVE')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
            statusFilter === 'ACTIVE'
              ? 'bg-[#143D30] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Hoạt động ({counts.active})
        </button>

        <button
          type="button"
          onClick={() => onChangeStatusFilter('BLOCKED')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
            statusFilter === 'BLOCKED'
              ? 'bg-[#143D30] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Bị khóa ({counts.blocked})
        </button>
      </div>
    </div>
  );
};
