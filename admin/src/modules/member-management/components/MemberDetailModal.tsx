// admin/src/modules/member-management/components/MemberDetailModal.tsx
import React from 'react';
import { User, X, Phone, MapPin, Calendar, Mail, FileText, ShieldAlert } from 'lucide-react';
import type { AdminMemberItem } from '../models/member-management.model';
import { Badge } from '../../../common/components/ui/Badge';

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#11382b] text-amber-400 flex items-center justify-center font-bold text-base shadow-sm">
              {member.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                  {member.fullName}
                </h3>
                <Badge variant={member.status === 'ACTIVE' ? 'active' : 'locked'}>
                  {member.status === 'ACTIVE' ? 'Hoạt động' : 'Đã khóa'}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                Mã Hội Viên: <span className="text-[#11382b] font-bold">{member.memberCode}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Read-Only Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Section 1: Detailed Member Information (2-Column Grid) */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/70 space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-[#11382b]" />
              <span>Thông tin tài khoản & Liên hệ</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-100">
                <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div>
                  <span className="text-slate-400 text-[11px] block">Họ và tên</span>
                  <span className="font-bold text-slate-900 text-sm">{member.fullName}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-100">
                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div>
                  <span className="text-slate-400 text-[11px] block">Số điện thoại</span>
                  <span className="font-bold text-emerald-700 text-sm">{member.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-100">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div>
                  <span className="text-slate-400 text-[11px] block">Email</span>
                  <span className="font-bold text-slate-800">
                    {member.fullName.toLowerCase().replace(/\s+/g, '')}@gmail.com
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-100">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div>
                  <span className="text-slate-400 text-[11px] block">Khu vực hoạt động</span>
                  <span className="font-bold text-slate-800">{member.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-100">
                <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div>
                  <span className="text-slate-400 text-[11px] block">Ngày gia nhập hệ thống</span>
                  <span className="font-bold text-slate-800">{member.joinedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-100">
                <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div>
                  <span className="text-slate-400 text-[11px] block">Số lượng tin BĐS đã gửi</span>
                  <span className="font-bold text-amber-600">{member.postsCount} tin đăng</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Block Reason Warning if blocked */}
          {member.status === 'BLOCKED' && member.blockReason && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-rose-900">Lý do bị khóa tài khoản:</h5>
                <p className="text-xs text-rose-700 mt-0.5">{member.blockReason}</p>
              </div>
            </div>
          )}

          {/* Section 3: Recent Posted Needs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>Danh sách tin nhu cầu BĐS vừa đăng</span>
              <span className="text-[#11382b] font-bold">Tổng số: {member.postsCount} tin</span>
            </h4>

            <div className="space-y-2.5">
              <div className="p-4 bg-white border border-slate-200/90 rounded-2xl flex items-center justify-between gap-4 hover:border-slate-300 transition-colors">
                <div className="space-y-1">
                  <p className="font-bold text-slate-900 text-xs">
                    Cần mua gấp đất nền thổ cư TP. Thủ Đức ngân sách 3.5 tỷ
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Ngân sách: <span className="font-bold text-amber-600">3,5 tỷ</span> • Ngày đăng: 10/09/2026
                  </p>
                </div>
                <Badge variant="approved">Đã duyệt</Badge>
              </div>

              <div className="p-4 bg-white border border-slate-200/90 rounded-2xl flex items-center justify-between gap-4 hover:border-slate-300 transition-colors">
                <div className="space-y-1">
                  <p className="font-bold text-slate-900 text-xs">
                    Cần thuê mặt bằng kinh doanh F&B quận 1 ngân sách 40 triệu
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Ngân sách: <span className="font-bold text-amber-600">40 tr/tháng</span> • Ngày đăng: 05/09/2026
                  </p>
                </div>
                <Badge variant="approved">Đã duyệt</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#11382b] hover:bg-[#0d2d23] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
