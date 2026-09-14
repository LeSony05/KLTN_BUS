// frontend/src/modules/client/property/components/DetailPropertyPost.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  Phone,
  MessageCircle,
  Ruler,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Compass,
  FileText,
  AlertTriangle,
  Share2,
  Send,
  Eye,
  Check,
} from 'lucide-react';
import type { PropertyDemand } from '../models/property.model';
import { MOCK_PROPERTY_DEMANDS } from '../models/property.data';
import { PropertyCard } from './PropertyCard';
import { QuoteModal } from './QuoteModal';

export interface DetailPropertyPostProps {
  post: PropertyDemand;
}

export const DetailPropertyPost: React.FC<DetailPropertyPostProps> = ({ post }) => {
  const [copied, setCopied] = useState(false);
  const [quoteModalPost, setQuoteModalPost] = useState<PropertyDemand | null>(null);

  const isBuy = post.needType === 'BUY';
  const cleanPhone = post.authorPhone.replace(/\./g, '').replace(/\s+/g, '');

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Related posts (same needType, different id)
  const relatedPosts = MOCK_PROPERTY_DEMANDS.filter(
    (p) => p.needType === post.needType && p.id !== post.id
  ).slice(0, 2);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 font-sans">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/posts"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#143D30] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách tin đăng</span>
        </Link>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 transition-colors shadow-2xs cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Đã chép link!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Chia sẻ tin</span>
            </>
          )}
        </button>
      </div>

      {/* Main Post Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
        {/* Top Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                isBuy
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-blue-50 text-blue-800 border border-blue-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{isBuy ? 'Cần mua BĐS' : 'Cần thuê BĐS'}</span>
            </span>

            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-mono font-bold">
              Mã tin: #{post.id.padStart(4, '0')}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Ngày đăng: {post.createdAt}</span>
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>128 lượt xem</span>
            </span>
          </div>
        </div>

        {/* Post Title */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
          {post.title}
        </h1>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
          <div className="space-y-1">
            <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-amber-600" />
              <span>Ngân sách dự kiến</span>
            </p>
            <p className="text-sm sm:text-base font-black text-[#143D30]">{post.price}</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
              <Ruler className="w-3.5 h-3.5 text-emerald-600" />
              <span>Diện tích mong muốn</span>
            </p>
            <p className="text-sm sm:text-base font-bold text-slate-800">{post.area}</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-600" />
              <span>Loại Bất động sản</span>
            </p>
            <p className="text-sm font-bold text-slate-800">{post.propertyType}</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Yêu cầu pháp lý</span>
            </p>
            <p className="text-sm font-bold text-slate-800">{post.legal || 'Sổ hồng/Sổ đỏ chính chủ'}</p>
          </div>

          <div className="col-span-2 space-y-1">
            <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Khu vực tìm kiếm</span>
            </p>
            <p className="text-sm font-bold text-slate-800">{post.location}</p>
          </div>

          {post.direction && (
            <div className="space-y-1">
              <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-purple-600" />
                <span>Hướng nhà đất</span>
              </p>
              <p className="text-sm font-bold text-slate-800">{post.direction}</p>
            </div>
          )}

          {post.note && (
            <div className="space-y-1">
              <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Ghi chú riêng</span>
              </p>
              <p className="text-xs font-semibold text-slate-700">{post.note}</p>
            </div>
          )}
        </div>

        {/* Detailed Requirement Description */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#143D30]" />
            <span>Mô tả chi tiết yêu cầu</span>
          </h2>
          <div className="p-5 bg-white rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-2">
            {post.description}
          </div>
        </div>

        {/* Author Contact Box */}
        <div className="p-6 bg-gradient-to-br from-emerald-50/70 to-emerald-100/30 border border-emerald-200/80 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#143D30] text-white flex items-center justify-center font-black text-xl shadow-md uppercase">
              {post.authorName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">{post.authorName}</h3>
                {post.isVerified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Đã xác minh
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Mã hội viên: <strong className="text-slate-700">{post.authorCode}</strong>
              </p>
              <p className="text-xs font-bold text-[#143D30] font-mono mt-1">{post.authorPhone}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={`tel:${cleanPhone}`}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#143D30] hover:bg-[#0f2e24] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Gọi trực tiếp</span>
            </a>

            <a
              href={`https://zalo.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat Zalo</span>
            </a>

            <button
              type="button"
              onClick={() => setQuoteModalPost(post)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Gửi báo giá BĐS</span>
            </button>
          </div>
        </div>

        {/* Safe Trading Notice */}
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 flex items-start gap-3 text-xs text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">Lưu ý an toàn khi kết nối giao dịch BĐS</p>
            <p className="text-amber-800/90 leading-relaxed text-[11px]">
              King Connect Land là nền tảng kết nối nhu cầu trực tiếp. Quý hội viên và khách hàng vui lòng kiểm tra kỹ giấy tờ pháp lý trước khi đặt cọc hoặc thực hiện bất kỳ giao dịch tài chính nào.
            </p>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wide">
              Tin Đăng Cùng Danh Mục
            </h3>
            <Link
              href="/posts"
              className="text-xs font-bold text-[#143D30] hover:underline"
            >
              Xem tất cả
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Quote Modal */}
      <QuoteModal
        post={quoteModalPost}
        isOpen={!!quoteModalPost}
        onClose={() => setQuoteModalPost(null)}
      />
    </div>
  );
};

export default DetailPropertyPost;
