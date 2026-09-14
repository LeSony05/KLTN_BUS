// frontend/src/modules/client/property/components/PropertyFilterSidebar.tsx
'use client';

import React from 'react';
import {
  Search,
  Filter,
  RotateCcw,
  Building2,
  MapPin,
  Coins,
  Ruler,
} from 'lucide-react';
import type { PropertyFilterState } from '../models/property.model';

interface PropertyFilterSidebarProps {
  filters: PropertyFilterState;
  onFilterChange: (filters: PropertyFilterState) => void;
  onReset: () => void;
  totalCount?: number;
}

const PROPERTY_TYPES = [
  'Tất cả loại BĐS',
  'Đất thổ cư / Đất nền',
  'Nhà phố',
  'Căn hộ chung cư',
  'Mặt bằng kinh doanh',
  'Kho xưởng',
  'Biệt thự',
  'Shophouse',
  'Đất vườn / Trang trại',
];

const PROVINCES = [
  'Tất cả Tỉnh/Thành',
  'Hồ Chí Minh',
  'Hà Nội',
  'Đà Nẵng',
  'Bình Dương',
  'Đồng Nai',
  'Lâm Đồng',
  'Long An',
  'Bà Rịa - Vũng Tàu',
  'Cần Thơ',
];

const PRICE_RANGES_BUY = [
  { label: 'Tất cả mức giá', value: '' },
  { label: 'Dưới 1 tỷ', value: '0-1000' },
  { label: '1 - 3 tỷ', value: '1000-3000' },
  { label: '3 - 5 tỷ', value: '3000-5000' },
  { label: '5 - 10 tỷ', value: '5000-10000' },
  { label: '10 - 20 tỷ', value: '10000-20000' },
  { label: 'Trên 20 tỷ', value: '20000-999999' },
];

const PRICE_RANGES_RENT = [
  { label: 'Tất cả mức giá', value: '' },
  { label: 'Dưới 5 triệu/tháng', value: '0-5' },
  { label: '5 - 10 triệu/tháng', value: '5-10' },
  { label: '10 - 20 triệu/tháng', value: '10-20' },
  { label: '20 - 40 triệu/tháng', value: '20-40' },
  { label: 'Trên 40 triệu/tháng', value: '40-9999' },
];

const AREA_RANGES = [
  { label: 'Tất cả diện tích', value: '' },
  { label: 'Dưới 30 m²', value: '0-30' },
  { label: '30 - 50 m²', value: '30-50' },
  { label: '50 - 80 m²', value: '50-80' },
  { label: '80 - 150 m²', value: '80-150' },
  { label: '150 - 300 m²', value: '150-300' },
  { label: 'Trên 300 m²', value: '300-99999' },
];

export const PropertyFilterSidebar: React.FC<PropertyFilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const handleChange = (key: keyof PropertyFilterState, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const isRent = filters.needType === 'RENT';
  const priceOptions = isRent ? PRICE_RANGES_RENT : PRICE_RANGES_BUY;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#143D30]" />
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
            Bộ lọc tìm kiếm
          </h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Đặt lại</span>
        </button>
      </div>

      {/* Type Toggle: Tất cả / Cần Mua / Cần Thuê */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700">Phân loại tin đăng</label>
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => handleChange('needType', 'ALL')}
            className={`py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              filters.needType === 'ALL'
                ? 'bg-[#143D30] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => handleChange('needType', 'BUY')}
            className={`py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              filters.needType === 'BUY'
                ? 'bg-[#143D30] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cần mua
          </button>
          <button
            type="button"
            onClick={() => handleChange('needType', 'RENT')}
            className={`py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              filters.needType === 'RENT'
                ? 'bg-[#143D30] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cần thuê
          </button>
        </div>
      </div>

      {/* Keyword Search */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700">Từ khóa tìm kiếm</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.keyword}
            onChange={(e) => handleChange('keyword', e.target.value)}
            placeholder="Khu vực, loại nhà đất, đường..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#143D30] focus:border-transparent"
          />
        </div>
      </div>

      {/* Property Type */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-[#143D30]" />
          <span>Loại bất động sản</span>
        </label>
        <select
          value={filters.propertyType}
          onChange={(e) => handleChange('propertyType', e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#143D30] focus:border-transparent text-slate-700 font-medium"
        >
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type === 'Tất cả loại BĐS' ? '' : type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Province */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-rose-500" />
          <span>Tỉnh / Thành phố</span>
        </label>
        <select
          value={filters.province}
          onChange={(e) => handleChange('province', e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#143D30] focus:border-transparent text-slate-700 font-medium"
        >
          {PROVINCES.map((p) => (
            <option key={p} value={p === 'Tất cả Tỉnh/Thành' ? '' : p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Coins className="w-3.5 h-3.5 text-amber-600" />
          <span>Khoảng ngân sách</span>
        </label>
        <select
          value={filters.priceRange}
          onChange={(e) => handleChange('priceRange', e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#143D30] focus:border-transparent text-slate-700 font-medium"
        >
          {priceOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* Area Range */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Ruler className="w-3.5 h-3.5 text-emerald-600" />
          <span>Khoảng diện tích</span>
        </label>
        <select
          value={filters.areaRange}
          onChange={(e) => handleChange('areaRange', e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#143D30] focus:border-transparent text-slate-700 font-medium"
        >
          {AREA_RANGES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PropertyFilterSidebar;
