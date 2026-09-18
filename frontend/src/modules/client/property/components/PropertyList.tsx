// frontend/src/modules/client/property/components/PropertyList.tsx
'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  SlidersHorizontal,
  ArrowUpDown,
  X,
  Inbox,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { PropertyDemand, PropertyFilterState } from '../models/property.model';
import { INITIAL_FILTER_STATE } from '../models/property.model';
import { PropertyFilterSidebar } from './PropertyFilterSidebar';
import { PropertyCard } from './PropertyCard';
import { QuoteModal } from './QuoteModal';
import { PropertySearchForm } from './PropertySearchForm';
import { Breadcrumb } from '@/common/components/ui/Breadcrumb';

interface PropertyListProps {
  initialPosts: PropertyDemand[];
}

const ITEMS_PER_PAGE = 9;

const getTimeSlotFromDeparture = (departure?: string) => {
  const hour = Number(departure?.match(/\d{1,2}/)?.[0]);
  if (Number.isNaN(hour)) return '';
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  if (hour < 23) return 'evening';
  return 'night';
};

const PropertyListContent: React.FC<PropertyListProps> = ({ initialPosts }) => {
  const searchParams = useSearchParams();
  const urlNeedType = searchParams?.get('needType');
  const urlCategory = searchParams?.get('category') || searchParams?.get('type');
  const urlKeyword = searchParams?.get('keyword');
  const urlDirection = searchParams?.get('direction');

  const [filters, setFilters] = useState<PropertyFilterState>(() => ({
    ...INITIAL_FILTER_STATE,
    needType: (urlNeedType === 'BUY' || urlNeedType === 'RENT') ? urlNeedType : 'ALL',
    propertyType: urlCategory || '',
    keyword: urlKeyword || '',
    direction: urlDirection || '',
  }));

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [quotePost, setQuotePost] = useState<PropertyDemand | null>(null);

  // Filter and sort logic
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // 1. NeedType filter
      if (filters.needType !== 'ALL' && post.needType !== filters.needType) {
        return false;
      }

      // 2. Keyword search
      if (filters.keyword.trim()) {
        const query = filters.keyword.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(query);
        const matchLocation = post.location.toLowerCase().includes(query);
        const matchDesc = post.description?.toLowerCase().includes(query);
        const matchType = post.propertyType.toLowerCase().includes(query);
        if (!matchTitle && !matchLocation && !matchDesc && !matchType) return false;
      }

      // 3. Property type
      if (filters.propertyType && !post.propertyType.toLowerCase().includes(filters.propertyType.toLowerCase())) {
        return false;
      }

      // 4. Province
      if (filters.province && !post.province.toLowerCase().includes(filters.province.toLowerCase()) && !post.location.toLowerCase().includes(filters.province.toLowerCase())) {
        return false;
      }

      // 5. Price Range Filter
      if (filters.direction && getTimeSlotFromDeparture(post.direction) !== filters.direction) {
        return false;
      }

      // 6. Price Range Filter
      if (filters.priceRange) {
        const [minStr, maxStr] = filters.priceRange.split('-');
        const min = Number(minStr) || 0;
        const max = Number(maxStr) || 999999;
        if (post.minPriceNum !== undefined && post.maxPriceNum !== undefined) {
          if (post.maxPriceNum < min || post.minPriceNum > max) return false;
        }
      }

      // 7. Area Range Filter
      if (filters.areaRange) {
        const [minStr, maxStr] = filters.areaRange.split('-');
        const min = Number(minStr) || 0;
        const max = Number(maxStr) || 999999;
        if (post.minAreaNum !== undefined) {
          if (post.minAreaNum < min || post.minAreaNum > max) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'PRICE_ASC') {
        return (a.minPriceNum || 0) - (b.minPriceNum || 0);
      }
      if (filters.sortBy === 'PRICE_DESC') {
        return (b.maxPriceNum || 0) - (a.maxPriceNum || 0);
      }
      if (filters.sortBy === 'AREA_DESC') {
        return (b.minAreaNum || 0) - (a.minAreaNum || 0);
      }
      // Default: NEWEST
      return Number(b.id) - Number(a.id);
    });
  }, [initialPosts, filters]);

  // Active filters list for chips
  const activeChips = useMemo(() => {
    const chips: { label: string; key: keyof PropertyFilterState }[] = [];
    if (filters.needType !== 'ALL') {
      chips.push({
        label: filters.needType === 'BUY' ? 'Đặt vé' : 'Gửi hàng',
        key: 'needType',
      });
    }
    if (filters.keyword) {
      chips.push({ label: `Từ khóa: "${filters.keyword}"`, key: 'keyword' });
    }
    if (filters.propertyType) {
      chips.push({ label: `Loại: ${filters.propertyType}`, key: 'propertyType' });
    }
    if (filters.province) {
      chips.push({ label: `Tỉnh/Thành: ${filters.province}`, key: 'province' });
    }
    if (filters.priceRange) {
      chips.push({ label: `Khoảng giá`, key: 'priceRange' });
    }
    if (filters.direction) {
      const labels: Record<string, string> = {
        morning: 'Sáng',
        afternoon: 'Chiều',
        evening: 'Tối',
        night: 'Đêm',
      };
      chips.push({ label: `Khung giờ: ${labels[filters.direction] || filters.direction}`, key: 'direction' });
    }
    if (filters.areaRange) {
      chips.push({ label: `Ghế trống / khối lượng`, key: 'areaRange' });
    }
    return chips;
  }, [filters]);

  const removeFilterChip = (key: keyof PropertyFilterState) => {
    setFilters((prev) => ({
      ...prev,
      [key]: INITIAL_FILTER_STATE[key],
    }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTER_STATE);
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5 font-sans space-y-4 bg-[#F8FAF9]">
      {/* Breadcrumb Navigation Trail */}
      <Breadcrumb
        items={[
          { label: filters.needType === 'BUY' ? 'Danh sách chuyến xe' : filters.needType === 'RENT' ? 'Dịch vụ gửi hàng' : 'Tất cả chuyến xe và dịch vụ' },
        ]}
      />

      <PropertySearchForm />

      <div className="bg-white rounded-lg border border-slate-200 p-4 md:p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-950">
              {filters.needType === 'RENT' ? 'Dịch vụ gửi hàng theo tuyến' : 'Chọn chuyến xe phù hợp'}
            </h1>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              So sánh giờ đi, loại xe, số ghế trống, giá vé và chính sách trước khi chọn chỗ.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2">
              <p className="text-base font-black text-brand">{filteredPosts.length}</p>
              <p className="text-[10px] font-bold text-emerald-800">kết quả</p>
            </div>
            <div className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2">
              <p className="text-base font-black text-amber-700">10p</p>
              <p className="text-[10px] font-bold text-amber-800">giữ ghế</p>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
              <p className="text-base font-black text-slate-800">QR</p>
              <p className="text-[10px] font-bold text-slate-500">vé điện tử</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filter + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 xl:gap-8 items-start relative">
        {/* Desktop Sticky Sidebar (1 Col) */}
        <div className="hidden lg:block lg:col-span-1 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-1 z-10">
          <PropertyFilterSidebar
            filters={filters}
            onFilterChange={(newFilters) => {
              setFilters(newFilters);
              setCurrentPage(1);
            }}
            onReset={handleResetFilters}
            totalCount={filteredPosts.length}
          />
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <SlidersHorizontal className="w-4 h-4 text-brand" />
            <span>Bộ lọc tìm kiếm ({activeChips.length})</span>
          </div>
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="px-3 py-1.5 rounded-xl bg-brand text-white text-xs font-bold flex items-center gap-1 shadow-sm cursor-pointer"
          >
            <span>{mobileFilterOpen ? 'Đóng bộ lọc' : 'Mở bộ lọc'}</span>
          </button>
        </div>

        {/* Mobile Filter Expandable Panel */}
        {mobileFilterOpen && (
          <div className="lg:hidden col-span-1">
            <PropertyFilterSidebar
              filters={filters}
              onFilterChange={(newFilters) => {
                setFilters(newFilters);
                setCurrentPage(1);
              }}
              onReset={handleResetFilters}
              totalCount={filteredPosts.length}
            />
          </div>
        )}

        {/* Post Results List (3 Cols of Grid - Each Row has 3 Cards on XL) */}
        <div className="lg:col-span-3 space-y-5">
          {/* Top Bar: Total Count + Sort Dropdown */}
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">
                Tìm thấy <strong className="text-brand font-black text-sm">{filteredPosts.length}</strong> chuyến/dịch vụ phù hợp
              </span>
            </div>

            {/* Sort selection */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span>Sắp xếp:</span>
              </span>
              <select
                value={filters.sortBy}
                onChange={(e) => {
                  setFilters({ ...filters, sortBy: e.target.value as PropertyFilterState['sortBy'] });
                  setCurrentPage(1);
                }}
                className="px-3 py-1.5 text-xs font-bold text-slate-800 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand cursor-pointer"
              >
                <option value="NEWEST">Mới cập nhật</option>
                <option value="PRICE_ASC">Giá tăng dần</option>
                <option value="PRICE_DESC">Giá giảm dần</option>
                <option value="AREA_DESC">Nhiều ghế nhất</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
              <span className="text-[11px] font-bold text-brand uppercase tracking-wider">
                Đang lọc:
              </span>
              {activeChips.map((chip) => (
                <span
                  key={chip.key}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs"
                >
                  <span>{chip.label}</span>
                  <button
                    type="button"
                    onClick={() => removeFilterChip(chip.key)}
                    className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-bold text-rose-600 hover:underline ml-auto cursor-pointer"
              >
                Xóa tất cả
              </button>
            </div>
          )}

          {/* Trip rows */}
          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {paginatedPosts.map((post) => (
                <PropertyCard
                  key={post.id}
                  post={post}
                  onOpenQuote={(p) => setQuotePost(p)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Inbox className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900">
                  Không tìm thấy chuyến xe phù hợp
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Rất tiếc, hiện tại không có chuyến hoặc dịch vụ nào phù hợp với bộ lọc tìm kiếm của bạn. Hãy thử nới lỏng hoặc đặt lại bộ lọc.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-brand text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm hover:bg-brand-hover transition-colors cursor-pointer"
              >
                <span>Đặt lại tất cả bộ lọc</span>
              </button>
            </div>
          )}

          {/* Compact Pagination styled EXACTLY like user reference image */}
          <div className="flex items-center justify-center gap-2 pt-6 pb-2">
            {/* Previous Arrow */}
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Trang trước"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1.5">
              {(() => {
                const getPageNumbers = (current: number, total: number) => {
                  if (total <= 7) {
                    return Array.from({ length: total }, (_, i) => i + 1);
                  }
                  const pages: (number | string)[] = [];
                  if (current <= 4) {
                    pages.push(1, 2, 3, 4, 5, '...', total);
                  } else if (current >= total - 3) {
                    pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
                  } else {
                    pages.push(1, '...', current - 1, current, current + 1, '...', total);
                  }
                  return pages;
                };

                return getPageNumbers(currentPage, totalPages).map((item, idx) => {
                  if (typeof item === 'string') {
                    return (
                      <span key={`dots-${idx}`} className="w-5 h-7 flex items-center justify-center text-slate-400 text-xs font-bold tracking-widest select-none">
                        ...
                      </span>
                    );
                  }
                  const isCurrent = currentPage === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCurrentPage(item)}
                      className={`w-7 h-7 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                        isCurrent
                          ? 'bg-brand text-white font-bold shadow-2xs'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/70'
                      }`}
                    >
                      {item}
                    </button>
                  );
                });
              })()}
            </div>

            {/* Next Arrow in soft gray square */}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-7 h-7 rounded-md bg-slate-100 hover:bg-slate-200/80 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer ml-0.5"
              title="Trang sau"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Quote Modal Popup */}
      <QuoteModal
        post={quotePost}
        isOpen={!!quotePost}
        onClose={() => setQuotePost(null)}
      />
    </div>
  );
};

export const PropertyList: React.FC<PropertyListProps> = (props) => {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Đang tải danh sách tin...</div>}>
      <PropertyListContent {...props} />
    </Suspense>
  );
};

export default PropertyList;
