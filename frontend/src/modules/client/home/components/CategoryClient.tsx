// frontend/src/modules/client/home/components/CategoryClient.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import {
  Layers,
  Home,
  Building2,
  Building,
  Store,
  Warehouse,
  MapPin,
  Flame,
} from 'lucide-react';

export const CategoryClient: React.FC = () => {
  const categories = [
    {
      id: 'land',
      title: 'Đất nền',
      desc: 'Nhu cầu mua & thuê',
      icon: <Layers className="w-6 h-6 text-[#143D30]" />,
    },
    {
      id: 'townhouse',
      title: 'Nhà phố',
      desc: 'Mặt tiền & hẻm xe hơi',
      icon: <Home className="w-6 h-6 text-[#143D30]" />,
    },
    {
      id: 'villa',
      title: 'Biệt thự / Liền kề',
      desc: 'Khu đô thị & nghỉ dưỡng',
      icon: <Building2 className="w-6 h-6 text-[#143D30]" />,
    },
    {
      id: 'apartment',
      title: 'Căn hộ chung cư',
      desc: '1 - 3 phòng ngủ cao cấp',
      icon: <Building className="w-6 h-6 text-[#143D30]" />,
    },
    {
      id: 'shophouse',
      title: 'Mặt bằng kinh doanh',
      desc: 'Khu phố sầm uất',
      icon: <Store className="w-6 h-6 text-[#143D30]" />,
    },
    {
      id: 'warehouse',
      title: 'Kho xưởng / Nhà máy',
      desc: 'Khu công nghiệp',
      icon: <Warehouse className="w-6 h-6 text-[#143D30]" />,
    },
    {
      id: 'garden',
      title: 'Đất vườn & Nghỉ dưỡng',
      desc: 'Ven đô & trang trại',
      icon: <MapPin className="w-6 h-6 text-[#143D30]" />,
    },
    {
      id: 'urgent',
      title: 'Nhu cầu mua gấp',
      desc: 'Tài chính sẵn sàng',
      icon: <Flame className="w-6 h-6 text-amber-600" />,
    },
  ];

  return (
    <section className="py-16 bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Danh Mục Nhu Cầu Bất Động Sản
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Khám phá các phân khúc bất động sản được nhiều hội viên quan tâm tìm kiếm nhất
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/posts?category=${cat.id}`}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-emerald-700/40 cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50/80 border border-emerald-100 flex items-center justify-center mb-3">
                {cat.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-[#143D30]">
                {cat.title}
              </h3>
              <p className="text-xs text-slate-400 font-medium">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
