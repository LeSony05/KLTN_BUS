// frontend/src/modules/client/post-property/components/Step3ContactAndPreview.tsx
'use client';

import React from 'react';
import {
  Coins,
  MapPin,
  Ruler,
  Building,
  Eye,
  Send,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';
import { CreatePostFormData } from '../models/post-property.model';

export interface Step3ContactAndPreviewProps {
  formData: CreatePostFormData;
  errorMessage: string;
  onChangeField: <K extends keyof CreatePostFormData>(field: K, value: CreatePostFormData[K]) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const Step3ContactAndPreview: React.FC<Step3ContactAndPreviewProps> = ({
  formData,
  errorMessage,
  onChangeField,
  onBack,
  onSubmit,
}) => {
  // Format Price Display
  const formatPriceDisplay = () => {
    if (!formData.price) return 'Chưa cập nhật';
    return formData.needType === 'RENT'
      ? `${formData.price} triệu/tháng`
      : `${formData.price} tỷ`;
  };

  // Format Location Display
  const formatLocationDisplay = () => {
    if (formData.district && formData.province) {
      return `${formData.district}, ${formData.province}`;
    }
    if (formData.province) return formData.province;
    return 'Toàn quốc';
  };

  return (
    <div className="space-y-6">
      {errorMessage && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Thông tin liên hệ bên trái */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Thông tin liên hệ
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Chủ BĐS và môi giới sẽ liên hệ với bạn qua thông tin bên dưới
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Họ tên <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => onChangeField('fullName', e.target.value)}
                placeholder="VD: Nguyễn Văn A"
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#143D30]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Số điện thoại / Zalo <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => onChangeField('phone', e.target.value)}
                placeholder="VD: 0912345678"
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#143D30]"
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed pt-2">
            Bằng việc gửi nhu cầu, bạn đồng ý để King Connect Land liên hệ và kết nối với các đối tác BĐS phù hợp.
          </p>
        </div>

        {/* Thẻ Xem trước bên phải (Dashed Gold Border) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border-2 border-dashed border-amber-300 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Top preview tag */}
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold ${
                  formData.needType === 'BUY'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-sky-50 text-sky-800'
                }`}
              >
                <span>•</span>
                <span>{formData.needType === 'BUY' ? 'CẦN MUA' : 'CẦN THUÊ'}</span>
              </span>

              <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>Xem trước</span>
              </span>
            </div>

            {/* Tiêu đề xem trước */}
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
              {formData.title || 'Tiêu đề nhu cầu BĐS của bạn'}
            </h3>

            {/* Meta items */}
            <div className="space-y-1.5 text-xs text-slate-700">
              <p className="flex items-center gap-2">
                <Coins className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>
                  <strong className="text-[#143D30] font-extrabold">
                    {formatPriceDisplay()}
                  </strong>{' '}
                  <span className="text-slate-400">ngân sách tối đa</span>
                </span>
              </p>

              <p className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>{formatLocationDisplay()}</span>
              </p>

              {formData.minArea && (
                <p className="flex items-center gap-2 text-slate-600">
                  <Ruler className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>Diện tích tối thiểu {formData.minArea}m²</span>
                </p>
              )}

              <p className="flex items-center gap-2 text-slate-600">
                <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>{formData.propertyType}</span>
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-amber-100 text-[11px] text-slate-400 italic">
            Đây là giao diện thẻ nhu cầu sẽ hiển thị cho các chủ BĐS và môi giới.
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="px-7 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>GỬI NHU CẦU</span>
        </button>
      </div>
    </div>
  );
};
