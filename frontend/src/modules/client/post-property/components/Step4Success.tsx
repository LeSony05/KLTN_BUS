// frontend/src/modules/client/post-property/components/Step4Success.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';

export interface Step4SuccessProps {
  title: string;
  onReset: () => void;
}

export const Step4Success: React.FC<Step4SuccessProps> = ({ title, onReset }) => {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm text-center space-y-6 max-w-lg mx-auto font-sans">
      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
          <Clock className="w-3.5 h-3.5" />
          <span>Trạng thái: PENDING (Chờ duyệt)</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Gửi Tin Kiểm Duyệt Thành Công!
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
          Tin đăng <strong className="text-slate-800 font-bold">"{title}"</strong> đã được chuyển đến Ban Quản Trị King Connect Land để duyệt trước khi hiển thị công khai.
        </p>
      </div>

      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 text-left space-y-1">
        <p className="font-bold text-slate-800">Quy trình xử lý:</p>
        <p className="text-[11px] text-slate-500">
          1. Đội ngũ kiểm duyệt sẽ rà soát nội dung & pháp lý trong vòng 15 - 30 phút.
        </p>
        <p className="text-[11px] text-slate-500">
          2. Sau khi được duyệt (`APPROVED`), tin sẽ hiển thị công khai trên danh sách tìm kiếm.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/posts" className="w-full sm:w-auto">
          <button
            type="button"
            className="w-full px-5 py-2.5 rounded-xl bg-[#143D30] hover:bg-[#0e2a20] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors"
          >
            <span>Xem danh sách tin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
        >
          Đăng thêm tin khác
        </button>
      </div>
    </div>
  );
};

export default Step4Success;
