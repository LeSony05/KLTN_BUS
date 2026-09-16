// admin/src/modules/member-management/components/MemberEditModal.tsx
import React, { useState, useEffect } from 'react';
import type { AdminMemberItem } from '../models/member-management.model';
import { X, Save, User, Phone, MapPin, CheckCircle, ShieldAlert, Mail, Calendar } from 'lucide-react';

interface MemberEditModalProps {
  member: AdminMemberItem | null;
  onClose: () => void;
  onSave: (updatedMember: AdminMemberItem) => void;
}

// Helpers to format date between DD/MM/YYYY and YYYY-MM-DD for date input
const formatDDMMYYYYtoYYYYMMDD = (dStr: string) => {
  if (!dStr) return '';
  const parts = dStr.split('/');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }
  return dStr;
};

const formatYYYYMMDDtoDDMMYYYY = (dStr: string) => {
  if (!dStr) return '';
  const parts = dStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dStr;
};

export const MemberEditModal: React.FC<MemberEditModalProps> = ({
  member,
  onClose,
  onSave,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [joinedDate, setJoinedDate] = useState('');
  const [status, setStatus] = useState<'ACTIVE' | 'BLOCKED'>('ACTIVE');
  const [blockReason, setBlockReason] = useState('');

  useEffect(() => {
    if (member) {
      setFullName(member.fullName);
      setPhone(member.phone);
      setEmail(`${member.fullName.toLowerCase().replace(/\s+/g, '')}@gmail.com`);
      setAddress(member.address);
      setJoinedDate(formatDDMMYYYYtoYYYYMMDD(member.joinedDate));
      setStatus(member.status);
      setBlockReason(member.blockReason || '');
    }
  }, [member]);

  if (!member) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...member,
      fullName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      joinedDate: formatYYYYMMDDtoDDMMYYYY(joinedDate),
      status,
      blockReason: status === 'BLOCKED' ? blockReason.trim() : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl space-y-6 border border-slate-200/90 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
              Chỉnh Sửa Hồ Sơ Hội Viên
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Mã Hội Viên: <span className="text-[#11382b] font-bold">{member.memberCode}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - 2-Column Responsive Grid */}
        <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto flex-1 pr-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Full Name */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Họ và tên hội viên</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 focus:bg-white border border-slate-200/90 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:border-[#11382b] focus:ring-2 focus:ring-[#11382b]/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Số điện thoại liên hệ</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 focus:bg-white border border-slate-200/90 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:border-[#11382b] focus:ring-2 focus:ring-[#11382b]/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Email Address - Renamed to Email */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 focus:bg-white border border-slate-200/90 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:border-[#11382b] focus:ring-2 focus:ring-[#11382b]/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Operating Address */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Khu vực hoạt động</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 focus:bg-white border border-slate-200/90 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:border-[#11382b] focus:ring-2 focus:ring-[#11382b]/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Joined Date - Single column width matching Email input */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Ngày gia nhập hệ thống</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  required
                  value={joinedDate}
                  onChange={(e) => setJoinedDate(e.target.value)}
                  className="w-full bg-slate-50 focus:bg-white border border-slate-200/90 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:border-[#11382b] focus:ring-2 focus:ring-[#11382b]/10 outline-none cursor-pointer transition-all"
                />
              </div>
            </div>
          </div>

          {/* Account Status Switcher */}
          <div className="space-y-2 pt-2">
            <label className="block text-slate-700 font-bold text-xs">Trạng thái tài khoản hội viên</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus('ACTIVE')}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  status === 'ACTIVE'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-500/20 shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Đang hoạt động bình thường</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('BLOCKED')}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  status === 'BLOCKED'
                    ? 'bg-rose-50 text-rose-800 border-rose-300 ring-2 ring-rose-500/20 shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Khóa tài khoản hội viên</span>
              </button>
            </div>
          </div>

          {/* Block Reason Field if Status is Blocked */}
          {status === 'BLOCKED' && (
            <div className="space-y-1.5 animate-in fade-in duration-150">
              <label className="block text-rose-800 font-bold text-xs">
                Nêu rõ lý do khóa tài khoản (Gửi thông báo tới hội viên):
              </label>
              <textarea
                rows={2}
                required
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="VD: Đăng thông tin sai lệch nhiều lần, vi phạm quy định sàn..."
                className="w-full bg-rose-50/50 focus:bg-white border border-rose-200 rounded-xl p-3 text-xs text-rose-900 font-medium focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10 outline-none transition-all"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#11382b] hover:bg-[#0d2d23] text-white font-bold text-xs transition-colors shadow-2xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Lưu cập nhật hồ sơ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
