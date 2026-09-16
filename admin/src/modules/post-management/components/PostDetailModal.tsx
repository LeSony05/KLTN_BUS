// admin/src/modules/post-management/components/PostDetailModal.tsx
import React from 'react';
import { X } from 'lucide-react';
import type { AdminPostItem } from '../models/post-management.model';

interface PostDetailModalProps {
  post: AdminPostItem | null;
  onClose: () => void;
  onApprove: (post: AdminPostItem) => void;
  onOpenReject: (post: AdminPostItem) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  onClose,
  onApprove,
  onOpenReject,
}) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-[#11382b] bg-[#11382b]/10 px-2.5 py-1 rounded-lg">
              {post.id}
            </span>
            <span className="text-slate-300">|</span>
            <h3 className="text-base font-bold text-slate-900">
              Chi Tiết Tin Đăng Nhu Cầu BĐS
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/60 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <h2 className="text-lg font-extrabold text-slate-900 leading-snug">
            {post.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl text-xs text-slate-600 border border-slate-200/80">
            <div className="space-y-2">
              <p>
                Nhu cầu:{' '}
                <strong className="text-slate-900 font-bold text-sm">
                  {post.needType === 'BUY' ? 'Cần mua' : 'Cần thuê'}
                </strong>
              </p>
              <p>
                Loại BĐS: <strong className="text-slate-900 font-semibold">{post.propertyType}</strong>
              </p>
              <p>
                Khu vực: <strong className="text-slate-900 font-semibold">{post.location}</strong>
              </p>
            </div>

            <div className="space-y-2">
              <p>
                Ngân sách dự kiến:{' '}
                <strong className="text-amber-600 font-bold text-sm">{post.priceRange}</strong>
              </p>
              <p>
                Diện tích yêu cầu: <strong className="text-slate-900 font-semibold">{post.areaRange}</strong>
              </p>
              <p>
                Người đăng tin:{' '}
                <strong className="text-slate-900 font-semibold">{post.authorName}</strong>{' '}
                <span className="text-emerald-700 font-bold">({post.authorPhone})</span>
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Nội dung mô tả chi tiết:
            </h4>
            <div className="text-sm leading-relaxed text-slate-700 bg-slate-50/50 p-4 rounded-2xl border border-slate-200/80 whitespace-pre-wrap">
              {post.description}
            </div>
          </div>

          {post.rejectReason && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 space-y-1">
              <span className="font-extrabold block text-rose-900">Lý do từ chối duyệt:</span>
              <p className="font-medium leading-relaxed">{post.rejectReason}</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer transition-all"
          >
            Đóng
          </button>

          {post.status === 'PENDING' && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenReject(post)}
                className="px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 cursor-pointer transition-all"
              >
                Từ chối duyệt
              </button>

              <button
                type="button"
                onClick={() => onApprove(post)}
                className="px-6 py-2.5 rounded-xl bg-[#3c50e0] hover:bg-[#3142bd] text-white font-semibold text-xs shadow-md cursor-pointer transition-all"
              >
                Phê duyệt ngay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
