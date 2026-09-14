// frontend/src/modules/client/home/components/CTASection.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, ArrowRight } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-[#113327] text-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          Bạn Đang Có Nhu Cầu Tìm Mua Hoặc Thuê Bất Động Sản?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Đăng nhu cầu ngay hôm nay để nhận thông tin báo giá và liên hệ trực tiếp từ hàng nghìn hội viên môi giới uy tín trong hệ thống King Connect Land.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/post-property/create">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>ĐĂNG NHU CẦU NGAY (MIỄN PHÍ)</span>
            </button>
          </Link>

          <Link href="/register">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>ĐĂNG KÝ HỘI VIÊN CHÍNH THỨC</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
