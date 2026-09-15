// admin/src/modules/settings/components/BankDonationSettings.tsx
import React from 'react';
import type { AdminBankConfig } from '../models/settings.model';
import { Building2, QrCode, Upload } from 'lucide-react';

interface BankDonationSettingsProps {
  bank1: AdminBankConfig;
  bank2: AdminBankConfig;
  onBank1Change: (config: AdminBankConfig) => void;
  onBank2Change: (config: AdminBankConfig) => void;
}

export const BankDonationSettings: React.FC<BankDonationSettingsProps> = ({
  bank1,
  bank2,
  onBank1Change,
  onBank2Change,
}) => {
  const handleQrUpload1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onBank1Change({ ...bank1, qrCodeUrl: URL.createObjectURL(file) });
    }
  };

  const handleQrUpload2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onBank2Change({ ...bank2, qrCodeUrl: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="space-y-6">
      {/* Bank 1 */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center gap-2 text-sm font-extrabold text-[#11382b] border-b border-slate-100 pb-3">
          <Building2 className="w-5 h-5 text-amber-600" />
          <span>Tài Khoản Ngân Hàng Số 1 (Vietcombank - Chính)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Tên Ngân Hàng:
              </label>
              <input
                type="text"
                value={bank1.bankName}
                onChange={(e) => onBank1Change({ ...bank1, bankName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-normal text-slate-700 focus:bg-white focus:border-[#11382b] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Số Tài Khoản:
              </label>
              <input
                type="text"
                value={bank1.accountNumber}
                onChange={(e) => onBank1Change({ ...bank1, accountNumber: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-normal text-[#11382b] focus:bg-white focus:border-[#11382b] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Tên Chủ Tài Khoản:
              </label>
              <input
                type="text"
                value={bank1.accountHolder}
                onChange={(e) => onBank1Change({ ...bank1, accountHolder: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-normal text-slate-700 focus:bg-white focus:border-[#11382b] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Chi Nhánh:
              </label>
              <input
                type="text"
                value={bank1.branch}
                onChange={(e) => onBank1Change({ ...bank1, branch: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-normal text-slate-700 focus:bg-white focus:border-[#11382b] outline-none transition-all"
              />
            </div>
          </div>

          {/* QR Code Upload 1 */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <QrCode className="w-4 h-4 text-emerald-600" />
              <span>Mã QR Chuyển Khoản</span>
            </span>
            <div className="w-28 h-28 bg-white rounded-xl border border-slate-200 p-1 flex items-center justify-center overflow-hidden">
              {bank1.qrCodeUrl ? (
                <img src={bank1.qrCodeUrl} alt="QR 1" className="w-full h-full object-contain" />
              ) : (
                <span className="text-[11px] text-slate-400 text-center">Chưa có mã QR</span>
              )}
            </div>
            <label className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium cursor-pointer transition-all">
              <Upload className="w-3.5 h-3.5" />
              <span>Tải QR Code</span>
              <input type="file" accept="image/*" onChange={handleQrUpload1} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Bank 2 */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
        <div className="flex items-center gap-2 text-sm font-extrabold text-[#11382b] border-b border-slate-100 pb-3">
          <Building2 className="w-5 h-5 text-amber-600" />
          <span>Tài Khoản Ngân Hàng Số 2 (MB Bank - Dự phòng)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Tên Ngân Hàng:
              </label>
              <input
                type="text"
                value={bank2.bankName}
                onChange={(e) => onBank2Change({ ...bank2, bankName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-normal text-slate-700 focus:bg-white focus:border-[#11382b] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Số Tài Khoản:
              </label>
              <input
                type="text"
                value={bank2.accountNumber}
                onChange={(e) => onBank2Change({ ...bank2, accountNumber: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-normal text-[#11382b] focus:bg-white focus:border-[#11382b] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Tên Chủ Tài Khoản:
              </label>
              <input
                type="text"
                value={bank2.accountHolder}
                onChange={(e) => onBank2Change({ ...bank2, accountHolder: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-normal text-slate-700 focus:bg-white focus:border-[#11382b] outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Chi Nhánh:
              </label>
              <input
                type="text"
                value={bank2.branch}
                onChange={(e) => onBank2Change({ ...bank2, branch: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-normal text-slate-700 focus:bg-white focus:border-[#11382b] outline-none transition-all"
              />
            </div>
          </div>

          {/* QR Code Upload 2 */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <QrCode className="w-4 h-4 text-emerald-600" />
              <span>Mã QR Chuyển Khoản</span>
            </span>
            <div className="w-28 h-28 bg-white rounded-xl border border-slate-200 p-1 flex items-center justify-center overflow-hidden">
              {bank2.qrCodeUrl ? (
                <img src={bank2.qrCodeUrl} alt="QR 2" className="w-full h-full object-contain" />
              ) : (
                <span className="text-[11px] text-slate-400 text-center">Chưa có mã QR</span>
              )}
            </div>
            <label className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium cursor-pointer transition-all">
              <Upload className="w-3.5 h-3.5" />
              <span>Tải QR Code</span>
              <input type="file" accept="image/*" onChange={handleQrUpload2} className="hidden" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
