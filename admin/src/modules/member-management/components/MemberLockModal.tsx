// admin/src/modules/member-management/components/MemberLockModal.tsx
import React, { useState } from 'react';
import type { AdminMemberItem } from '../models/member-management.model';

interface MemberLockModalProps {
  member: AdminMemberItem | null;
  onClose: () => void;
  onConfirmLock: (member: AdminMemberItem, reason?: string) => void;
}

export const MemberLockModal: React.FC<MemberLockModalProps> = ({
  member,
  onClose,
  onConfirmLock,
}) => {
  const [lockReason, setLockReason] = useState('');

  if (!member) return null;

  const isLocking = member.status === 'ACTIVE';

  const handleConfirm = () => {
    if (isLocking && !lockReason.trim()) return;
    onConfirmLock(member, lockReason.trim());
    setLockReason('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 p-5 space-y-3.5">
        <h3 className="text-sm font-bold text-slate-900">
          {isLocking ? 'Khóa tài khoản hội viên' : 'Mở khóa tài khoản'}
        </h3>
        <p className="text-xs text-slate-500">
          {member.fullName} ({member.phone})
        </p>

        {isLocking && (
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Lý do khóa tài khoản:
            </label>
            <textarea
              rows={3}
              value={lockReason}
              onChange={(e) => setLockReason(e.target.value)}
              placeholder="Ví dụ: Đăng tin ảo nhiều lần, vi phạm quy chế hội..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:bg-white focus:border-[#143D30] outline-none"
            />
          </div>
        )}

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
            disabled={isLocking && !lockReason.trim()}
            className={`px-4 py-2 rounded-lg text-xs font-bold text-white shadow-sm disabled:opacity-50 cursor-pointer ${
              isLocking
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-[#143D30] hover:bg-[#0e2a20]'
            }`}
          >
            {isLocking ? 'Khóa tài khoản' : 'Mở khóa'}
          </button>
        </div>
      </div>
    </div>
  );
};
