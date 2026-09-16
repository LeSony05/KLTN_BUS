// admin/src/modules/settings/components/SettingsView.tsx
import React, { useState } from 'react';
import { Save, CheckCircle2, Building, Layout, Building2 } from 'lucide-react';
import type {
  AdminBrandConfig,
  AdminBannerConfig,
  AdminBankConfig,
} from '../models/settings.model';
import { GeneralBrandSettings } from './GeneralBrandSettings';
import { BannerSettings } from './BannerSettings';
import { BankDonationSettings } from './BankDonationSettings';

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'brand' | 'banner' | 'bank'>('brand');
  const [isSaved, setIsSaved] = useState(false);

  // State Cấu hình Thương hiệu
  const [brandConfig, setBrandConfig] = useState<AdminBrandConfig>({
    brandName: 'King Connect Land',
    slogan: 'Kết nối Nhu Cầu BĐS Cần Mua & Cần Thuê Trực Tiếp',
    hotline: '0912.345.678',
    email: 'hotro@kingconnectland.vn',
    address: 'Số 100 Nguyễn Thị Thập, Phường Tân Quy, Quận 7, TP. Hồ Chí Minh',
    logoUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&auto=format&fit=crop&q=80',
    faviconUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=64&auto=format&fit=crop&q=80',
  });

  // State Cấu hình Banner
  const [bannerConfig, setBannerConfig] = useState<AdminBannerConfig>({
    heroTitle: 'Sàn Nhu Cầu Bất Động Sản Hàng Đầu Việt Nam',
    heroSubtitle: 'Đăng tin Cần Mua & Cần Thuê miễn phí, kết nối trực tiếp chủ nhà và môi giới chuyên nghiệp.',
    banners: [
      {
        id: 'banner-1',
        title: 'Chương trình Kết nối Hội viên Q3/2026',
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80',
        linkUrl: 'https://kingconnectland.vn/tin-tuc',
        position: 'HERO',
        isActive: true,
      },
      {
        id: 'banner-2',
        title: 'Hướng dẫn Đăng tin Cần Thuê chuẩn SEO',
        imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop&q=80',
        linkUrl: 'https://kingconnectland.vn/huong-dan',
        position: 'SIDEBAR',
        isActive: true,
      },
    ],
  });

  // State Cấu hình Ngân hàng
  const [bank1, setBank1] = useState<AdminBankConfig>({
    bankName: 'Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank)',
    accountNumber: '1029384756',
    accountHolder: 'NGUYEN TAN DONG - HOI KING CONNECT LAND',
    branch: 'Chi nhánh TP. Hồ Chí Minh',
    qrCodeUrl: '',
  });

  const [bank2, setBank2] = useState<AdminBankConfig>({
    bankName: 'Ngân hàng TMCP Quân Đội (MB Bank)',
    accountNumber: '888899998888',
    accountHolder: 'HOI BAT DONG SAN KING CONNECT LAND',
    branch: 'Hội sở chính',
    qrCodeUrl: '',
  });

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  const tabs = [
    {
      id: 'brand',
      label: 'Thương Hiệu & Logo',
      icon: <Building className="w-4 h-4" />,
    },
    {
      id: 'banner',
      label: 'Banner Quảng Cáo & Hero Header',
      icon: <Layout className="w-4 h-4" />,
    },
    {
      id: 'bank',
      label: 'Tài Khoản Đóng Góp Quỹ',
      icon: <Building2 className="w-4 h-4" />,
    },
  ];

  return (
    <div className="space-y-6 font-sans pb-10">
      {/* Header section */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Cài Đặt Hệ Thống & Thương Hiệu
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Quản lý Logo sàn, Banner quảng cáo, Thông tin liên hệ và Tài khoản đóng góp.
        </p>
      </div>

      {/* Success Notification */}
      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl font-semibold flex items-center gap-2.5 text-sm shadow-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
          <span>Đã lưu toàn bộ cấu hình hệ thống thành công! Tất cả các thay đổi đã được cập nhật.</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-[#3c50e0] text-[#3c50e0] bg-[#ebf3fe] rounded-t-xl font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <form onSubmit={handleSaveAll} className="space-y-6">
        {activeTab === 'brand' && (
          <GeneralBrandSettings brandConfig={brandConfig} onChange={setBrandConfig} />
        )}

        {activeTab === 'banner' && (
          <BannerSettings bannerConfig={bannerConfig} onChange={setBannerConfig} />
        )}

        {activeTab === 'bank' && (
          <BankDonationSettings
            bank1={bank1}
            bank2={bank2}
            onBank1Change={setBank1}
            onBank2Change={setBank2}
          />
        )}

        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3c50e0] hover:bg-[#3142bd] text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Lưu thay đổi</span>
          </button>
        </div>
      </form>
    </div>
  );
};
