// admin/src/modules/member-management/components/MemberTable.tsx
import React from 'react';
import { CheckCircle2, ShieldAlert, Eye, Lock, Unlock } from 'lucide-react';
import type { AdminMemberItem } from '../models/member-management.model';

interface MemberTableProps {
  members: AdminMemberItem[];
  onViewDetail: (member: AdminMemberItem) => void;
  onToggleLock: (member: AdminMemberItem) => void;
}

export const MemberTable: React.FC<MemberTableProps> = ({
  members,
  onViewDetail,
  onToggleLock,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4">Mã HV</th>
              <th className="py-3.5 px-4">Họ và tên</th>
              <th className="py-3.5 px-4">Số điện thoại</th>
              <th className="py-3.5 px-4">Khu vực</th>
              <th className="py-3.5 px-4">Ngày gia nhập</th>
              <th className="py-3.5 px-4 text-center">Tin đã đăng</th>
              <th className="py-3.5 px-4 text-center">Trạng thái</th>
              <th className="py-3.5 px-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-slate-600">
                  {m.memberCode}
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  {m.fullName}
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-600">{m.phone}</td>
                <td className="py-3.5 px-4 text-slate-500">{m.address}</td>
                <td className="py-3.5 px-4 text-slate-400">{m.joinedDate}</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[11px]">
                    {m.postsCount} tin
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  {m.status === 'ACTIVE' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Hoạt động</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200/60">
                      <ShieldAlert className="w-3 h-3" />
                      <span>Đang khóa</span>
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {/* Xem chi tiết */}
                    <button
                      type="button"
                      onClick={() => onViewDetail(m)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#143D30] hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Khóa / Mở khóa */}
                    <button
                      type="button"
                      onClick={() => onToggleLock(m)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        m.status === 'ACTIVE'
                          ? 'text-slate-500 hover:text-rose-600 hover:bg-rose-50'
                          : 'text-slate-500 hover:text-emerald-700 hover:bg-emerald-50'
                      }`}
                      title={m.status === 'ACTIVE' ? 'Khóa tài khoản' : 'Mở khóa'}
                    >
                      {m.status === 'ACTIVE' ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        <Unlock className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
