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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400">
              {post.id}
            </span>
            <span className="text-slate-300">|</span>
            <h3 className="text-sm font-bold text-slate-900">
              Chi tiết tin đăng kiểm duyệt
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 leading-snug">
            {post.title}
          </h2>

          <div className="grid grid-cols-2 gap-2.5 bg-slate-50 p-4 rounded-xl text-xs text-slate-600 border border-slate-100">
            <p>
              Nhu cầu:{' '}
              <strong className="text-slate-900 font-bold">
                {post.needType === 'BUY' ? 'Cần mua' : 'Cần thuê'}
              </strong>
            </p>
            <p>
              Loại BĐS: <strong className="text-slate-900 font-bold">{post.propertyType}</strong>
            </p>
            <p>
              Khoảng giá:{' '}
              <strong className="text-[#143D30] font-extrabold">{post.priceRange}</strong>
            </p>
            <p>
              Diện tích: <strong className="text-slate-900 font-bold">{post.areaRange}</strong>
            </p>
            <p className="col-span-2">
              Khu vực: <strong className="text-slate-900">{post.location}</strong>
            </p>
            <p className="col-span-2">
              Người đăng: <strong className="text-slate-900">{post.authorName}</strong>{' '}
              ({post.authorPhone})
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Mô tả chi tiết:
            </h4>
            <p className="text-xs leading-relaxed text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200">
              {post.description}
            </p>
          </div>
        </div>

        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
          >
            Đóng
          </button>

          {post.status === 'PENDING' && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenReject(post)}
                className="px-4 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 cursor-pointer"
              >
                Từ chối duyệt
              </button>

              <button
                type="button"
                onClick={() => onApprove(post)}
                className="px-5 py-2 rounded-lg bg-[#143D30] hover:bg-[#0e2a20] text-white font-bold text-xs shadow-sm cursor-pointer"
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
