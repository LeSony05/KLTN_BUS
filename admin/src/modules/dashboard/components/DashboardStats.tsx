// admin/src/modules/dashboard/components/DashboardStats.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Clock,
  CheckCircle2,
  MessageSquareText,
  TrendingUp,
} from 'lucide-react';

interface DashboardStatsProps {
  totalMembers?: number;
  pendingPosts?: number;
  activePosts?: number;
  pendingContacts?: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalMembers = 1280,
  pendingPosts = 15,
  activePosts = 540,
  pendingContacts = 6,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Tổng Hội Viên */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Tổng Hội Viên
          </span>
          <span className="p-2 rounded-xl bg-emerald-50 text-[#143D30]">
            <Users className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-extrabold text-slate-900">
            {totalMembers.toLocaleString('vi-VN')}
          </div>
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12%</span>
          </span>
        </div>
      </div>

      {/* Card 2: Tin Chờ Duyệt */}
      <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3 bg-gradient-to-br from-white to-amber-50/30">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>Tin Chờ Duyệt</span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </span>
          <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
            <Clock className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-extrabold text-amber-900">{pendingPosts}</div>
          <Link
            to="/posts"
            className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline inline-flex items-center gap-0.5"
          >
            <span>Xử lý ngay →</span>
          </Link>
        </div>
      </div>

      {/* Card 3: Tin Đang Hoạt Động */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Tin Đang Hoạt Động
          </span>
          <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
            <CheckCircle2 className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-extrabold text-slate-900">{activePosts}</div>
          <span className="text-xs text-slate-400 font-medium">Toàn sàn</span>
        </div>
      </div>

      {/* Card 4: Liên Hệ Mới */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Yêu Cầu Liên Hệ
          </span>
          <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
            <MessageSquareText className="w-4 h-4" />
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-extrabold text-slate-900">{pendingContacts}</div>
          <span className="text-xs text-amber-700 font-bold">Chưa xử lý</span>
        </div>
      </div>
    </div>
  );
};
