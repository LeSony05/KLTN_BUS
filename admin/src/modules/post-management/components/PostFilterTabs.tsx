// admin/src/modules/post-management/components/PostFilterTabs.tsx
import React from 'react';
import { Clock, CheckCircle2, XCircle, Filter } from 'lucide-react';
import type { PostFilterStatus } from '../models/post-management.model';

interface PostFilterTabsProps {
  statusFilter: PostFilterStatus;
  onChangeFilter: (status: PostFilterStatus) => void;
  counts: {
    all: number;
    pending: number;
    approved: number;
    rejected: number;
  };
}

export const PostFilterTabs: React.FC<PostFilterTabsProps> = ({
  statusFilter,
  onChangeFilter,
  counts,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onChangeFilter('PENDING')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            statusFilter === 'PENDING'
              ? 'bg-[#143D30] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Chờ duyệt</span>
          <span
            className={`px-1.5 py-0.2 rounded-md text-[11px] font-bold ${
              statusFilter === 'PENDING'
                ? 'bg-amber-400 text-[#143D30]'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {counts.pending}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onChangeFilter('APPROVED')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            statusFilter === 'APPROVED'
              ? 'bg-[#143D30] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Đã duyệt</span>
          <span
            className={`px-1.5 py-0.2 rounded-md text-[11px] font-bold ${
              statusFilter === 'APPROVED'
                ? 'bg-emerald-500 text-white'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {counts.approved}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onChangeFilter('REJECTED')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            statusFilter === 'REJECTED'
              ? 'bg-[#143D30] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <XCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>Đã từ chối</span>
          <span
            className={`px-1.5 py-0.2 rounded-md text-[11px] font-bold ${
              statusFilter === 'REJECTED'
                ? 'bg-rose-500 text-white'
                : 'bg-rose-100 text-rose-800'
            }`}
          >
            {counts.rejected}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onChangeFilter('ALL')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            statusFilter === 'ALL'
              ? 'bg-[#143D30] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Tất cả ({counts.all})</span>
        </button>
      </div>

      <div className="flex items-center gap-2 px-2 text-xs text-slate-500 font-medium">
        <Filter className="w-3.5 h-3.5 text-slate-400" />
        <span>Bộ lọc trạng thái</span>
      </div>
    </div>
  );
};
