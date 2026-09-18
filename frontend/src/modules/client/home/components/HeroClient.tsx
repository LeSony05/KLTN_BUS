'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRightLeft, Bus, CalendarDays, MapPin, PackageCheck, Search, Users } from 'lucide-react';

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
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [returnDate, setReturnDate] = useState('');
  const [ticketCount, setTicketCount] = useState(1);

  const swapRoute = () => {
    const currentProvince = selectedProvince;
    setSelectedProvince(selectedDistrict);
    setSelectedDistrict(currentProvince);
  };

  return (
    <section className="relative w-full bg-[#F5F5F5] flex flex-col items-center pb-12">
      {/* Banner Background */}
      <div className="w-full h-[380px] md:h-[480px] relative">
        <div 
          className="absolute inset-0 bg-[url('/images/promo2.jpg')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center pt-8 px-4 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-wider drop-shadow-lg shadow-black">
            <span className="text-accent">VỮNG TIN</span> & PHÁT TRIỂN
          </h1>
          <p className="mt-4 text-white/90 text-sm md:text-lg font-bold drop-shadow-md bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
            Chất lượng là danh dự - Hàng ngàn chuyến đi mỗi ngày
          </p>
        </div>
      </div>

      {/* Floating Search Form */}
      <div className="w-full max-w-[1050px] px-4 sm:px-6 -mt-32 md:-mt-40 relative z-10">
        <div className="bg-white text-slate-900 rounded-lg border border-slate-200 shadow-xl p-4 md:p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="inline-flex w-fit rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setActiveSearchTab('BUY')}
                className={`h-10 px-4 rounded-md text-sm font-extrabold flex items-center gap-2 ${
                  activeSearchTab === 'BUY'
                    ? 'bg-brand text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Bus className="w-4 h-4" />
                Đặt vé
              </button>
              <button
                type="button"
                onClick={() => setActiveSearchTab('RENT')}
                className={`h-10 px-4 rounded-md text-sm font-extrabold flex items-center gap-2 ${
                  activeSearchTab === 'RENT'
                    ? 'bg-brand text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <PackageCheck className="w-4 h-4" />
                Gửi hàng
              </button>
            </div>

            <div className="flex items-center gap-6 pr-2 md:pr-4 text-xs font-bold text-slate-500">
              <label className="inline-flex items-center gap-2 cursor-pointer hover:text-slate-700 transition-colors">
                <input
                  type="radio"
                  name="tripTypeSearch"
                  checked={tripType === 'one-way'}
                  onChange={() => setTripType('one-way')}
                  className="accent-brand w-4 h-4 cursor-pointer"
                />
                Một chiều
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer hover:text-slate-700 transition-colors">
                <input
                  type="radio"
                  name="tripTypeSearch"
                  checked={tripType === 'round-trip'}
                  onChange={() => setTripType('round-trip')}
                  className="accent-brand w-4 h-4 cursor-pointer"
                />
                Khứ hồi
              </label>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-3 pt-4">
            {/* Vùng Điểm đi & Điểm đến */}
            <div className="flex flex-col md:flex-row gap-3 lg:contents">
              <div className="flex-1 space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand" />
                  Điểm đi
                </label>
                <input
                  type="text"
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  placeholder="Nhập điểm đi"
                  list="origin-options"
                  className="h-12 w-full bg-white border border-slate-300 rounded-lg px-3 text-sm font-bold text-slate-900 outline-none focus:border-brand"
                />
                <datalist id="origin-options">
                  <option value="TP. Hồ Chí Minh" />
                  <option value="Hà Nội" />
                  <option value="Đà Nẵng" />
                  <option value="Cần Thơ" />
                  <option value="Lâm Đồng" />
                  <option value="Vũng Tàu" />
                </datalist>
              </div>

              <div className="hidden md:flex items-end pb-1 lg:shrink-0">
                <button
                  type="button"
                  onClick={swapRoute}
                  className="w-11 h-11 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-brand flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  title="Đổi chiều tuyến"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  Điểm đến
                </label>
                <input
                  type="text"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  placeholder="Nhập điểm đến"
                  list="destination-options"
                  className="h-12 w-full bg-white border border-slate-300 rounded-lg px-3 text-sm font-bold text-slate-900 outline-none focus:border-brand"
                />
                <datalist id="destination-options">
                  <option value="Đà Lạt" />
                  <option value="Nha Trang" />
                  <option value="Đà Nẵng" />
                  <option value="Huế" />
                  <option value="Cần Thơ" />
                  <option value="Vũng Tàu" />
                </datalist>
              </div>
            </div>

            {/* Vùng Ngày & Số vé */}
            <div className="flex flex-col md:flex-row gap-3 lg:contents">
              <div className="flex-1 space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-brand" />
                  Ngày đi
                </label>
                <input
                  type="date"
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="h-12 w-full border border-slate-300 rounded-lg px-3 text-sm font-bold text-slate-900 outline-none focus:border-brand"
                />
              </div>

              {tripType === 'round-trip' && (
                <div className="flex-1 space-y-1.5">
                  <label className="text-[11px] font-extrabold text-slate-500 uppercase flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-brand" />
                    Ngày về
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="h-12 w-full border border-slate-300 rounded-lg px-3 text-sm font-bold text-slate-900 outline-none focus:border-brand"
                  />
                </div>
              )}

              <div className="flex-1 md:w-28 md:flex-none lg:w-28 lg:flex-none space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-brand" />
                  Số vé
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={ticketCount}
                  onChange={(e) => setTicketCount(Math.max(1, Number(e.target.value) || 1))}
                  className="h-12 w-full bg-white border border-slate-300 rounded-lg px-3 text-sm font-bold text-slate-900 outline-none focus:border-brand"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-end gap-3">
            <Link
              href={`/posts?needType=${activeSearchTab}&tripType=${tripType}&province=${selectedProvince}&district=${selectedDistrict}&type=${selectedType}&price=${selectedPrice}&returnDate=${returnDate}&tickets=${ticketCount}`}
              className="w-full sm:w-auto"
            >
              <button
                type="button"
                className="w-full sm:w-auto h-12 px-7 rounded-lg bg-accent hover:bg-accent-hover text-white font-black text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Search className="w-4 h-4" />
                Tìm chuyến
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
