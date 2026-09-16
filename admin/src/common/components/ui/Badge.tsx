// admin/src/common/components/ui/Badge.tsx
import React from 'react';

export type BadgeVariant =
  | 'buy'          // Cần Mua
  | 'rent'         // Cần Thuê
  | 'pending'      // Chờ duyệt
  | 'approved'     // Đã duyệt
  | 'rejected'     // Từ chối
  | 'active'       // Hoạt động
  | 'locked'       // Đã khóa
  | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  buy: 'bg-emerald-50 text-emerald-800 border-emerald-300/80',
  rent: 'bg-sky-50 text-sky-800 border-sky-300/80',
  pending: 'bg-amber-50 text-amber-800 border-amber-300/80',
  approved: 'bg-emerald-50 text-emerald-800 border-emerald-300/80',
  rejected: 'bg-rose-50 text-rose-800 border-rose-300/80',
  active: 'bg-emerald-50 text-emerald-800 border-emerald-300/80',
  locked: 'bg-slate-100 text-slate-700 border-slate-300/80',
  default: 'bg-slate-50 text-slate-700 border-slate-300/80',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  icon,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap flex-shrink-0 shadow-2xs ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="flex-shrink-0 w-3.5 h-3.5">{icon}</span>}
      <span className="whitespace-nowrap leading-none">{children}</span>
    </span>
  );
};
