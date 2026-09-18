// frontend/src/modules/client/property/components/PropertyCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  MapPin,
  Armchair,
  Coins,
  Clock,
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

  const locationParts = post.location.split(' - ');
  const pickup = locationParts[0];
  const dropoff = locationParts.length > 1 ? locationParts.slice(1).join(' - ') : 'Chưa xác định';
  
  const getArrivalTime = (timeStr?: string) => {
    if (!timeStr) return '10:00';
    const [h, m] = timeStr.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return '10:00';
    const newH = (h + 2) % 24;
    return `${newH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };
  
  const arrivalTime = getArrivalTime(post.direction);
  const departureTime = post.direction || '08:00';

  const handleCardClick = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group/card overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md cursor-pointer p-3 sm:p-4"
    >
      <div className="flex flex-col gap-3">
        {/* Top: Header & Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-extrabold text-slate-700">{post.authorName}</span>
            <span className="rounded-md bg-brand-light px-2 py-0.5 text-[11px] font-extrabold text-brand">
              {post.propertyType}
            </span>
            <span className="flex items-center gap-1 rounded-md bg-amber-50 border border-amber-100 px-2 py-0.5 text-[11px] font-extrabold text-amber-700">
              <Armchair className="h-3 w-3" />
              {post.area}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500">Giá từ</span>
              <span className="text-lg font-black text-brand">{post.price.split(' - ')[0]}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <Link href={`/posts/${post.id}`} className="block" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-base leading-snug font-black text-slate-950 transition-colors group-hover/card:text-brand line-clamp-1">
            {post.title}
          </h3>
        </Link>

        {/* Bottom: Timeline and Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-3 flex-1 w-full max-w-lg">
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className="text-base font-black text-slate-900">{departureTime}</span>
              <span className="text-[11px] font-semibold text-slate-500 line-clamp-1">{pickup}</span>
            </div>
            
            <div className="flex items-center w-12 sm:w-16 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-brand" />
              <div className="flex-1 h-[1.5px] bg-slate-300" />
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            </div>

            <div className="flex flex-col flex-1 text-right overflow-hidden">
              <span className="text-base font-black text-slate-900">{arrivalTime}</span>
              <span className="text-[11px] font-semibold text-slate-500 line-clamp-1">{dropoff}</span>
            </div>
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
            className="inline-flex h-9 shrink-0 w-full sm:w-auto items-center justify-center gap-1.5 rounded-lg bg-accent px-5 text-sm font-black text-white shadow-sm transition-colors hover:bg-accent-hover"
          >
            <Ticket className="h-4 w-4" />
            {isBuy ? 'Đặt vé' : 'Tạo đơn'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
