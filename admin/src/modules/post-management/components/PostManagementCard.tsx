// admin/src/modules/post-management/components/PostManagementCard.tsx
import React from 'react';
import {
  Calendar,
  Building,
  KeyRound,
  Coins,
  Ruler,
  MapPin,
  User,
  Eye,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import type { AdminPostItem } from '../models/post-management.model';

interface PostManagementCardProps {
  post: AdminPostItem;
  onViewDetail: (post: AdminPostItem) => void;
  onApprove: (post: AdminPostItem) => void;
  onReject: (post: AdminPostItem) => void;
}

export const PostManagementCard: React.FC<PostManagementCardProps> = ({
  post,
  onViewDetail,
  onApprove,
  onReject,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all p-5 flex flex-col justify-between">
      <div className="space-y-3">
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-extrabold ${
              post.needType === 'BUY'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                : 'bg-sky-50 text-sky-800 border border-sky-200/60'
            }`}
          >
            {post.needType === 'BUY' ? (
              <Building className="w-3 h-3" />
            ) : (
              <KeyRound className="w-3 h-3" />
            )}
            <span>{post.needType === 'BUY' ? 'CẦN MUA' : 'CẦN THUÊ'}</span>
          </span>

          <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>Ngày gửi: {post.createdAt}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-[#143D30] transition-colors">
          {post.title}
        </h3>

        {/* Meta Grid */}
        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>
                Giá: <strong className="text-[#143D30] font-extrabold">{post.priceRange}</strong>
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>
                Diện tích: <strong className="text-slate-800">{post.areaRange}</strong>
              </span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 pt-0.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{post.location}</span>
          </div>

          <div className="flex items-center justify-between text-slate-500 pt-1.5 border-t border-slate-200/60">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span>
                Người đăng: <strong className="text-slate-800 font-bold">{post.authorName}</strong>
              </span>
            </span>
            <span className="text-[11px] text-slate-400 font-semibold">({post.authorPhone})</span>
          </div>
        </div>
      </div>

      {/* Actions Toolbar */}
      <div className="flex items-center justify-between gap-2 pt-4 mt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => onViewDetail(post)}
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-[#143D30] transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Xem chi tiết</span>
        </button>

        {post.status === 'PENDING' && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onReject(post)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
            >
              Từ chối
            </button>

            <button
              type="button"
              onClick={() => onApprove(post)}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#143D30] hover:bg-[#0e2a20] text-white shadow-sm transition-colors cursor-pointer"
            >
              Phê duyệt
            </button>
          </div>
        )}

        {post.status === 'APPROVED' && (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Đã duyệt hiển thị</span>
          </span>
        )}

        {post.status === 'REJECTED' && (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600">
            <XCircle className="w-3.5 h-3.5" />
            <span>Đã từ chối</span>
          </span>
        )}
      </div>
    </div>
  );
};
