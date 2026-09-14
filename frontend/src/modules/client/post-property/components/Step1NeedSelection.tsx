// frontend/src/modules/client/post-property/components/Step1NeedSelection.tsx
'use client';

import React from 'react';
import {
  Building,
  KeyRound,
  Layers,
  Home,
  Building2,
  Store,
  Warehouse,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import { NeedType } from '../models/post-property.model';

export interface Step1NeedSelectionProps {
  needType: NeedType;
  propertyType: string;
  onSelectNeedType: (type: NeedType) => void;
  onSelectPropertyType: (type: string) => void;
  onNext: () => void;
}

export const Step1NeedSelection: React.FC<Step1NeedSelectionProps> = ({
  needType,
  propertyType,
  onSelectNeedType,
  onSelectPropertyType,
  onNext,
}) => {
  const propertyTypes = [
    { id: 'Đất nền', label: 'Đất nền', icon: <Layers className="w-5 h-5" /> },
    { id: 'Nhà phố', label: 'Nhà phố', icon: <Home className="w-5 h-5" /> },
    { id: 'Căn hộ', label: 'Căn hộ', icon: <Building className="w-5 h-5" /> },
    { id: 'Mặt bằng', label: 'Mặt bằng', icon: <Store className="w-5 h-5" /> },
    { id: 'Kho xưởng', label: 'Kho xưởng', icon: <Warehouse className="w-5 h-5" /> },
    { id: 'Biệt thự', label: 'Biệt thự', icon: <Building2 className="w-5 h-5" /> },
    { id: 'Nhà ở', label: 'Nhà ở', icon: <Home className="w-5 h-5" /> },
    { id: 'Văn phòng', label: 'Văn phòng', icon: <Briefcase className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-6">
      <div>
        <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
          Bạn đang có nhu cầu gì?
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Chọn loại nhu cầu và loại bất động sản bạn đang tìm kiếm
        </p>
      </div>

      {/* 2 Khối Lớn: CẦN MUA & CẦN THUÊ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Cần mua */}
        <div
          onClick={() => onSelectNeedType('BUY')}
          className={`p-5 rounded-2xl border-2 cursor-pointer flex items-start gap-4 ${
            needType === 'BUY'
              ? 'border-[#143D30] bg-[#F2F7F5]'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              needType === 'BUY'
                ? 'bg-[#143D30] text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900">CẦN MUA</h3>
            <p className="text-xs text-slate-500 mt-0.5">Tìm mua nhà, đất nền, căn hộ...</p>
          </div>
        </div>

        {/* Cần thuê */}
        <div
          onClick={() => onSelectNeedType('RENT')}
          className={`p-5 rounded-2xl border-2 cursor-pointer flex items-start gap-4 ${
            needType === 'RENT'
              ? 'border-[#143D30] bg-[#F2F7F5]'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              needType === 'RENT'
                ? 'bg-[#143D30] text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900">CẦN THUÊ</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tìm thuê mặt bằng, căn hộ, kho xưởng...
            </p>
          </div>
        </div>
      </div>

      {/* Chọn loại bất động sản (8 ô) */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-bold text-slate-700 block">
          Chọn loại bất động sản
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {propertyTypes.map((item) => {
            const isSelected = propertyType === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSelectPropertyType(item.id)}
                className={`p-4 rounded-xl border cursor-pointer flex flex-col items-center justify-center text-center gap-2 ${
                  isSelected
                    ? 'border-[#143D30] bg-[#F2F7F5] text-[#143D30] font-bold shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <span className={isSelected ? 'text-[#143D30]' : 'text-slate-500'}>
                  {item.icon}
                </span>
                <span className="text-xs">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-end pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-[#143D30] hover:bg-[#0e2a20] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <span>Tiếp theo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
