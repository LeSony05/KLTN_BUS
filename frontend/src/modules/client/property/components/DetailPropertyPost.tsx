'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  Calendar,
  Phone,
  MessageCircle,
  Ruler,
  Compass,
  FileText,
  AlertTriangle,
  Share2,
  Send,
  Eye,
  Check,
  X,
  BedDouble,
  Bath,
  CheckCircle,
  CheckCircle2,
  Map,
} from 'lucide-react';
import type { PropertyDemand } from '../models/property.model';
import { MOCK_PROPERTY_DEMANDS } from '../models/property.data';
import { PropertyCard } from './PropertyCard';
import { QuoteModal } from './QuoteModal';
import { Breadcrumb } from '@/common/components/ui/Breadcrumb';

export interface DetailPropertyPostProps {
  post: PropertyDemand;
}

export const DetailPropertyPost: React.FC<DetailPropertyPostProps> = ({ post }) => {
  const [copied, setCopied] = useState(false);
  const [quoteModalPost, setQuoteModalPost] = useState<PropertyDemand | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isBuy = post.needType === 'BUY';
  const cleanPhone = post.authorPhone.replace(/\./g, '').replace(/\s+/g, '');

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Related posts
  const relatedPosts = MOCK_PROPERTY_DEMANDS.filter(
    (p) => p.needType === post.needType && p.id !== post.id
  ).slice(0, 3);

  return (
    <div className="w-full bg-[#fcfcfd] min-h-screen pb-12 font-sans">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: post.needType === 'BUY' ? 'Bất động sản bán' : 'Bất động sản thuê', href: '/posts' },
            { label: post.district, href: '/posts' },
          ]}
        />

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                  isBuy
                    ? 'bg-emerald-500 text-white'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {isBuy ? 'ĐANG BÁN' : 'CHO THUÊ'}
              </span>
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {post.timeAgo}
              </span>
              <span className="text-xs font-medium text-slate-400">
                • Mã tin: #{post.id.padStart(4, '0')}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#0f2e24] leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-start gap-1.5 text-sm text-slate-500 font-medium">
              <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>{post.location}</span>
            </div>
          </div>

          <div className="flex flex-col md:items-end text-left md:text-right shrink-0">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Giá Niêm Yết</p>
            <p className="text-3xl sm:text-4xl font-black text-red-600 leading-none mb-1">{post.price}</p>
            <p className="text-xs font-bold text-slate-400">~ 35.7 Triệu / m²</p>
          </div>
        </div>

        {/* Image Gallery 1 + 4 */}
        {post.images && post.images.length > 0 && (
          <div className="flex flex-col md:flex-row gap-3 h-[300px] sm:h-[400px] lg:h-[460px]">
            {/* Big Image */}
            <div 
              className="w-full md:w-1/2 h-full rounded-2xl overflow-hidden cursor-pointer group relative shrink-0"
              onClick={() => setSelectedImage(post.images![0])}
            >
              <img src={post.images[0]} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>

            {/* Small Images Grid */}
            <div className="hidden md:grid w-1/2 h-full grid-cols-2 grid-rows-2 gap-3">
              {post.images.slice(1, 4).map((img, idx) => (
                <div 
                  key={idx} 
                  className="w-full h-full rounded-2xl overflow-hidden cursor-pointer group relative"
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt={`${post.title} ${idx + 2}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              ))}
              
              {/* 5th Image with Overlay */}
              {post.images.length >= 5 && (
                <div 
                  className="w-full h-full rounded-2xl overflow-hidden cursor-pointer group relative"
                  onClick={() => setSelectedImage(post.images![4])}
                >
                  <img src={post.images[4]} alt={`${post.title} 5`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/60 transition-colors flex items-center justify-center">
                    <span className="text-white font-bold text-sm flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Xem thêm {post.images.length - 4} ảnh
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content & Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 pt-4">
          
          {/* LEFT COLUMN - Main Content */}
          <div className="w-full lg:w-[68%] space-y-6">
            
            {/* Quick Specs Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm border border-slate-100">
                <Ruler className="w-6 h-6 text-[#0068FF]" />
                <p className="text-[11px] text-slate-500 font-bold uppercase">Diện tích</p>
                <p className="font-black text-slate-900">{post.area}</p>
              </div>
              
              {post.bedrooms !== undefined && (
                <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm border border-slate-100">
                  <BedDouble className="w-6 h-6 text-[#0068FF]" />
                  <p className="text-[11px] text-slate-500 font-bold uppercase">Phòng ngủ</p>
                  <p className="font-black text-slate-900">{post.bedrooms} Phòng</p>
                </div>
              )}

              {post.bathrooms !== undefined && (
                <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm border border-slate-100">
                  <Bath className="w-6 h-6 text-[#0068FF]" />
                  <p className="text-[11px] text-slate-500 font-bold uppercase">Phòng tắm</p>
                  <p className="font-black text-slate-900">{post.bathrooms} WC</p>
                </div>
              )}

              <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm border border-slate-100">
                <Compass className="w-6 h-6 text-[#0068FF]" />
                <p className="text-[11px] text-slate-500 font-bold uppercase">Hướng nhà</p>
                <p className="font-black text-slate-900">{post.direction || 'Không xác định'}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="text-lg font-black text-slate-900 mb-5">Mô Tả Bất Động Sản</h2>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
                {post.description.split('\n\n').map((paragraph, index) => {
                  const colonIndex = paragraph.indexOf(':');
                  if (colonIndex !== -1 && colonIndex < 30) {
                    return (
                      <p key={index}>
                        <strong className="text-slate-900">{paragraph.slice(0, colonIndex + 1)}</strong>
                        {paragraph.slice(colonIndex + 1)}
                      </p>
                    );
                  }
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>
            </div>

            {/* Detailed Specs */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="text-lg font-black text-slate-900 mb-6">Đặc Điểm Chi Tiết</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8 text-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Loại BĐS:</span>
                  <span className="font-bold text-slate-900">{post.propertyType}</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Tình trạng pháp lý:</span>
                  <span className="font-bold text-slate-900">{post.legal || 'Đang cập nhật'}</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Tình trạng nội thất:</span>
                  <span className="font-bold text-slate-900">{post.interior || 'Cơ bản'}</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Số tầng:</span>
                  <span className="font-bold text-slate-900">{post.floors || 'Đang cập nhật'}</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Đường trước nhà:</span>
                  <span className="font-bold text-slate-900">{post.roadWidth || 'Đang cập nhật'}</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-500">Mặt tiền:</span>
                  <span className="font-bold text-slate-900">{post.facade || 'Đang cập nhật'}</span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            {post.amenities && post.amenities.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                <h2 className="text-lg font-black text-slate-900 mb-6">Tiện Ích Đi Kèm</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {post.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map Placeholder */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="text-lg font-black text-slate-900 mb-2">Vị Trí Trên Bản Đồ</h2>
              <p className="text-sm text-slate-500 mb-6">{post.location}</p>
              
              <div className="w-full h-64 bg-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-400 border border-slate-200">
                <Map className="w-12 h-12 mb-3 text-slate-300" />
                <p className="font-bold text-slate-500">Khu vực {post.district}</p>
                <p className="text-xs">Bản đồ sẽ được hiển thị ở đây</p>
              </div>
            </div>
            
          </div>

          {/* RIGHT COLUMN - Sticky Sidebar */}
          <div className="w-full lg:w-[32%]">
            <div className="sticky top-24 space-y-6">
              
              {/* Profile Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#143D30] text-white flex items-center justify-center font-black text-2xl shadow-sm uppercase">
                    {post.authorName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">{post.authorName}</h3>
                    {post.isVerified && (
                      <div className="flex items-center gap-1 text-emerald-600 mt-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="text-xs font-bold">Môi giới xác thực</span>
                      </div>
                    )}
                    {post.memberSince && (
                      <p className="text-xs text-slate-500 mt-1">Thành viên từ {post.memberSince}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="w-full py-3.5 rounded-xl bg-[#0068FF] hover:bg-[#0054d1] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Gọi ngay: {post.authorPhone}</span>
                  </a>
                  
                  <a
                    href={`https://zalo.me/${cleanPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-[#f0f4f8] hover:bg-[#e2e8f0] text-[#0068FF] text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat qua Zalo</span>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-sm font-black text-slate-900 mb-4">Đăng ký xem nhà trực tiếp</h3>
                <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Đã gửi yêu cầu!'); }}>
                  <input 
                    type="text" 
                    placeholder="Họ và tên của bạn" 
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0068FF] focus:ring-1 focus:ring-[#0068FF] transition-all"
                  />
                  <input 
                    type="tel" 
                    placeholder="Số điện thoại liên hệ" 
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0068FF] focus:ring-1 focus:ring-[#0068FF] transition-all"
                  />
                  <textarea 
                    placeholder="Thời gian bạn có thể qua xem (VD: Chiều thứ 7...)" 
                    rows={2}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0068FF] focus:ring-1 focus:ring-[#0068FF] transition-all resize-none"
                  />
                  <button 
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#0f2e24] hover:bg-[#143d30] text-white text-sm font-bold shadow-sm transition-colors mt-2"
                  >
                    Đặt Lịch Hẹn
                  </button>
                </form>
              </div>
              
            </div>
          </div>
          
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-10 pb-6 border-t border-slate-200 mt-10">
            <h3 className="text-xl font-black text-slate-900 mb-6">
              Bất Động Sản Cùng Khu Vực
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((rel) => (
                <PropertyCard
                  key={rel.id}
                  post={rel}
                  onOpenQuote={(p) => setQuoteModalPost(p)}
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Quote Modal */}
      <QuoteModal
        post={quoteModalPost}
        isOpen={!!quoteModalPost}
        onClose={() => setQuoteModalPost(null)}
      />

      {/* Image Viewer Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-sm">
          <button
            type="button"
            className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-[101]"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <div 
            className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <img 
              src={selectedImage} 
              alt="Zoomed property image" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPropertyPost;
