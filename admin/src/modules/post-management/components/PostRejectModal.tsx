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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200/90 p-6 space-y-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Từ Chối Duyệt Tin Đăng</h3>
          <p className="text-xs font-semibold text-[#11382b] bg-[#11382b]/10 inline-block px-2.5 py-0.5 rounded-md mt-1">
            {post.id} - {post.title}
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            Lý do từ chối (bắt buộc gửi thông báo tới hội viên):
          </label>
          <textarea
            rows={4}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Ví dụ: Nội dung tin chưa rõ ràng, giá không đúng thực tế, thông tin liên hệ không chính xác..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-sm font-normal text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-[#11382b] focus:ring-2 focus:ring-[#11382b]/10 outline-none transition-all resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer transition-all"
          >
            Hủy bỏ
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!rejectReason.trim()}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md disabled:opacity-50 cursor-pointer transition-all"
          >
            Xác nhận từ chối tin
          </button>
        </div>
      </div>
    </div>
  );
};
