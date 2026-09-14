// frontend/src/modules/client/common/components/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Heart,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#113327] text-slate-300 pt-14 pb-8 border-t border-emerald-950 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-emerald-400">
                <Building2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-xl font-extrabold tracking-tight">
                <span className="text-white">King</span>{' '}
                <span className="text-amber-400">Connect</span>{' '}
                <span className="text-white">Land</span>
              </div>
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hệ thống kết nối nhu cầu bất động sản trực tiếp, minh bạch và hiệu quả hàng đầu dành cho cộng đồng môi giới và khách hàng có nhu cầu thực tế.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-slate-300 hover:text-white hover:bg-emerald-900"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-slate-300 hover:text-white hover:bg-emerald-900"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Cột 2: Danh mục BĐS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Bất Động Sản Mua & Thuê
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/posts?needType=BUY" className="hover:text-amber-400">
                  Cần Mua nhà đất
                </Link>
              </li>
              <li>
                <Link href="/posts?needType=RENT" className="hover:text-amber-400">
                  Cần Thuê mặt bằng & căn hộ
                </Link>
              </li>
              <li>
                <Link href="/posts?type=RESIDENTIAL_LAND" className="hover:text-amber-400">
                  Tìm kiếm Đất nền thổ cư
                </Link>
              </li>
              <li>
                <Link href="/posts?type=TOWNHOUSE" className="hover:text-amber-400">
                  Tìm kiếm Nhà phố trung tâm
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Liên kết nhanh */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Liên kết hữu ích
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-amber-400">
                  Về King Connect Land
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400">
                  Liên hệ ban quản trị
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-amber-400">
                  Quỹ đóng góp phát triển hội
                </Link>
              </li>
              <li>
                <Link href="/post-property/create" className="hover:text-amber-400">
                  Đăng tin nhu cầu BĐS
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Thông tin liên hệ */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Trụ sở hoạt động
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>TP. Hồ Chí Minh & các tỉnh lân cận</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Hotline: 0900.000.000</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>contact@kingconnectland.vn</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} King Connect Land. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Bảo mật dữ liệu</span>
            <span>·</span>
            <span>Quy chế hoạt động</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

