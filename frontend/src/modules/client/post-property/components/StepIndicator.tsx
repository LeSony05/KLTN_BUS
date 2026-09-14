// frontend/src/modules/client/post-property/components/StepIndicator.tsx
'use client';

import React from 'react';
import { Check } from 'lucide-react';

export interface StepIndicatorProps {
  currentStep: number;
  onSelectStep: (step: 1 | 2) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onSelectStep,
}) => {
  const steps = [
    { number: 1, label: '1. Chọn loại tin & BĐS' },
    { number: 2, label: '2. Chi tiết & Đăng tin' },
  ];

  return (
    <div className="max-w-md mx-auto font-sans">
      <div className="flex items-center justify-between relative">
        {/* Connecting Line */}
        <div
          className={`absolute left-1/4 right-1/4 top-4 h-0.5 z-0 transition-colors ${
            currentStep >= 2 ? 'bg-[#143D30]' : 'bg-slate-200'
          }`}
        />

        {/* Step Circles */}
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="flex flex-col items-center gap-1.5 relative z-10">
              <button
                type="button"
                onClick={() => {
                  if (isCompleted || isCurrent) {
                    onSelectStep(step.number as 1 | 2);
                  }
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  isCompleted
                    ? 'bg-[#143D30] text-white cursor-pointer'
                    : isCurrent
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-200 text-slate-500 cursor-default'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.number}
              </button>
              <span
                className={`text-xs font-bold ${
                  isCurrent
                    ? 'text-slate-900'
                    : isCompleted
                    ? 'text-[#143D30]'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
