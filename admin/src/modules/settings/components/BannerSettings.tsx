// admin/src/modules/settings/components/BannerSettings.tsx
import React, { useState } from 'react';
import type { AdminBannerConfig, AdminBannerItem } from '../models/settings.model';
import { Layout, Plus, Trash2, Upload, CheckCircle2, XCircle } from 'lucide-react';

interface BannerSettingsProps {
  bannerConfig: AdminBannerConfig;
  onChange: (config: AdminBannerConfig) => void;
}

export const BannerSettings: React.FC<BannerSettingsProps> = ({
  bannerConfig,
  onChange,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newPosition, setNewPosition] = useState<'HERO' | 'SIDEBAR' | 'POPUP'>('HERO');
  const [newImagePreview, setNewImagePreview] = useState('');

  const handleAddBanner = () => {
    if (!newTitle.trim()) return;
    const newBanner: AdminBannerItem = {
      id: `banner-${Date.now()}`,
      title: newTitle,
      imageUrl: newImagePreview || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80',
      linkUrl: newLinkUrl || '#',
      position: newPosition,
      isActive: true,
    };
    onChange({
      ...bannerConfig,
      banners: [...bannerConfig.banners, newBanner],
    });
    setNewTitle('');
    setNewLinkUrl('');
    setNewImagePreview('');
  };

  const handleToggleActive = (id: string) => {
    onChange({
      ...bannerConfig,
      banners: bannerConfig.banners.map((b) =>
        b.id === id ? { ...b, isActive: !b.isActive } : b
      ),
    });
  };

  const handleDeleteBanner = (id: string) => {
    onChange({
      ...bannerConfig,
      banners: bannerConfig.banners.filter((b) => b.id !== id),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Hero Header Title Settings */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Layout className="w-5 h-5 text-emerald-700" />
          <h3 className="text-base font-bold text-slate-800">Tiêu Đề Hero Banner Trang Chủ</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tiêu Đề Chính (Headline Banner):
            </label>
            <input
              type="text"
              value={bannerConfig.heroTitle}
              onChange={(e) => onChange({ ...bannerConfig, heroTitle: e.target.value })}
              className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-normal text-slate-700 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 outline-none transition-all"
              placeholder="VD: Sàn Nhu Cầu BĐS Hàng Đầu Việt Nam"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tiêu Đề Phụ (Sub-headline):
            </label>
            <input
              type="text"
              value={bannerConfig.heroSubtitle}
              onChange={(e) => onChange({ ...bannerConfig, heroSubtitle: e.target.value })}
              className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-normal text-slate-700 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 outline-none transition-all"
              placeholder="VD: Đăng tin Cần Mua & Cần Thuê miễn phí, kết nối trực tiếp chủ nhà và nhà đầu tư"
            />
          </div>
        </div>
      </div>

      {/* Banner & Slider List Management */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-800">Danh Sách Banner Quảng Cáo & Slider</h3>
          <span className="text-xs text-slate-500">
            Tổng cộng: <strong className="text-emerald-700 font-bold">{bannerConfig.banners.length}</strong> banner
          </span>
        </div>

        {/* Add New Banner Form */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 space-y-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            + Thêm Banner Quảng Cáo Mới
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Tên Banner:</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="VD: Banner Sự Kiện Tháng 9"
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-normal text-slate-700 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Vị Trí Hiển Thị:</label>
              <select
                value={newPosition}
                onChange={(e) => setNewPosition(e.target.value as any)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-normal text-slate-700 outline-none focus:border-emerald-600"
              >
                <option value="HERO">Hero Slide (Trang chủ)</option>
                <option value="SIDEBAR">Sidebar (Cột bên)</option>
                <option value="POPUP">Popup Nổi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Đường Dẫn Link (URL):</label>
              <input
                type="text"
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-normal text-slate-700 outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium cursor-pointer transition-all">
                <Upload className="w-3.5 h-3.5" />
                <span>{newImagePreview ? 'Đã chọn ảnh' : 'Chọn tệp ảnh banner'}</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {newImagePreview && (
                <span className="text-[11px] text-emerald-700 font-semibold">✓ Đã sẵn sàng</span>
              )}
            </div>

            <button
              type="button"
              onClick={handleAddBanner}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#3c50e0] hover:bg-[#3142bd] text-white text-xs font-semibold cursor-pointer shadow-2xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Banner</span>
            </button>
          </div>
        </div>

        {/* Existing Banners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bannerConfig.banners.map((banner) => (
            <div
              key={banner.id}
              className="border border-slate-200 rounded-2xl p-3.5 bg-slate-50/60 flex items-center justify-between gap-4"
            >
              <div className="w-24 h-16 rounded-xl bg-slate-200 overflow-hidden flex-shrink-0 relative group">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-xs truncate">{banner.title}</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                  <span className="bg-slate-200 px-2 py-0.5 rounded font-medium text-slate-700">
                    {banner.position}
                  </span>
                  <span className="truncate">{banner.linkUrl}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleActive(banner.id)}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                    banner.isActive
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                  title={banner.isActive ? 'Đang ẩn / Bấm để bật' : 'Đã ẩn / Bấm để hiển thị'}
                >
                  {banner.isActive ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteBanner(banner.id)}
                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                  title="Xóa banner"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
