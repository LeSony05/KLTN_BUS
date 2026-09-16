'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Maximize,
  CircleDollarSign,
  ShieldCheck,
  Compass,
  ClipboardList,
  Check,
  Phone,
  MessageCircle,
  Zap,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import type { PropertyDemand } from '../models/property.model';
import { MOCK_PROPERTY_DEMANDS } from '../models/property.data';

export interface DetailPropertyPostProps {
  post: PropertyDemand;
}

export const DetailPropertyPost: React.FC<DetailPropertyPostProps> = ({ post }) => {
  const isBuy = post.needType === 'BUY';
  const cleanPhone = post.authorPhone.replace(/\./g, '').replace(/\s+/g, '');

  // Parse description into paragraphs and checklist
  const paragraphs: React.ReactNode[] = [];
  const checklists: string[] = [];

  const lines = post.description.split('\n');
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('-')) {
      checklists.push(trimmed.substring(1).trim());
    } else if (trimmed.length > 0) {
      if (!trimmed.toLowerCase().includes('yêu cầu cụ thể')) {
        paragraphs.push(
          <p key={index} className="text-[14px] text-slate-600 leading-relaxed">
            {trimmed}
          </p>
        );
      }
    }
  });

  return (
    <div className="w-full bg-[#f8f9fc] min-h-screen pb-16 font-sans">
      
      {/* Top Bar with Breadcrumbs & Status */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Custom minimal breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <Link href="/posts" className="hover:text-emerald-600 transition-colors">{post.province}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <Link href="/posts" className="hover:text-emerald-600 transition-colors">{post.propertyType}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-900 font-bold">#{post.id.padStart(4, '0')} {post.district}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Đang thẩm định & chờ mặt bằng
            </span>
            <span className="text-slate-400 text-[11px] font-medium hidden sm:block">
              Mã tin: {post.authorCode}-{post.id.padStart(4, '0')}
            </span>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* LEFT COLUMN */}
          <div className="w-full lg:w-[68%] space-y-5">
            
            {/* Main Header Card */}
            <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-sm border border-slate-100">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3.5 py-1.5 bg-[#0f2e24] text-white text-[11px] font-bold rounded-full tracking-wide">
                    {isBuy ? 'CẦN MUA GẤP' : 'CẦN THUÊ GẤP'}
                  </span>
                  <span className="px-3.5 py-1.5 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-full">
                    {post.propertyType}
                  </span>
                </div>
                <div className="text-slate-400 text-[11px] font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Cập nhật {post.timeAgo}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-[22px] sm:text-[28px] font-black text-[#0f2e24] leading-[1.3] mb-6">
                {post.title}
              </h1>

              {/* Location Target Box */}
              <div className="p-4 rounded-2xl border border-emerald-200 bg-white shadow-sm flex items-start sm:items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-rose-500 flex items-center justify-center shrink-0 shadow-sm shadow-rose-200">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1 flex flex-col gap-2.5">
                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-md w-fit">
                      Khu Vực Tìm Kiếm Mục Tiêu
                    </span>
                    <span className="text-base sm:text-lg font-black text-slate-900">
                      {post.district}, {post.province}
                    </span>
                  </div>
                  
                  {/* Bottom row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1 mr-1">
                      <span className="text-sm">⭐</span> Ưu tiên cao nhất:
                    </span>
                    {post.location.split(',').slice(0, 3).map((loc, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full border border-emerald-100 text-emerald-700 text-[11px] font-bold flex items-center gap-1 bg-white hover:bg-emerald-50 transition-colors">
                        <MapPin className="w-3 h-3 text-rose-500" /> {loc.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-[20px] bg-slate-50/50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Maximize className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 mb-1">Diện tích</p>
                  <p className="text-sm font-black text-slate-900">{post.area}</p>
                </div>
                
                <div className="p-4 rounded-[20px] bg-slate-50/50 border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <CircleDollarSign className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 mb-1">Ngân sách tối đa</p>
                  <p className="text-sm font-black text-rose-600">{post.price.split(' - ')[1] || post.price}</p>
                </div>

                <div className="p-4 rounded-[20px] bg-slate-50/50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 mb-1">Yêu cầu pháp lý</p>
                  <p className="text-sm font-black text-slate-900 truncate" title={post.legal}>{post.legal || 'An toàn'}</p>
                </div>

                <div className="p-4 rounded-[20px] bg-slate-50/50 border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Compass className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 mb-1">Hướng mong muốn</p>
                  <p className="text-sm font-black text-slate-900 truncate">{post.direction || 'Không y/c'}</p>
                </div>
              </div>

            </div>

            {/* Detailed Requirements Box */}
            <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-sm border border-slate-100">
              
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-6 rounded-full bg-[#0f2e24]" />
                <h2 className="text-lg font-black text-slate-900">Chi Tiết Nhu Cầu & Tiêu Chuẩn Thuê</h2>
              </div>
              
              <div className="space-y-6">
                {/* Paragraphs */}
                <div className="space-y-2">
                  {paragraphs}
                </div>
                
                {/* Checklist Box */}
                {checklists.length > 0 && (
                  <div className="bg-[#f8f9fc] rounded-[20px] p-5 sm:p-6 border border-slate-100/80">
                    <div className="flex items-center gap-2 mb-5">
                      <ClipboardList className="w-4 h-4 text-slate-600" />
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                        Checklist Tiêu Chuẩn Mặt Bằng Bắt Buộc:
                      </h3>
                    </div>
                    
                    <div className="space-y-5">
                      {checklists.map((item, idx) => {
                        const parts = item.split(':');
                        return (
                          <div key={idx} className="flex items-start gap-3.5 group">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500 transition-colors">
                              <Check className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white stroke-[3] transition-colors" />
                            </div>
                            <p className="text-[14px] text-slate-600 leading-[1.6]">
                              {parts.length > 1 ? (
                                <>
                                  <strong className="text-slate-900">{parts[0]}:</strong>
                                  {parts.slice(1).join(':')}
                                </>
                              ) : (
                                item
                              )}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Trust Badge / Alert */}
              <div className="mt-8 p-5 rounded-[20px] bg-emerald-50 border border-emerald-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-200">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-black text-emerald-900 mb-1">Thẩm định khách thuê thật 100%</p>
                  <p className="text-xs text-emerald-800/80 leading-relaxed">
                    Khách thuê có pháp nhân công ty rõ ràng, sẵn sàng ký hợp đồng và cọc tiền ngay khi tìm được mặt bằng ưng ý.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN - Sticky Sidebar */}
          <div className="w-full lg:w-[32%]">
            <div className="sticky top-24 space-y-5">
              
              {/* Budget Highlight Card */}
              <div className="bg-[#0f2e24] rounded-[24px] p-6 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150" />
                
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <p className="text-[11px] font-bold text-emerald-100/70 uppercase tracking-widest">Ngân sách đề xuất</p>
                  <span className="px-2.5 py-1 rounded-md bg-[#FFC700] text-[#0f2e24] text-[10px] font-black uppercase tracking-wide shadow-sm">
                    Ưu tiên duyệt
                  </span>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-[28px] font-black text-[#FFC700] mb-2 leading-tight flex flex-wrap items-baseline gap-1.5">
                    {post.price.split('/')[0]} 
                    {post.price.includes('/') && (
                      <span className="text-sm text-emerald-50 font-bold">
                        /{post.price.split('/').slice(1).join('/')}
                      </span>
                    )}
                  </h3>
                  <p className="text-[13px] text-emerald-100/70 leading-relaxed font-medium pr-4">
                    Khách có sẵn tài chính đặt cọc 3 tháng và thanh toán định kỳ đều đặn.
                  </p>
                </div>
              </div>

              {/* Author / Contact Card */}
              <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-100 shadow-sm">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Thông tin người đăng</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Online</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#0f2e24] text-white flex items-center justify-center font-black text-lg shadow-md relative shrink-0">
                    {post.authorName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    {post.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-black text-slate-900 mb-0.5">{post.authorName}</h3>
                    <div className="flex flex-col gap-1.5">
                      <span className="w-max px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Hội viên KC VIP
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Tài khoản chính chủ đã liên kết</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="w-full h-12 rounded-[16px] bg-[#0f2e24] hover:bg-black text-white text-[13px] font-bold flex items-center justify-center gap-3 shadow-sm transition-all hover:shadow-md"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Gọi trực tiếp</span>
                    <span className="text-[#FFC700] ml-2 text-[15px]">{post.authorPhone}</span>
                  </a>
                  
                  <a
                    href={`https://zalo.me/${cleanPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 rounded-[16px] bg-[#eff6ff] hover:bg-[#dbeafe] text-[#2563eb] text-[13px] font-bold flex items-center justify-center gap-2 transition-all border border-transparent hover:border-[#bfdbfe]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Nhắn tin qua Zalo (Phản hồi nhanh)</span>
                  </a>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Hệ thống bảo vệ quyền riêng tư & chống spam
                </div>
              </div>

              {/* Call To Action Box */}
              <div className="bg-gradient-to-br from-[#0f2e24] to-[#071712] rounded-[24px] p-6 shadow-xl relative overflow-hidden group cursor-pointer">
                <Zap className="absolute -top-4 -right-4 w-24 h-24 text-emerald-500/10 rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 mb-3 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                    <Zap className="w-3.5 h-3.5" />
                    Dành cho chủ nhà & Môi giới
                  </div>
                  
                  <h3 className="text-xl font-black text-white mb-3 leading-tight">
                    Bạn Có Mặt Bằng Phù Hợp?
                  </h3>
                  
                  <p className="text-[12px] text-emerald-100/70 mb-6 leading-relaxed font-medium">
                    Gửi nhanh thông tin mặt bằng của bạn để hệ thống kết nối trực tiếp với anh {post.authorName.split(' ').pop()} xem nhà trong ngày.
                  </p>
                  
                  <button 
                    type="button"
                    className="w-full h-12 rounded-xl bg-[#FFC700] text-[#0f2e24] text-[13px] font-black shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group-hover:bg-[#E6B200]"
                  >
                    Gửi Đề Xuất Mặt Bằng Ngay
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default DetailPropertyPost;
