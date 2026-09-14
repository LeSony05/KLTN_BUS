// admin/src/common/components/layout/AdminHeader.tsx
import React from 'react';
import { Search, Bell, LogOut, ChevronDown } from 'lucide-react';

export const AdminHeader: React.FC = () => {
  return (
    <header className="h-18 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Search Input */}
      <div className="relative w-72 sm:w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Tìm kiếm hội viên, tin đăng..."
          className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#143D30] outline-none"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          type="button"
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
          aria-label="Thông báo"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
        </button>

        <div className="h-4 w-[1px] bg-slate-200 mx-1" />

        {/* User Pill */}
        <div className="flex items-center gap-2.5 cursor-pointer p-1.5 pl-2.5 rounded-xl hover:bg-slate-50">
          <div className="w-8 h-8 rounded-lg bg-[#143D30] text-amber-400 flex items-center justify-center font-bold text-xs shadow-xs">
            Đ
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-800 leading-none">
              Nguyễn Tấn Đông
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold mt-0.5">
              Quản trị viên
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        <button
          type="button"
          className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 cursor-pointer ml-1"
          title="Đăng xuất"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
