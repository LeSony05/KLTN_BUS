// frontend/src/modules/client/home/components/HeroClient.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Building, KeyRound, MapPin } from 'lucide-react';

export interface HeroClientProps {
  activeSearchTab: 'BUY' | 'RENT';
  setActiveSearchTab: (tab: 'BUY' | 'RENT') => void;
  selectedProvince: string;
  setSelectedProvince: (val: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (val: string) => void;
  selectedType: string;
  setSelectedType: (val: string) => void;
  selectedPrice: string;
  setSelectedPrice: (val: string) => void;
}

export const HeroClient: React.FC<HeroClientProps> = ({
  activeSearchTab,
  setActiveSearchTab,
  selectedProvince,
  setSelectedProvince,
  selectedDistrict,
  setSelectedDistrict,
  selectedType,
  setSelectedType,
  selectedPrice,
  setSelectedPrice,
}) => {
  return (
    <section className="relative bg-[#113327] text-white pt-12 pb-24 sm:pb-28 overflow-hidden">
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-emerald-800/10 pointer-events-none blur-3xl" />
      <div className="absolute -left-24 bottom-0 w-80 h-80 rounded-full bg-amber-500/10 pointer-events-none blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
        {/* Badge Giới thiệu */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-400 text-xs font-bold border border-white/10">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>Sàn Kết Nối Bất Động Sản Trực Tiếp</span>
        </div>

        {/* Tiêu đề chính */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight leading-[1.15] max-w-3xl mx-auto">
          Kết Nối Trực Tiếp{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
            Cần Mua & Cần Thuê
          </span>{' '}
          BĐS Hiệu Quả
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Nền tảng chuyên biệt giúp hội viên đăng và tìm kiếm bất động sản <strong className="text-white">CẦN MUA</strong> và{' '}
          <strong className="text-white">CẦN THUÊ</strong> trên toàn quốc, loại bỏ tin rác.
        </p>
      </div>

      {/* KHỐI TÌM KIẾM NỔI */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 text-slate-900 border border-slate-100">
          {/* 2 Tab: CẦN MUA & CẦN THUÊ */}
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <button
              type="button"
              onClick={() => setActiveSearchTab('BUY')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer ${
                activeSearchTab === 'BUY'
                  ? 'bg-[#143D30] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>CẦN MUA</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSearchTab('RENT')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer ${
                activeSearchTab === 'RENT'
                  ? 'bg-[#143D30] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>CẦN THUÊ</span>
            </button>
          </div>

          {/* Form 4 ô Select + 1 Nút Tìm kiếm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Tỉnh / Thành phố
              </label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#143D30] focus:bg-white cursor-pointer"
              >
                <option value="">Tất cả tỉnh thành</option>
                <option value="79">TP. Hồ Chí Minh</option>
                <option value="01">Hà Nội</option>
                <option value="48">Đà Nẵng</option>
                <option value="74">Bình Dương</option>
                <option value="75">Đồng Nai</option>
                <option value="77">Bà Rịa - Vũng Tàu</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Quận / Huyện
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#143D30] focus:bg-white cursor-pointer"
              >
                <option value="">Tất cả quận huyện</option>
                <option value="q1">Quận 1</option>
                <option value="q7">Quận 7</option>
                <option value="thuduc">TP. Thủ Đức</option>
                <option value="binhthanh">Bình Thạnh</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Loại Bất Động Sản
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#143D30] focus:bg-white cursor-pointer"
              >
                <option value="">Tất cả loại BĐS</option>
                <option value="RESIDENTIAL_LAND">Đất thổ cư / Đất nền</option>
                <option value="TOWNHOUSE">Nhà phố / Nhà riêng</option>
                <option value="VILLA">Biệt thự / Liền kề</option>
                <option value="APARTMENT">Căn hộ / Chung cư</option>
                <option value="COMMERCIAL">Mặt bằng kinh doanh</option>
                <option value="WAREHOUSE">Kho / Nhà xưởng</option>
                <option value="AGRICULTURAL_LAND">Đất vườn / Nông nghiệp</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Khoảng ngân sách
              </label>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#143D30] focus:bg-white cursor-pointer"
              >
                <option value="">Tất cả mức giá</option>
                <option value="0-2">Dưới 2 tỷ / 10 triệu</option>
                <option value="2-5">2 - 5 tỷ / 10 - 25 triệu</option>
                <option value="5-10">5 - 10 tỷ / 25 - 50 triệu</option>
                <option value="10-20">10 - 20 tỷ / 50 - 100 triệu</option>
                <option value="20-999">Trên 20 tỷ / Trên 100 triệu</option>
              </select>
            </div>

            <div className="flex items-end">
              <Link
                href={`/posts?needType=${activeSearchTab}&province=${selectedProvince}&district=${selectedDistrict}&type=${selectedType}&price=${selectedPrice}`}
                className="w-full"
              >
                <button
                  type="button"
                  className="w-full h-[42px] rounded-xl bg-[#143D30] hover:bg-[#0e2a20] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Tìm Kiếm</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
