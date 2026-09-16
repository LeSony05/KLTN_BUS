// admin/src/modules/settings/components/GeneralBrandSettings.tsx
import React, { useState } from 'react';
import type { AdminBrandConfig } from '../models/settings.model';
import { Upload, Image as ImageIcon, Building, Phone, Mail, MapPin, Globe } from 'lucide-react';

interface GeneralBrandSettingsProps {
  brandConfig: AdminBrandConfig;
  onChange: (config: AdminBrandConfig) => void;
}

export const GeneralBrandSettings: React.FC<GeneralBrandSettingsProps> = ({
  brandConfig,
  onChange,
}) => {
  const [logoPreview, setLogoPreview] = useState<string>(brandConfig.logoUrl);
  const [faviconPreview, setFaviconPreview] = useState<string>(brandConfig.faviconUrl);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
      onChange({ ...brandConfig, logoUrl: url });
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFaviconPreview(url);
      onChange({ ...brandConfig, faviconUrl: url });
    }
  };

  return (
    <div className="space-y-6">
      {/* Logo & Favicon Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <ImageIcon className="w-5 h-5 text-emerald-700" />
          <h3 className="text-base font-bold text-slate-800">Cấu hình Logo & Favicon Sàn</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo Upload */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700">
              Logo Chính (Hiển thị trên Header & Footer)
            </label>

            <div className="flex items-center gap-4">
              <div className="w-40 h-24 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center p-2 relative overflow-hidden group">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo sàn"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-slate-400">
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-[11px] font-medium">Chưa có logo</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#3c50e0] hover:bg-[#3142bd] text-white text-xs font-semibold cursor-pointer shadow-2xs transition-all">
                  <Upload className="w-4 h-4" />
                  <span>Tải Logo mới</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-slate-400">
                  Định dạng PNG, SVG hoặc JPG. Khuyên dùng background trong suốt (transparent).
                </p>
              </div>
            </div>
          </div>

          {/* Favicon Upload */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700">
              Favicon Icon (Biểu tượng trên Tab trình duyệt)
            </label>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center p-2 relative overflow-hidden">
                {faviconPreview ? (
                  <img
                    src={faviconPreview}
                    alt="Favicon"
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-slate-400">
                    <Globe className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Chưa có icon</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-all cursor-pointer shadow-2xs">
                  <Upload className="w-4 h-4" />
                  <span>Tải Favicon</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFaviconUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-slate-400">
                  Kích thước đề xuất: 32x32px hoặc 64x64px (.ico / .png).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Identity & Contact Information */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Building className="w-5 h-5 text-emerald-700" />
          <h3 className="text-base font-bold text-slate-800">Thông Tin Thương Hiệu & Liên Hệ</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tên Sàn / Thương Hiệu:
            </label>
            <input
              type="text"
              value={brandConfig.brandName}
              onChange={(e) => onChange({ ...brandConfig, brandName: e.target.value })}
              className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-normal text-slate-700 focus:border-[#11382b] focus:ring-2 focus:ring-[#11382b]/10 outline-none transition-all"
              placeholder="VD: King Connect Land"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Slogan Sàn Nhu Cầu BĐS:
            </label>
            <input
              type="text"
              value={brandConfig.slogan}
              onChange={(e) => onChange({ ...brandConfig, slogan: e.target.value })}
              className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-normal text-slate-700 focus:border-[#11382b] focus:ring-2 focus:ring-[#11382b]/10 outline-none transition-all"
              placeholder="VD: Kết nối Nhu Cầu BĐS Cần Mua & Cần Thuê Trực Tiếp"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hotline Hỗ Trợ:</span>
            </label>
            <input
              type="text"
              value={brandConfig.hotline}
              onChange={(e) => onChange({ ...brandConfig, hotline: e.target.value })}
              className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-normal text-slate-700 focus:border-[#11382b] focus:ring-2 focus:ring-[#11382b]/10 outline-none transition-all"
              placeholder="VD: 0912.345.678"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>Email Liên Hệ / Hỗ Trợ:</span>
            </label>
            <input
              type="email"
              value={brandConfig.email}
              onChange={(e) => onChange({ ...brandConfig, email: e.target.value })}
              className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-normal text-slate-700 focus:border-[#11382b] focus:ring-2 focus:ring-[#11382b]/10 outline-none transition-all"
              placeholder="VD: hotro@kingconnectland.vn"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Địa Chỉ Trụ Sở / Văn Phòng:</span>
            </label>
            <input
              type="text"
              value={brandConfig.address}
              onChange={(e) => onChange({ ...brandConfig, address: e.target.value })}
              className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-normal text-slate-700 focus:border-[#11382b] focus:ring-2 focus:ring-[#11382b]/10 outline-none transition-all"
              placeholder="VD: Tòa nhà King Connect, Số 100 Nguyễn Thị Thập, Quận 7, TP. Hồ Chí Minh"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
