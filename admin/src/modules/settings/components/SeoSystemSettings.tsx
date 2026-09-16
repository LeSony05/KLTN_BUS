// admin/src/modules/settings/components/SeoSystemSettings.tsx
import React from 'react';
import type { AdminSeoConfig } from '../models/settings.model';
import { Search, ShieldCheck, Sliders } from 'lucide-react';

interface SeoSystemSettingsProps {
  seoConfig: AdminSeoConfig;
  onChange: (config: AdminSeoConfig) => void;
}

export const SeoSystemSettings: React.FC<SeoSystemSettingsProps> = ({
  seoConfig,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      {/* SEO Configuration */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Search className="w-5 h-5 text-[#11382b]" />
          <h3 className="text-base font-bold text-slate-800">Cấu Hình SEO Header & Meta Tags</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tiêu Đề Trang SEO (Meta Title Mặc Định):
            </label>
            <input
              type="text"
              value={seoConfig.seoTitle}
              onChange={(e) => onChange({ ...seoConfig, seoTitle: e.target.value })}
              className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-normal text-slate-700 focus:border-[#11382b] focus:ring-2 focus:ring-[#11382b]/10 outline-none transition-all"
              placeholder="VD: King Connect Land - Nền tảng kết nối Nhu Cầu BĐS Cần Mua & Cần Thuê"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Mô Tả SEO (Meta Description):
            </label>
            <textarea
              rows={3}
              value={seoConfig.metaDescription}
              onChange={(e) => onChange({ ...seoConfig, metaDescription: e.target.value })}
              className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-normal text-slate-700 focus:border-[#11382b] focus:ring-2 focus:ring-[#11382b]/10 outline-none transition-all resize-none"
              placeholder="VD: Sàn giao dịch bất động sản chuyên về nhu cầu Cần Mua và Cần Thuê. Tìm kiếm nguồn nhà đất, mặt bằng, căn hộ chính chủ nhanh chóng."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Từ Khóa SEO (Meta Keywords - Phân cách bằng dấu phẩy):
            </label>
            <input
              type="text"
              value={seoConfig.metaKeywords}
              onChange={(e) => onChange({ ...seoConfig, metaKeywords: e.target.value })}
              className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-normal text-slate-700 focus:border-[#11382b] focus:ring-2 focus:ring-[#11382b]/10 outline-none transition-all"
              placeholder="nhu cau bds, can mua nha, can thue mat bang, king connect land"
            />
          </div>
        </div>
      </div>

      {/* System Automation Rules */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <ShieldCheck className="w-5 h-5 text-[#11382b]" />
          <h3 className="text-base font-bold text-slate-800">Quy Tắc Kiểm Duyệt & Hệ Thống</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <p className="text-sm font-semibold text-slate-800">Tự động Phê duyệt Tin Đăng mới</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Nếu bật, tin Cần Mua / Cần Thuê của hội viên sẽ được hiển thị ngay lập tức không cần Admin duyệt thủ công.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={seoConfig.autoApprovePosts}
                onChange={(e) => onChange({ ...seoConfig, autoApprovePosts: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#11382b]"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                <Sliders className="w-4 h-4 text-emerald-600" />
                <span>Giới Hạn Tin Đăng Mỗi Ngày (Mỗi Hội Viên):</span>
              </label>
              <input
                type="number"
                value={seoConfig.maxDailyPosts}
                onChange={(e) => onChange({ ...seoConfig, maxDailyPosts: parseInt(e.target.value, 10) || 5 })}
                className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-normal text-slate-700 focus:border-[#11382b] outline-none"
                min={1}
                max={50}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
