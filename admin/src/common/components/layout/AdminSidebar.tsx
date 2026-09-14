// admin/src/common/components/layout/AdminSidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileCheck2,
  MessageSquareText,
  Settings,
  Building2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { ADMIN_CONFIG } from '../../config/constants';

export const AdminSidebar: React.FC = () => {
  const menuItems = [
    {
      to: '/',
      label: 'Bảng điều khiển',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      to: '/posts',
      label: 'Kiểm duyệt tin đăng',
      icon: <FileCheck2 className="w-4 h-4" />,
      badge: '15',
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    },
    {
      to: '/members',
      label: 'Quản lý hội viên',
      icon: <Users className="w-4 h-4" />,
      badge: '1.2k',
      badgeColor: 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40',
    },
    {
      to: '/contacts',
      label: 'Yêu cầu liên hệ',
      icon: <MessageSquareText className="w-4 h-4" />,
      badge: '6',
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    },
    {
      to: '/settings',
      label: 'Cài đặt hệ thống',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-64 bg-[#113327] text-slate-200 flex flex-col flex-shrink-0 border-r border-emerald-950 min-h-screen">
      {/* Brand Header */}
      <div className="h-18 px-5 border-b border-emerald-900/50 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-[#113327] flex items-center justify-center font-bold shadow-sm">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-bold tracking-tight">
              <span className="text-white">King</span>{' '}
              <span className="text-amber-400">Connect</span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-400 tracking-wider uppercase">
              Quản Trị Hệ Thống
            </span>
          </div>
        </div>

        <span className="p-1 rounded-md bg-emerald-950/60 text-emerald-400" title="Bảo mật">
          <ShieldCheck className="w-4 h-4" />
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="text-[11px] font-bold text-emerald-400/60 uppercase tracking-wider px-3 pt-3 pb-1">
          Chức Năng Quản Lý
        </p>

        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                isActive
                  ? 'bg-[#143D30] text-white border border-emerald-700/50 shadow-sm'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <div className="flex items-center gap-2.5">
              <span className="flex-shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </div>

            {item.badge && (
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${item.badgeColor}`}
              >
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="p-3 border-t border-emerald-900/50">
        <a
          href={ADMIN_CONFIG.MAIN_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/80 text-amber-400 hover:text-amber-300 text-xs font-semibold border border-emerald-900/40"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Mở Website User</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">KC Land</span>
        </a>
      </div>
    </aside>
  );
};
