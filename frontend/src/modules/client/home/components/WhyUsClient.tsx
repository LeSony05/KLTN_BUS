// frontend/src/modules/client/home/components/WhyUsClient.tsx
'use client';

import React from 'react';
import { ShieldCheck, Users, Zap, Lock } from 'lucide-react';

export const WhyUsClient: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#143D30]" />,
      title: 'Nhu Cầu Xác Thực 100%',
      desc: 'Mỗi bài đăng đều được kiểm duyệt kỹ lưỡng trước khi hiển thị, loại bỏ hoàn toàn tin ảo và môi giới rác.',
    },
    {
      icon: <Users className="w-6 h-6 text-[#143D30]" />,
      title: 'Cộng Đồng Hội Viên Uy Tín',
      desc: 'Mạng lưới chuyên nghiệp các nhà đầu tư và môi giới chính thống với mã hội viên định danh rõ ràng.',
    },
    {
      icon: <Zap className="w-6 h-6 text-[#143D30]" />,
      title: 'Kết Nối Trực Tiếp & Nhanh Chóng',
      desc: 'Liên hệ người đăng qua Zalo hoặc Hotline chỉ với một chạm, rút ngắn 80% thời gian tìm kiếm nguồn hàng.',
    },
    {
      icon: <Lock className="w-6 h-6 text-[#143D30]" />,
      title: 'Bảo Mật & Minh Bạch Tuyệt Đối',
      desc: 'Thông tin cá nhân được bảo vệ theo tiêu chuẩn, quy chế hoạt động công khai và công bằng cho mọi hội viên.',
    },
  ];

  return (
    <section className="py-16 bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Vì Sao Chọn King Connect Land?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Giải pháp chuyên biệt giải quyết bài toán tìm kiếm khách hàng và nguồn hàng bất động sản
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50/80 border border-emerald-100 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
