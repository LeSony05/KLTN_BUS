// admin/src/modules/post-management/components/PostRejectModal.tsx
import React, { useState } from 'react';
import type { AdminPostItem } from '../models/post-management.model';

interface PostRejectModalProps {
  post: AdminPostItem | null;
  onClose: () => void;
  onConfirmReject: (post: AdminPostItem, reason: string) => void;
}

export const PostRejectModal: React.FC<PostRejectModalProps> = ({
  post,
  onClose,
  onConfirmReject,
}) => {
  const [rejectReason, setRejectReason] = useState('');

  if (!post) return null;

  const handleConfirm = () => {
    if (!rejectReason.trim()) return;
    onConfirmReject(post, rejectReason.trim());
    setRejectReason('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 p-5 space-y-3.5">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Từ chối duyệt tin đăng</h3>
          <p className="text-xs text-slate-500 mt-0.5 truncate">{post.title}</p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">
            Lý do từ chối (bắt buộc gửi cho hội viên):
          </label>
          <textarea
            rows={3}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Ví dụ: Khoảng giá chưa phù hợp, vị trí thiếu rõ ràng..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#143D30] outline-none"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!rejectReason.trim()}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm disabled:opacity-50 cursor-pointer"
          >
            Xác nhận từ chối
          </button>
        </div>
      </div>
    </div>
  );
};
