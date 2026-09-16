// admin/src/modules/contact-management/components/ContactItemCard.tsx
import React from 'react';
import { Phone, Mail } from 'lucide-react';
import type { AdminContactItem } from '../models/contact-management.model';
import type { ContactStatus } from '../../../common/config/enums';

interface ContactItemCardProps {
  contact: AdminContactItem;
  onUpdateStatus: (id: string, status: ContactStatus) => void;
}

export const ContactItemCard: React.FC<ContactItemCardProps> = ({
  contact,
  onUpdateStatus,
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm text-slate-900">
            {contact.fullName}
          </span>
          <span className="text-slate-300">·</span>
          <span className="flex items-center gap-1 text-xs text-slate-600 font-semibold">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            {contact.phone}
          </span>
          {contact.email && (
            <>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {contact.email}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400">{contact.createdAt}</span>
          <select
            value={contact.status}
            onChange={(e) => onUpdateStatus(contact.id, e.target.value as ContactStatus)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border outline-none cursor-pointer ${
              contact.status === 'PENDING'
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : contact.status === 'IN_PROGRESS'
                ? 'bg-sky-50 text-sky-800 border-sky-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            <option value="PENDING">Chưa xử lý</option>
            <option value="IN_PROGRESS">Đang xử lý</option>
            <option value="RESOLVED">Đã hoàn tất</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
        <p className="text-xs font-bold text-[#143D30] mb-1">
          Tiêu đề: {contact.subject}
        </p>
        <p className="text-xs text-slate-700 leading-relaxed">{contact.message}</p>
      </div>
    </div>
  );
};
