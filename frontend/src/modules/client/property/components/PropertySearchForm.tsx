'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRightLeft, Bus, CalendarDays, MapPin, PackageCheck, Search, Users } from 'lucide-react';

export const PropertySearchForm: React.FC = () => {
  const searchParams = useSearchParams();
  const [activeSearchTab, setActiveSearchTab] = useState<'BUY' | 'RENT'>(
    (searchParams?.get('needType') as 'BUY' | 'RENT') || 'BUY'
  );
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>(
    (searchParams?.get('tripType') as 'one-way' | 'round-trip') || 'one-way'
  );
  const [selectedProvince, setSelectedProvince] = useState(searchParams?.get('province') || '');
  const [selectedDistrict, setSelectedDistrict] = useState(searchParams?.get('district') || '');
  const [selectedType, setSelectedType] = useState(searchParams?.get('type') || '');
  const [selectedPrice, setSelectedPrice] = useState(searchParams?.get('price') || ''); 
  const [returnDate, setReturnDate] = useState(searchParams?.get('returnDate') || '');
  const [ticketCount, setTicketCount] = useState(Number(searchParams?.get('tickets')) || 1);

  const swapRoute = () => {
    const currentProvince = selectedProvince;
    setSelectedProvince(selectedDistrict);
    setSelectedDistrict(currentProvince);
  };

  return (
    <div className="bg-white text-slate-900 rounded-lg border border-slate-200 shadow-sm p-4 md:p-5 mb-5 mt-2 mx-auto w-full max-w-[1360px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="inline-flex w-fit rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setActiveSearchTab('BUY')}
            className={`h-10 px-4 rounded-md text-sm font-extrabold flex items-center gap-2 ${
              activeSearchTab === 'BUY'
                ? 'bg-[#143D30] text-white shadow-sm'
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
                ? 'bg-[#143D30] text-white shadow-sm'
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
              className="accent-[#143D30] w-4 h-4 cursor-pointer"
            />
            Một chiều
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer hover:text-slate-700 transition-colors">
            <input
              type="radio"
              name="tripTypeSearch"
              checked={tripType === 'round-trip'}
              onChange={() => setTripType('round-trip')}
              className="accent-[#143D30] w-4 h-4 cursor-pointer"
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
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              Điểm đi
            </label>
            <input
              type="text"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              placeholder="Nhập điểm đi"
              list="origin-options-search"
              className="h-12 w-full bg-white border border-slate-300 rounded-lg px-3 text-sm font-bold text-slate-900 outline-none focus:border-[#143D30]"
            />
            <datalist id="origin-options-search">
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
              className="w-11 h-11 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#143D30] flex items-center justify-center transition-colors cursor-pointer shrink-0"
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
              list="destination-options-search"
              className="h-12 w-full bg-white border border-slate-300 rounded-lg px-3 text-sm font-bold text-slate-900 outline-none focus:border-[#143D30]"
            />
            <datalist id="destination-options-search">
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
              <CalendarDays className="w-3.5 h-3.5 text-[#143D30]" />
              Ngày đi
            </label>
            <input
              type="date"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="h-12 w-full border border-slate-300 rounded-lg px-3 text-sm font-bold text-slate-900 outline-none focus:border-[#143D30]"
            />
          </div>

          {tripType === 'round-trip' && (
            <div className="flex-1 space-y-1.5">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-[#143D30]" />
                Ngày về
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="h-12 w-full border border-slate-300 rounded-lg px-3 text-sm font-bold text-slate-900 outline-none focus:border-[#143D30]"
              />
            </div>
          )}

          <div className="flex-1 md:w-28 md:flex-none lg:w-28 lg:flex-none space-y-1.5">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#143D30]" />
              Số vé
            </label>
            <input
              type="number"
              min={1}
              max={20}
              value={ticketCount}
              onChange={(e) => setTicketCount(Math.max(1, Number(e.target.value) || 1))}
              className="h-12 w-full bg-white border border-slate-300 rounded-lg px-3 text-sm font-bold text-slate-900 outline-none focus:border-[#143D30]"
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
            className="w-full sm:w-auto h-12 px-7 rounded-lg bg-[#FFC700] hover:bg-[#E6B200] text-[#113327] font-black text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Search className="w-4 h-4" />
            Tìm chuyến
          </button>
        </Link>
      </div>
    </div>
  );
};
