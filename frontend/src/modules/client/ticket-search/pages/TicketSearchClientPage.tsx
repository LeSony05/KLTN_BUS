'use client';

import React from 'react';

export const TicketSearchClientPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-16 px-4">
      <h1 className="text-xl md:text-2xl font-bold text-[#00613D] mb-10 text-center uppercase tracking-wide">
        TRA CỨU THÔNG TIN ĐẶT VÉ
      </h1>
      
      <div className="w-full max-w-2xl space-y-5">
        <input 
          type="text" 
          placeholder="Vui lòng nhập số điện thoại" 
          className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-[#F5A623] transition-colors"
        />
        
        <input 
          type="text" 
          placeholder="Vui lòng nhập mã vé" 
          className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:outline-none focus:border-[#F5A623] transition-colors"
        />

        <div className="pt-6 flex justify-center">
          <button 
            type="button"
            className="px-16 py-3 bg-[#FFC700] text-[#113327] font-black text-base rounded-full hover:bg-[#E6B200] transition-colors shadow-sm duration-300"
          >
            Tra cứu
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketSearchClientPage;
