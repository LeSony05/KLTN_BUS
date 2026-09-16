// admin/src/common/components/layout/AdminHeader.tsx
import React from 'react';
import { Bell, LogOut, ChevronDown, PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import { useAdminStore } from '../../config/useAdminStore';

export const AdminHeader: React.FC = () => {
  const { isSidebarCollapsed, toggleSidebar } = useAdminStore();

  return (
    <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left Area: Toggle Sidebar Button */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-colors cursor-pointer"
          title={isSidebarCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="w-5 h-5 text-indigo-600" />
          ) : (
            <PanelLeftClose className="w-5 h-5 text-slate-500" />
          )}
        </button>
        <span className="text-xs font-bold text-slate-400 hidden sm:inline tracking-wide">
          Hệ Thống Quản Trị King Connect Land
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3.5">
        {/* Notifications */}
        <button
          type="button"
          className="relative p-2.5 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-colors cursor-pointer"
          aria-label="Thông báo"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-white" />
        </button>

        <div className="h-5 w-[1px] bg-slate-200/80 mx-1" />

        {/* FreeDash Style User Profile Pill */}
        <div className="flex items-center gap-3 cursor-pointer p-1.5 pl-3 rounded-2xl hover:bg-slate-50 transition-colors">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            Đ
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[11px] text-slate-400 font-medium">
              Xin chào, <strong className="text-slate-800 font-bold">Nguyễn Tấn Đông</strong>
            </span>
            <span className="text-[10px] text-indigo-600 font-bold mt-0.5">
              Quản trị viên hệ thống
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>

        {/* Logout Button */}
        <button
          type="button"
          className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer ml-1"
          title="Đăng xuất"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
