// frontend/src/modules/client/abouts/AboutClient.tsx
'use client';

import React from 'react';
import { Target, Award, Users, Building2 } from 'lucide-react';
import { Breadcrumb } from '@/common/components/ui/Breadcrumb';

export const AboutClient: React.FC = () => {
  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4 font-sans">
      <Breadcrumb items={[{ label: 'Về chúng tôi' }]} />

      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#143D30] text-xs font-bold border border-emerald-200">
            <Building2 className="w-4 h-4" />
            <span>Về Chúng Tôi</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hội Bất Động Sản King Connect Land
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Nền tảng kết nối nhu cầu BĐS trực tiếp, loại bỏ tin rác và tối ưu hiệu quả giao dịch cho hội viên.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#143D30] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Sứ Mệnh</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Xây dựng một môi trường kết nối minh bạch, nơi người có nhu cầu thực tế và nhà môi giới chuyên nghiệp gặp nhau nhanh nhất.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Tầm Nhìn</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Trở thành mạng lưới kết nối nhu cầu bất động sản uy tín và có lượng giao dịch thực tế hàng đầu tại Việt Nam.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#143D30] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Giá Trị Cốt Lõi</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Minh bạch — Xác thực — Tốc độ — Đồng hành cùng phát triển bền vững của cộng đồng hội viên.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
