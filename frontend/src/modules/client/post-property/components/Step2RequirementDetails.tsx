// frontend/src/modules/client/post-property/components/Step2RequirementDetails.tsx
'use client';

import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Send,
  User,
  Bookmark,
} from 'lucide-react';
import type { CreatePostFormData } from '../models/post-property.model';

export interface Step2RequirementDetailsProps {
  formData: CreatePostFormData;
  errorMessage?: string;
  draftSavedMessage?: string;
  onChangeField: <K extends keyof CreatePostFormData>(field: K, value: CreatePostFormData[K]) => void;
  onBack: () => void;
  onSaveDraft: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const Step2RequirementDetails: React.FC<Step2RequirementDetailsProps> = ({
  formData,
  onChangeField,
  onBack,
  onSaveDraft,
  onSubmit,
}) => {
  const isBuy = formData.needType === 'BUY';

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 font-sans">
      {/* Header */}
      <div>
        <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
          Chi tiết thông tin bất động sản
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Nhập đầy đủ tiêu chí để hệ thống kết nối và kiểm duyệt chính xác
        </p>
      </div>

      {/* Auto-linked Member Info Box */}
      <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#143D30] text-white flex items-center justify-center font-bold text-sm">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                {formData.fullName || 'Nguyễn Văn Hùng'}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Hội viên KC
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              SĐT: <strong className="text-slate-800">{formData.phone || '0912.345.678'}</strong> (Tự động liên kết tài khoản)
            </p>
          </div>
        </div>

        <span className="text-[11px] text-slate-400 italic">
          *Thông tin liên hệ được lấy tự động từ tài khoản đã đăng nhập
        </span>
      </div>

      <div className="space-y-4">
        {/* Tiêu đề tin đăng */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">
            Tiêu đề tin đăng <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onChangeField('title', e.target.value)}
            placeholder={
              isBuy
                ? 'VD: Cần mua gấp đất nền thổ cư TP. Thủ Đức ngân sách 3.5 tỷ'
                : 'VD: Cần thuê mặt bằng kinh doanh F&B quận 1 ngân sách 40 triệu'
            }
            className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#143D30] focus:ring-1 focus:ring-[#143D30]"
          />
        </div>

        {/* Ngân sách tối đa & Diện tích tối thiểu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Ngân sách tối đa <span className="text-rose-600">*</span>
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={formData.price}
                onChange={(e) => onChangeField('price', e.target.value)}
                placeholder={isBuy ? 'VD: 3.5' : 'VD: 40'}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 pr-24 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#143D30] focus:ring-1 focus:ring-[#143D30]"
              />
              <span className="absolute right-3.5 text-xs text-slate-500 font-semibold pointer-events-none">
                {isBuy ? 'Tỷ VNĐ' : 'Triệu/tháng'}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Diện tích mong muốn (m²)
            </label>
            <input
              type="text"
              value={formData.minArea}
              onChange={(e) => onChangeField('minArea', e.target.value)}
              placeholder="VD: 80 - 120"
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#143D30] focus:ring-1 focus:ring-[#143D30]"
            />
          </div>
        </div>

        {/* Tỉnh/Thành & Quận/Huyện */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              Tỉnh / Thành phố <span className="text-rose-600">*</span>
            </label>
            <select
              value={formData.province}
              onChange={(e) => onChangeField('province', e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#143D30] cursor-pointer"
            >
              <option value="">Chọn tỉnh / thành phố</option>
              <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Bình Dương">Bình Dương</option>
              <option value="Đồng Nai">Đồng Nai</option>
              <option value="Lâm Đồng">Lâm Đồng</option>
              <option value="Long An">Long An</option>
              <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
              <option value="Cần Thơ">Cần Thơ</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Quận / Huyện</label>
            <select
              value={formData.district}
              onChange={(e) => onChangeField('district', e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#143D30] cursor-pointer"
            >
              <option value="">Chọn quận / huyện</option>
              <option value="Quận 1">Quận 1</option>
              <option value="Quận 3">Quận 3</option>
              <option value="Quận 7">Quận 7</option>
              <option value="TP. Thủ Đức">TP. Thủ Đức</option>
              <option value="Quận Bình Thạnh">Quận Bình Thạnh</option>
              <option value="Quận Tân Bình">Quận Tân Bình</option>
              <option value="Huyện Bình Chánh">Huyện Bình Chánh</option>
              <option value="Quận Cầu Giấy">Quận Cầu Giấy</option>
              <option value="TP. Bảo Lộc">TP. Bảo Lộc</option>
            </select>
          </div>
        </div>

        {/* Yêu cầu pháp lý & Hướng mong muốn */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Yêu cầu pháp lý</label>
            <select
              value={formData.legal}
              onChange={(e) => onChangeField('legal', e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#143D30] cursor-pointer"
            >
              <option value="">Chọn pháp lý mong muốn</option>
              <option value="Sổ hồng / Sổ đỏ riêng chính chủ">Sổ hồng / Sổ đỏ riêng chính chủ</option>
              <option value="Hợp đồng mua bán (HĐMB)">Hợp đồng mua bán (HĐMB)</option>
              <option value="Hợp đồng công chứng dài hạn">Hợp đồng công chứng dài hạn</option>
              <option value="Không bắt buộc">Không bắt buộc</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Hướng mong muốn</label>
            <select
              value={formData.direction}
              onChange={(e) => onChangeField('direction', e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#143D30] cursor-pointer"
            >
              <option value="">Chọn hướng</option>
              <option value="Chính Đông">Chính Đông</option>
              <option value="Chính Tây">Chính Tây</option>
              <option value="Chính Nam">Chính Nam</option>
              <option value="Chính Bắc">Chính Bắc</option>
              <option value="Đông Nam">Đông Nam</option>
              <option value="Đông Bắc">Đông Bắc</option>
              <option value="Tây Nam">Tây Nam</option>
              <option value="Tây Bắc">Tây Bắc</option>
            </select>
          </div>
        </div>

        {/* Nội dung mô tả chi tiết */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">
            Nội dung mô tả yêu cầu chi tiết
          </label>
          <textarea
            rows={4}
            maxLength={600}
            value={formData.note}
            onChange={(e) => onChangeField('note', e.target.value)}
            placeholder="Mô tả cụ thể về vị trí đường hẻm, mặt tiền, kết cấu, thời gian cần mua/thuê..."
            className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#143D30] focus:ring-1 focus:ring-[#143D30]"
          />
          <div className="flex justify-end text-[11px] text-slate-400">
            <span>{formData.note.length}/600 ký tự</span>
          </div>
        </div>
      </div>

      {/* Bottom Actions: Quay lại | Lưu nháp | Gửi kiểm duyệt */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-slate-100">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Save Draft Button (FR-POST-003, AC-3) */}
          <button
            type="button"
            onClick={onSaveDraft}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            title="Lưu tin dưới dạng bản nháp DRAFT"
          >
            <Bookmark className="w-4 h-4 text-slate-500" />
            <span>Lưu bản nháp</span>
          </button>

          {/* Submit For Approval Button (FR-POST-004, AC-4, AC-5) */}
          <button
            type="button"
            onClick={onSubmit}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#143D30] hover:bg-[#0e2a20] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Gửi kiểm duyệt</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2RequirementDetails;
