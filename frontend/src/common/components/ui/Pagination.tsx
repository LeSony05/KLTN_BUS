// /src/common/components/ui/Pagination.tsx
'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className={`flex items-center justify-center gap-2 py-4 ${className}`}>
      {/* Nút Trang trước */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center justify-center w-11 h-11 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        aria-label="Trang trước"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Các số trang to rõ */}
      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`dots-${index}`} className="w-10 text-center font-bold text-slate-400">
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={`min-w-[44px] h-11 px-3 rounded-xl font-bold text-base transition-all cursor-pointer select-none
              ${
                isActive
                  ? 'bg-[#143D30] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
              }
            `}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Nút Trang sau */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center justify-center w-11 h-11 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        aria-label="Trang sau"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
