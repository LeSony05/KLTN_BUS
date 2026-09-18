'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Package, MapPin, Calculator, ShieldAlert, ArrowRight, Truck } from 'lucide-react';
import ClientLayout from '@/modules/client/common/layouts/ClientLayout';

export default function SendFreightPage() {
  const router = useRouter();
  const [weight, setWeight] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string>('normal');
  
  const calculateFee = () => {
    let base = 50000; // 50k base
    if (weight > 5) base += (weight - 5) * 10000;
    if (selectedType === 'fragile') base += 20000;
    if (selectedType === 'valuable') base += 50000;
    return base;
  };

  const fee = calculateFee();

  return (
    <ClientLayout>
      <div className="min-h-screen bg-[#F8FAF9] py-8 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3">
            <Truck className="w-8 h-8 text-brand" />
            Tạo vận đơn ký gửi hàng hóa
          </h1>
          <p className="text-sm text-slate-500 mt-2">Dịch vụ chuyển phát nhanh theo tuyến xe khách</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-500" />
                Tuyến vận chuyển
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Nơi gửi</label>
                  <select className="w-full h-11 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-semibold text-slate-800 bg-white">
                    <option>Bến xe Miền Đông, TP. HCM</option>
                    <option>Bến xe Miền Tây, TP. HCM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Nơi nhận</label>
                  <select className="w-full h-11 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-semibold text-slate-800 bg-white">
                    <option>Bến xe trung tâm, Đà Lạt</option>
                    <option>Bến xe trung tâm, Nha Trang</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-500" />
                Thông tin kiện hàng
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Loại hàng hóa</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'normal', label: 'Hàng thường' },
                      { id: 'fragile', label: 'Dễ vỡ' },
                      { id: 'valuable', label: 'Giá trị cao' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`h-11 rounded-xl text-sm font-bold border transition-colors ${
                          selectedType === type.id 
                            ? 'bg-brand/10 border-brand text-brand' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Khối lượng ước tính (kg)</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      min="0"
                      value={weight || ''}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      placeholder="Nhập số kg" 
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-semibold"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 flex gap-3 text-sm text-amber-800 border border-amber-100 mt-4">
                  <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>
                    <strong>Lưu ý:</strong> Chúng tôi từ chối vận chuyển các loại hàng hóa thuộc danh mục cấm (vũ khí, chất nổ, động vật sống...). Nhà xe có quyền kiểm tra nội dung kiện hàng trước khi nhận.
                  </p>
                </div>
              </div>
            </div>
          </div>

            {/* Cột phải: Tính phí */}
            <div className="w-full lg:w-[380px] shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-brand" /> Dự tính cước phí
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-semibold">Cước cơ bản (5kg đầu):</span>
                    <span className="font-bold text-slate-900">50.000đ</span>
                  </div>
                  {weight > 5 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-semibold">Phụ phí vượt mức:</span>
                      <span className="font-bold text-slate-900">{((weight - 5) * 10000).toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}
                  {selectedType === 'fragile' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-semibold">Phụ phí hàng dễ vỡ:</span>
                      <span className="font-bold text-slate-900">20.000đ</span>
                    </div>
                  )}
                  {selectedType === 'valuable' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 font-semibold">Bảo hiểm hàng giá trị:</span>
                      <span className="font-bold text-slate-900">50.000đ</span>
                    </div>
                  )}
                  
                  <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-base font-black text-slate-800">Tổng tiền</span>
                    <span className="text-2xl font-black text-rose-600">{fee.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>

                <button 
                  onClick={() => router.push('/payment')}
                  className="w-full h-12 bg-accent text-white font-black text-base rounded-xl hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
                >
                  Tạo mã vận đơn
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <p className="text-xs text-center text-slate-500 mt-4">
                  Mang kiện hàng và mã vận đơn ra bến xe để hoàn tất thủ tục gửi hàng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
