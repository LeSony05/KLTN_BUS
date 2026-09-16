// frontend/src/modules/client/property/components/PropertyCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Building2,
  MapPin,
  Ruler,
  Coins,
  Clock,
  MessageCircle,
  Send,
} from 'lucide-react';
import type { PropertyDemand } from '../models/property.model';

interface PropertyCardProps {
  post: PropertyDemand;
  onOpenQuote?: (post: PropertyDemand) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ post, onOpenQuote }) => {
  const router = useRouter();
  const isBuy = post.needType === 'BUY';
  const cleanPhone = post.authorPhone.replace(/\./g, '').replace(/\s+/g, '');

  const handleCardClick = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#143D30]/40 shadow-sm hover:shadow-md transition-shadow duration-150 p-4 sm:p-5 flex flex-col justify-between gap-3.5 cursor-pointer group/card"
    >
      {/* Top Header: Badge + Time */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
              isBuy
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}
          >
            <Building2 className="w-3 h-3" />
            {isBuy ? 'Cần mua' : 'Cần thuê'}
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
            <Clock className="w-3 h-3" />
            {post.timeAgo}
          </span>
        </div>

        {/* Title */}
        <Link href={`/posts/${post.id}`} className="group block" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#143D30] group-hover/card:text-[#143D30] transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
        </Link>
      </div>

      {/* Main Specs: Ngân sách, Diện tích, Loại BĐS */}
      <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
        {/* Price */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-100/60 text-[#143D30] flex items-center justify-center flex-shrink-0">
            <Coins className="w-3 h-3" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-slate-500 font-medium uppercase">Ngân sách</p>
            <p className="font-extrabold text-[#143D30] truncate text-xs">{post.price}</p>
          </div>
        </div>

        {/* Area */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-100/60 text-amber-800 flex items-center justify-center flex-shrink-0">
            <Ruler className="w-3 h-3" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-slate-500 font-medium uppercase">Diện tích</p>
            <p className="font-bold text-slate-800 truncate text-xs">{post.area}</p>
          </div>
        </div>

        {/* Property Type */}
        <div className="col-span-2 flex items-center gap-2 pt-1 border-t border-slate-200/50">
          <div className="w-6 h-6 rounded-lg bg-slate-200/60 text-slate-700 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-3 h-3" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-slate-500 font-medium uppercase">Loại BĐS</p>
            <p className="font-semibold text-slate-700 truncate text-xs">{post.propertyType}</p>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-1.5 text-xs text-slate-600">
        <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
        <span className="line-clamp-1 font-medium">{post.location}</span>
      </div>

      {/* Footer: 2 Buttons: Gửi Báo Giá (Mở Modal) & Zalo */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenQuote?.(post);
          }}
          className="col-span-2 py-2 px-3 rounded-xl bg-[#143D30] hover:bg-[#0e2a20] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Gửi Báo Giá</span>
        </button>

        <a
          href={`https://zalo.me/${cleanPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="col-span-1 py-2 px-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200/80 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
          title="Chat Zalo"
        >
          <MessageCircle className="w-3.5 h-3.5 text-sky-600" />
          <span>Zalo</span>
        </a>
      </div>
    </div>
  );
};

export default PropertyCard;
