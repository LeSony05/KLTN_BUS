// admin/src/modules/member-management/components/MemberDetailModal.tsx
import React from 'react';
import { Users, X, Phone, MapPin, Calendar } from 'lucide-react';
import type { AdminMemberItem } from '../models/member-management.model';

interface MemberDetailModalProps {
  member: AdminMemberItem | null;
  onClose: () => void;
}

export const MemberDetailModal: React.FC<MemberDetailModalProps> = ({
  member,
  onClose,
}) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#143D30]" />
            <h3 className="text-sm font-bold text-slate-900">
              Hồ sơ hội viên: {member.fullName} ({member.memberCode})
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
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Thông tin tài khoản
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  SĐT: <strong className="text-slate-800 font-bold">{member.phone}</strong>
                </span>
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  Địa chỉ: <strong className="text-slate-800 font-bold">{member.address}</strong>
                </span>
              </p>
              <p className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  Ngày tham gia:{' '}
                  <strong className="text-slate-800 font-bold">{member.joinedDate}</strong>
                </span>
              </p>
              <p>
                Trạng thái:{' '}
                <strong
                  className={
                    member.status === 'ACTIVE'
                      ? 'text-emerald-700 font-bold'
                      : 'text-rose-700 font-bold'
                  }
                >
                  {member.status === 'ACTIVE' ? 'Hoạt động' : 'Bị khóa'}
                </strong>
              </p>
            </div>
          </div>

          {/* Danh sách tin đã đăng */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tin đã đăng ({member.postsCount} tin)
            </h4>
            <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">
                  Cần mua gấp đất nền thổ cư TP. Thủ Đức ngân sách 3.5 tỷ
                </p>
                <p className="text-[11px] text-slate-400">3,5 tỷ · 10/09/2026</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800">
                Đã duyệt
              </span>
            </div>
          </div>
        </div>

        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
