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
} from 'lucide-react';
import { ADMIN_CONFIG } from '../../config/constants';
import { useAdminStore } from '../../config/useAdminStore';

export const AdminSidebar: React.FC = () => {
  const { isSidebarCollapsed } = useAdminStore();

  const menuItems = [
    {
      to: '/',
      label: 'Bảng điều khiển',
      icon: <LayoutDashboard className="w-5 h-5 flex-shrink-0" />,
    },
    {
      to: '/posts',
      label: 'Kiểm duyệt tin đăng',
      icon: <FileCheck2 className="w-5 h-5 flex-shrink-0" />,
      badge: '15',
      badgeColor: 'bg-amber-100 text-amber-700 border border-amber-200/80',
    },
    {
      to: '/members',
      label: 'Quản lý hội viên',
      icon: <Users className="w-5 h-5 flex-shrink-0" />,
      badge: '1.2k',
      badgeColor: 'bg-indigo-100 text-indigo-700 border border-indigo-200/80',
    },
    {
      to: '/contacts',
      label: 'Yêu cầu liên hệ',
      icon: <MessageSquareText className="w-5 h-5 flex-shrink-0" />,
      badge: '6',
      badgeColor: 'bg-amber-100 text-amber-700 border border-amber-200/80',
    },
    {
      to: '/settings',
      label: 'Cài đặt hệ thống',
      icon: <Settings className="w-5 h-5 flex-shrink-0" />,
    },
  ];

  return (
    <aside
      className={`bg-white text-slate-700 flex flex-col flex-shrink-0 border-r border-slate-100 min-h-screen select-none ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header (FreeDash Clean) */}
      <div className="h-16 flex items-center bg-white border-b border-slate-100/50">
        {/* Fixed 80px width container for logo icon - never shifts */}
        <div className="w-20 h-16 flex items-center justify-center flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        {!isSidebarCollapsed && (
          <div className="flex flex-col min-w-0 pr-4">
            <div className="text-base font-extrabold tracking-tight truncate">
              <span className="text-slate-900">King</span>
              <span className="text-indigo-600">Connect</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase truncate">
              QUẢN TRỊ HỆ THỐNG
            </span>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {!isSidebarCollapsed && (
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-2 pb-2">
            CHỨC NĂNG QUẢN LÝ
          </p>
        )}

        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            title={isSidebarCollapsed ? item.label : undefined}
            className={({ isActive }) =>
              `flex items-center text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold shadow-md shadow-indigo-500/25'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600 font-medium'
              } ${
                isSidebarCollapsed
                  ? 'w-10 h-10 mx-auto justify-center rounded-xl p-0'
                  : 'px-3 py-3 justify-between rounded-2xl'
              }`
            }
          >
            {isSidebarCollapsed ? (
              <span className="flex items-center justify-center flex-shrink-0">{item.icon}</span>
            ) : (
              <>
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-8 flex items-center justify-center flex-shrink-0">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-100">
        <a
          href={ADMIN_CONFIG.MAIN_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          title={isSidebarCollapsed ? 'Mở Website User' : undefined}
          className={`flex items-center bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 text-xs font-semibold border border-slate-200/60 transition-colors ${
            isSidebarCollapsed
              ? 'w-10 h-10 mx-auto justify-center rounded-xl p-0'
              : 'px-3 py-3 gap-3 rounded-2xl'
          }`}
        >
          <span className={isSidebarCollapsed ? '' : 'w-8 flex items-center justify-center flex-shrink-0'}>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </span>
          {!isSidebarCollapsed && <span className="truncate">Mở Website User</span>}
        </a>
      </div>
    </aside>
  );
};
