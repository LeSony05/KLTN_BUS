// frontend/src/modules/client/donate/DonateClient.tsx
'use client';

import React from 'react';
import { Building2, Heart } from 'lucide-react';

export const DonateClient: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto my-12 px-4 font-sans space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
          <Heart className="w-4 h-4 text-amber-600 fill-amber-600" />
          <span>Quỹ Đóng Góp Tự Nguyện</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Đóng Góp Xây Dựng Hội King Connect Land
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Mọi khoản đóng góp của quý hội viên đều được quản lý minh bạch và sử dụng để duy trì máy chủ, nâng cấp hệ thống kết nối BĐS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tài khoản 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#143D30] border-b border-slate-100 pb-3">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>Tài Khoản Số 1 (Vietcombank)</span>
          </div>
          <div className="space-y-2.5 text-xs text-slate-700">
            <p className="flex justify-between">
              <span className="text-slate-400 font-medium">Ngân hàng:</span>
              <strong className="text-slate-900">Vietcombank</strong>
            </p>
            <p className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Số tài khoản:</span>
              <strong className="text-base font-mono font-extrabold text-amber-700">
                1029384756
              </strong>
            </p>
            <p className="flex justify-between">
              <span className="text-slate-400 font-medium">Chủ tài khoản:</span>
              <strong className="text-slate-900">NGUYEN TAN DONG</strong>
            </p>
            <p className="flex justify-between">
              <span className="text-slate-400 font-medium">Chi nhánh:</span>
              <strong className="text-slate-900">TP. Hồ Chí Minh</strong>
            </p>
          </div>
        </div>

        {/* Tài khoản 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#143D30] border-b border-slate-100 pb-3">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>Tài Khoản Số 2 (MB Bank)</span>
          </div>
          <div className="space-y-2.5 text-xs text-slate-700">
            <p className="flex justify-between">
              <span className="text-slate-400 font-medium">Ngân hàng:</span>
              <strong className="text-slate-900">MB Bank</strong>
            </p>
            <p className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Số tài khoản:</span>
              <strong className="text-base font-mono font-extrabold text-amber-700">
                888899998888
              </strong>
            </p>
            <p className="flex justify-between">
              <span className="text-slate-400 font-medium">Chủ tài khoản:</span>
              <strong className="text-slate-900">HOI BĐS KING CONNECT LAND</strong>
            </p>
            <p className="flex justify-between">
              <span className="text-slate-400 font-medium">Chi nhánh:</span>
              <strong className="text-slate-900">Hội sở chính</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
