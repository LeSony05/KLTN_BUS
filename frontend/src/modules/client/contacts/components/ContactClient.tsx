// frontend/src/modules/client/contacts/components/ContactClient.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '../../../../common/components/ui/Button';
import { Input } from '../../../../common/components/ui/Input';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

export const ContactClient: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto my-12 px-4 font-sans space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Liên Hệ Ban Quản Trị
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Mọi thắc mắc về tài khoản hội viên, hỗ trợ kỹ thuật hoặc hợp tác, vui lòng gửi tin nhắn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Thông tin liên hệ */}
        <div className="bg-[#113327] text-white p-6 rounded-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-amber-400">Thông Tin Liên Hệ</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hệ thống kết nối bất động sản King Connect Land hoạt động 24/7 nhằm hỗ trợ hội viên tối đa.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-200">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>TP. Hồ Chí Minh & các tỉnh lân cận</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>0900.000.000</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>contact@kingconnectland.vn</span>
              </p>
            </div>
          </div>

          <div className="p-4 bg-white/10 rounded-xl text-[11px] text-slate-300 border border-white/10">
            Giờ làm việc: Thứ 2 — Thứ 7 (8:00 — 18:00)
          </div>
        </div>

        {/* Form liên hệ */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          {isSent ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">Gửi Tin Nhắn Thành Công!</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Cảm ơn bạn đã liên hệ. Ban quản trị sẽ phản hồi lại bạn qua số điện thoại hoặc email trong thời gian sớm nhất.
              </p>
              <button
                type="button"
                onClick={() => setIsSent(false)}
                className="mt-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
              >
                Gửi thêm tin nhắn
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Họ và tên"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  isRequired
                />
                <Input
                  label="Số điện thoại"
                  placeholder="Ví dụ: 0912345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  isRequired
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Email (tùy chọn)"
                  placeholder="example@gmail.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Tiêu đề yêu cầu"
                  placeholder="Ví dụ: Hỗ trợ kích hoạt tài khoản"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  isRequired
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Nội dung liên hệ <span className="text-rose-600">*</span>:
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nhập nội dung cần hỗ trợ chi tiết..."
                  className="w-full bg-white text-slate-900 text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:border-[#143D30] outline-none"
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                <Send className="w-4 h-4 mr-1.5" />
                <span>GỬI YÊU CẦU LIÊN HỆ</span>
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
