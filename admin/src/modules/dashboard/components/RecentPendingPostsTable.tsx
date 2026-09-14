// admin/src/modules/dashboard/components/RecentPendingPostsTable.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building, KeyRound, Eye } from 'lucide-react';
import type { RecentPendingPost } from '../models/dashboard.model';

const MOCK_RECENT_POSTS: RecentPendingPost[] = [
  {
    id: 'POST-1082',
    title: 'Cần mua gấp đất nền thổ cư TP. Thủ Đức ngân sách 3.5 tỷ',
    needType: 'BUY',
    authorName: 'Nguyễn Văn Hùng',
    authorPhone: '0912.345.678',
    location: 'Quận 7, TP.HCM',
    priceRange: '3.5 Tỷ - 4.2 Tỷ',
  },
  {
    id: 'POST-1083',
    title: 'Cần thuê mặt bằng kinh doanh F&B quận 1 ngân sách 40 triệu',
    needType: 'RENT',
    authorName: 'Trần Thị Mai',
    authorPhone: '0988.765.432',
    location: 'Quận 1, TP.HCM',
    priceRange: '25 Triệu - 40 Triệu',
  },
];

export const RecentPendingPostsTable: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Tin đăng mới gửi kiểm duyệt
          </h2>
          <p className="text-xs text-slate-400">
            Danh sách các bài đăng mới nhất cần ban quản trị phê duyệt
          </p>
        </div>
        <Link
          to="/posts"
          className="text-xs font-bold text-[#143D30] hover:text-amber-600 inline-flex items-center gap-1"
        >
          <span>Xem tất cả</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4">Tiêu đề tin</th>
              <th className="py-3 px-4">Nhu cầu</th>
              <th className="py-3 px-4">Người đăng</th>
              <th className="py-3 px-4">Khu vực</th>
              <th className="py-3 px-4">Khoảng giá</th>
              <th className="py-3 px-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
            {MOCK_RECENT_POSTS.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs truncate">
                  {post.title}
                </td>
                <td className="py-3.5 px-4">
                  {post.needType === 'BUY' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800">
                      <Building className="w-3 h-3" />
                      <span>CẦN MUA</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-sky-50 text-sky-800">
                      <KeyRound className="w-3 h-3" />
                      <span>CẦN THUÊ</span>
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-800">{post.authorName}</div>
                  <div className="text-[10px] text-slate-400">{post.authorPhone}</div>
                </td>
                <td className="py-3.5 px-4 text-slate-500">{post.location}</td>
                <td className="py-3.5 px-4 font-extrabold text-[#143D30]">{post.priceRange}</td>
                <td className="py-3.5 px-4 text-center">
                  <Link
                    to="/posts"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#143D30] hover:bg-[#0e2a20] text-white font-bold text-xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Duyệt</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
