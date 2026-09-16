// frontend/src/modules/client/property/components/PropertyCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Bus,
  CalendarClock,
  CheckCircle2,
  MapPin,
  Armchair,
  Coins,
  Clock,
  ShieldCheck,
  Star,
  Ticket,
} from 'lucide-react';
import type { PropertyDemand } from '../models/property.model';

interface PropertyCardProps {
  post: PropertyDemand;
  onOpenQuote?: (post: PropertyDemand) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ post, onOpenQuote }) => {
  const router = useRouter();
  const isBuy = post.needType === 'BUY';

  const handleCardClick = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg border border-slate-200 hover:border-[#143D30]/40 shadow-sm hover:shadow-md transition-all duration-150 p-4 cursor-pointer group/card"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr_auto] gap-4 lg:items-center">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase ${
                isBuy
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-sky-50 text-sky-800 border border-sky-200'
              }`}
            >
              {isBuy ? <Bus className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
              {isBuy ? 'Chuyến xe' : 'Vận đơn'}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-100 text-[11px] font-extrabold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              4.8
            </span>
            <span className="text-[11px] font-bold text-slate-500">{post.authorName}</span>
          </div>

          <Link href={`/posts/${post.id}`} className="block" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-black text-slate-950 group-hover/card:text-[#143D30] transition-colors">
              {post.title}
            </h3>
          </Link>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-500" />
              {post.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bus className="w-4 h-4 text-[#143D30]" />
              {post.propertyType}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-50 border border-slate-100 p-3">
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase">Giờ đi</p>
            <p className="mt-1 text-sm font-black text-slate-950 flex items-center gap-1">
              <CalendarClock className="w-4 h-4 text-[#143D30]" />
              {post.direction || '08:00'}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase">Còn chỗ</p>
            <p className="mt-1 text-sm font-black text-slate-950 flex items-center gap-1">
              <Armchair className="w-4 h-4 text-amber-600" />
              {post.area}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase">Chính sách</p>
            <p className="mt-1 text-sm font-black text-slate-950 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {post.legal || 'Linh hoạt'}
            </p>
          </div>
        </div>

        <div className="lg:text-right space-y-3">
          <div>
            <p className="text-[11px] font-bold text-slate-400">Giá từ</p>
            <p className="text-xl font-black text-[#143D30] flex lg:justify-end items-center gap-1">
              <Coins className="w-5 h-5 text-amber-600" />
              {post.price.split(' - ')[0]}
            </p>
            <p className="text-[11px] font-semibold text-slate-500 flex lg:justify-end items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.timeAgo}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (isBuy) {
                router.push(`/posts/${post.id}`);
                return;
              }
              onOpenQuote?.(post);
            }}
            className="w-full lg:w-auto h-10 px-5 rounded-lg bg-[#FFC700] hover:bg-[#E6B200] text-[#113327] text-sm font-black inline-flex items-center justify-center gap-2"
          >
            <Ticket className="w-4 h-4" />
            {isBuy ? 'Đặt vé' : 'Tạo vận đơn'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
