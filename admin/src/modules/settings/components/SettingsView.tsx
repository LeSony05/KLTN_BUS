// admin/src/modules/settings/components/SettingsView.tsx
import React, { useState } from 'react';
import { Save, Building2, CheckCircle2 } from 'lucide-react';
import type { AdminBankConfig } from '../models/settings.model';

export const SettingsView: React.FC = () => {
  const [bank1, setBank1] = useState<AdminBankConfig>({
    bankName: 'Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank)',
    accountNumber: '1029384756',
    accountHolder: 'NGUYEN TAN DONG - HOI KING CONNECT LAND',
    branch: 'Chi nhánh TP. Hồ Chí Minh',
  });

  const [bank2, setBank2] = useState<AdminBankConfig>({
    bankName: 'Ngân hàng TMCP Quân Đội (MB Bank)',
    accountNumber: '888899998888',
    accountHolder: 'HOI BAT DONG SAN KING CONNECT LAND',
    branch: 'Hội sở chính',
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Cài Đặt Banner & Thông Tin Quỹ Đóng Góp
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Cấu hình 2 tài khoản ngân hàng hiển thị trên trang Đóng góp tự nguyện của User Portal.
        </p>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl font-bold flex items-center gap-2 text-sm shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
          <span>Đã lưu cấu hình tài khoản đóng góp thành công!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Tài khoản 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center gap-2 text-sm font-extrabold text-[#143D30] border-b border-slate-100 pb-3">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>Tài Khoản Ngân Hàng Số 1 (Chính)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Tên Ngân hàng:
              </label>
              <input
                type="text"
                value={bank1.bankName}
                onChange={(e) => setBank1({ ...bank1, bankName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:border-[#143D30] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Số Tài Khoản:
              </label>
              <input
                type="text"
                value={bank1.accountNumber}
                onChange={(e) => setBank1({ ...bank1, accountNumber: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm font-bold text-amber-700 focus:bg-white focus:border-[#143D30] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Tên Chủ Tài Khoản:
              </label>
              <input
                type="text"
                value={bank1.accountHolder}
                onChange={(e) => setBank1({ ...bank1, accountHolder: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:border-[#143D30] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Chi Nhánh:
              </label>
              <input
                type="text"
                value={bank1.branch}
                onChange={(e) => setBank1({ ...bank1, branch: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:border-[#143D30] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Tài khoản 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center gap-2 text-sm font-extrabold text-[#143D30] border-b border-slate-100 pb-3">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>Tài Khoản Ngân Hàng Số 2 (Dự phòng)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Tên Ngân hàng:
              </label>
              <input
                type="text"
                value={bank2.bankName}
                onChange={(e) => setBank2({ ...bank2, bankName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:border-[#143D30] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Số Tài Khoản:
              </label>
              <input
                type="text"
                value={bank2.accountNumber}
                onChange={(e) => setBank2({ ...bank2, accountNumber: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm font-bold text-amber-700 focus:bg-white focus:border-[#143D30] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Tên Chủ Tài Khoản:
              </label>
              <input
                type="text"
                value={bank2.accountHolder}
                onChange={(e) => setBank2({ ...bank2, accountHolder: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:border-[#143D30] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Chi Nhánh:
              </label>
              <input
                type="text"
                value={bank2.branch}
                onChange={(e) => setBank2({ ...bank2, branch: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:border-[#143D30] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#143D30] hover:bg-[#0e2a20] text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>LƯU CẤU HÌNH</span>
          </button>
        </div>
      </form>
    </div>
  );
};
