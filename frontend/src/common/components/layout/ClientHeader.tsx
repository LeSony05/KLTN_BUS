// /src/common/components/layout/ClientHeader.tsx
'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { User, Plus, Building2, Menu, X } from 'lucide-react';

interface NavLinksNavProps {
  onItemClick?: () => void;
  isMobile?: boolean;
}

const NavLinksList: React.FC<NavLinksNavProps> = ({ onItemClick, isMobile }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const needType = searchParams?.get('needType');

  const navLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/posts?needType=BUY', label: 'Cần Mua' },
    { href: '/posts?needType=RENT', label: 'Cần Thuê' },
    { href: '/about', label: 'Giới thiệu' },
    { href: '/contact', label: 'Liên hệ' },
  ];

  const checkIsActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    if (href === '/posts?needType=BUY') {
      return pathname === '/posts' && needType === 'BUY';
    }
    if (href === '/posts?needType=RENT') {
      return pathname === '/posts' && needType === 'RENT';
    }
    return pathname.startsWith(href);
  };

  if (isMobile) {
    return (
      <div className="space-y-1">
        {navLinks.map((link) => {
          const isActive = checkIsActive(link.href);
          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={onItemClick}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'text-amber-400 font-bold bg-white/5'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
      {navLinks.map((link) => {
        const isActive = checkIsActive(link.href);
        return (
          <Link
            key={link.label}
            href={link.href}
            className={`transition-colors cursor-pointer ${
              isActive
                ? 'text-amber-400 font-bold'
                : 'text-slate-200 hover:text-amber-300'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

export const ClientHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#113327] text-white border-b border-emerald-900/40 shadow-md font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Logo bên trái */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-emerald-400">
            <Building2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5 font-bold text-lg sm:text-xl tracking-tight">
            <span className="text-white">King</span>
            <span className="text-amber-400">Connect</span>
            <span className="text-white">Land</span>
          </div>
        </Link>

        {/* Menu giữa */}
        <Suspense fallback={<div className="hidden lg:flex gap-6 text-sm text-slate-300">Đang tải...</div>}>
          <NavLinksList />
        </Suspense>

        {/* Nút bên phải */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-200 hover:text-white transition-colors"
          >
            <User className="w-4 h-4" />
            <span>Đăng nhập</span>
          </Link>

          <Link href="/post-property/create">
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-slate-900 font-bold text-sm shadow-md cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Đăng tin</span>
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e2a20] border-t border-emerald-900/60 px-4 py-4 space-y-3">
          <Suspense fallback={null}>
            <NavLinksList isMobile onItemClick={() => setMobileMenuOpen(false)} />
          </Suspense>
          <div className="pt-2 border-t border-emerald-900/60">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-200"
            >
              <User className="w-4 h-4" />
              <span>Đăng nhập</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default ClientHeader;
