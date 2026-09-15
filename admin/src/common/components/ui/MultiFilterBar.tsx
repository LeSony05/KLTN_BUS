// admin/src/common/components/ui/MultiFilterBar.tsx
import React from 'react';
import { Search, RotateCcw, Calendar } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterGroup {
  key: string;
  label: string;
  options: FilterOption[];
  value: string;
}

interface MultiFilterBarProps {
  searchKeyword: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterGroups?: FilterGroup[];
  onFilterChange?: (key: string, value: string) => void;
  // Date Range Filtering
  showDateFilter?: boolean;
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
  onResetFilters?: () => void;
  extraActions?: React.ReactNode;
}

export const MultiFilterBar: React.FC<MultiFilterBarProps> = ({
  searchKeyword,
  onSearchChange,
  searchPlaceholder = 'Tìm kiếm từ khóa...',
  filterGroups = [],
  onFilterChange,
  showDateFilter = false,
  startDate = '',
  endDate = '',
  onStartDateChange,
  onEndDateChange,
  onResetFilters,
  extraActions,
}) => {
  const hasActiveFilter =
    searchKeyword.trim() !== '' ||
    filterGroups.some((group) => group.value !== '' && group.value !== 'ALL') ||
    startDate !== '' ||
    endDate !== '';

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
      {/* Top Row: Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-2.5 text-sm font-normal text-slate-700 placeholder:text-slate-400 focus:border-[#11382b] focus:ring-2 focus:ring-[#11382b]/10 outline-none transition-all shadow-2xs"
          />
        </div>

        {extraActions && <div className="flex-shrink-0">{extraActions}</div>}
      </div>

      {/* Bottom Row: Filter Dropdowns & Date Pickers with Labels ABOVE controls */}
      <div className="flex flex-wrap items-end gap-4 pt-1">
        {/* Dynamic Select Filters */}
        {filterGroups.map((group) => (
          <div key={group.key} className="flex-1 sm:flex-none min-w-[190px]">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {group.label}
            </label>
            <select
              value={group.value}
              onChange={(e) => onFilterChange && onFilterChange(group.key, e.target.value)}
              className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm font-normal text-slate-700 focus:border-[#11382b] focus:ring-2 focus:ring-[#11382b]/10 outline-none cursor-pointer transition-all shadow-2xs"
            >
              {group.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Date Range Pickers (Từ ngày - Đến ngày) with Labels ABOVE */}
        {showDateFilter && (
          <>
            <div className="flex-1 sm:flex-none min-w-[160px]">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Từ ngày
              </label>
              <div className="flex items-center gap-2 bg-slate-50 focus-within:bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-2xs transition-all focus-within:border-[#11382b] focus-within:ring-2 focus-within:ring-[#11382b]/10">
                <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => onStartDateChange && onStartDateChange(e.target.value)}
                  className="bg-transparent text-sm font-normal text-slate-700 focus:outline-none cursor-pointer w-full"
                />
              </div>
            </div>

            <div className="flex-1 sm:flex-none min-w-[160px]">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Đến ngày
              </label>
              <div className="flex items-center gap-2 bg-slate-50 focus-within:bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-2xs transition-all focus-within:border-[#11382b] focus-within:ring-2 focus-within:ring-[#11382b]/10">
                <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => onEndDateChange && onEndDateChange(e.target.value)}
                  className="bg-transparent text-sm font-normal text-slate-700 focus:outline-none cursor-pointer w-full"
                />
              </div>
            </div>
          </>
        )}

        {/* Reset Filter Button */}
        {hasActiveFilter && onResetFilters && (
          <div className="pb-0.5 ml-auto sm:ml-0">
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/60 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              title="Đặt lại tất cả bộ lọc"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa bộ lọc</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
