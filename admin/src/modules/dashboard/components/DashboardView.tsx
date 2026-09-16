// admin/src/modules/dashboard/components/DashboardView.tsx
import React from 'react';
import { DashboardStats } from './DashboardStats';
import { RecentPendingPostsTable } from './RecentPendingPostsTable';

export const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Bảng điều khiển hệ thống
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Tổng quan số liệu hội viên, tin đăng và các yêu cầu kết nối BĐS trong ngày.
        </p>
      </div>

      {/* 4 Thẻ Chỉ Số Lớn */}
      <DashboardStats />

      {/* Bảng Tin Chờ Duyệt Mới Nhất */}
      <RecentPendingPostsTable />
    </div>
  );
};
