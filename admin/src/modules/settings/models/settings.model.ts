// admin/src/modules/settings/models/settings.model.ts

export interface AdminBankConfig {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  branch: string;
  qrCodeUrl?: string;
}

export interface AdminBrandConfig {
  brandName: string;
  slogan: string;
  hotline: string;
  email: string;
  address: string;
  logoUrl: string;
  faviconUrl: string;
}

export interface AdminBannerItem {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  position: 'HERO' | 'SIDEBAR' | 'POPUP';
  isActive: boolean;
}

export interface AdminBannerConfig {
  heroTitle: string;
  heroSubtitle: string;
  banners: AdminBannerItem[];
}

export interface AdminSeoConfig {
  seoTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImageUrl: string;
  autoApprovePosts: boolean;
  maxDailyPosts: number;
}

export interface AdminSystemSettingsPayload {
  brand: AdminBrandConfig;
  banner: AdminBannerConfig;
  bank1: AdminBankConfig;
  bank2: AdminBankConfig;
  seo: AdminSeoConfig;
}

export type AdminSettingsPayload = AdminSystemSettingsPayload;


