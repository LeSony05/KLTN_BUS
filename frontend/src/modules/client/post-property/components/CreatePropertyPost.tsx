// frontend/src/modules/client/post-property/components/CreatePropertyPost.tsx
'use client';

import React, { useState } from 'react';
import { StepIndicator } from './StepIndicator';
import { Step1NeedSelection } from './Step1NeedSelection';
import { Step2RequirementDetails } from './Step2RequirementDetails';
import { Step4Success } from './Step4Success';
import { Toast, ToastType } from '@/common/components/ui/Toast';
import type {
  CreatePostFormData,
  NeedType,
} from '../models/post-property.model';
import { INITIAL_FORM_DATA } from '../models/post-property.model';

const DRAFT_STORAGE_KEY = 'KING_CONNECT_PROPERTY_DRAFT';

const getInitialFormData = (): CreatePostFormData => {
  if (typeof window !== 'undefined') {
    try {
      const savedDraftStr = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraftStr) {
        const savedDraft = JSON.parse(savedDraftStr);
        return {
          ...INITIAL_FORM_DATA,
          ...savedDraft,
          fullName: savedDraft.fullName || 'Nguyễn Văn Hùng',
          phone: savedDraft.phone || '0912.345.678',
          memberCode: savedDraft.memberCode || 'KC-001',
        };
      }
    } catch {
      // Ignore parse error
    }
  }
  return {
    ...INITIAL_FORM_DATA,
    fullName: 'Nguyễn Văn Hùng',
    phone: '0912.345.678',
    memberCode: 'KC-001',
  };
};

export const CreatePropertyPost: React.FC = () => {
  // Step State: 1 (Chọn loại tin & BĐS), 2 (Chi tiết & Đăng tin), 3 (Success PENDING)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form Data State initialized lazily
  const [formData, setFormData] = useState<CreatePostFormData>(getInitialFormData);

  // Toast Notification State in Top-Right
  const [toast, setToast] = useState<{
    isOpen: boolean;
    message: string;
    type: ToastType;
  }>({
    isOpen: false,
    message: '',
    type: 'success',
  });

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({
      isOpen: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isOpen: false }));
  };

  // Field Change Handler
  const handleFieldChange = <K extends keyof CreatePostFormData>(
    field: K,
    value: CreatePostFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Step 1 Validation & Next (FR-POST-002)
  const handleStep1Next = () => {
    setCurrentStep(2);
  };

  // Save Draft Handler (FR-POST-003, AC-3)
  const handleSaveDraft = () => {
    if (typeof window === 'undefined') return;
    try {
      const draftToSave: CreatePostFormData = {
        ...formData,
        status: 'DRAFT',
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftToSave));
      showToast(
        'Đã lưu bản nháp thành công! Tin ở trạng thái DRAFT và không hiển thị công khai.',
        'success'
      );
    } catch {
      showToast('Không thể lưu bản nháp vào bộ nhớ trình duyệt.', 'error');
    }
  };

  // Step 2 Submission for Approval (FR-POST-004, AC-2, AC-4, AC-5)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // AC-2: Validation
    if (!formData.title.trim()) {
      showToast('Vui lòng nhập tiêu đề tin đăng.', 'error');
      return;
    }
    if (!formData.price.trim()) {
      showToast('Vui lòng nhập ngân sách tối đa.', 'error');
      return;
    }
    if (!formData.province.trim()) {
      showToast('Vui lòng chọn Tỉnh / Thành phố.', 'error');
      return;
    }

    // Remove draft from storage once submitted
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    }

    setFormData((prev) => ({ ...prev, status: 'PENDING' }));
    setCurrentStep(3); // Transition to PENDING Success screen
  };

  // Reset Form
  const handleReset = () => {
    setFormData({
      ...INITIAL_FORM_DATA,
      fullName: 'Nguyễn Văn Hùng',
      phone: '0912.345.678',
      memberCode: 'KC-001',
    });
    setCurrentStep(1);
  };

  return (
    <div className="bg-[#F8FAF9] min-h-screen py-10 px-4 sm:px-6 font-sans relative">
      {/* Top-Right Toast Notification */}
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Title Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Đăng Tin Cần Mua / Cần Thuê Bất Động Sản
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Chỉ vài phút để tiếp cận hàng trăm chủ BĐS và môi giới uy tín — hoàn toàn miễn phí
          </p>
        </div>

        {/* Stepper Bar (2 Steps) */}
        {currentStep <= 2 && (
          <StepIndicator
            currentStep={currentStep}
            onSelectStep={(step) => setCurrentStep(step)}
          />
        )}

        {/* Step 1: Chọn loại tin & BĐS (FR-POST-002) */}
        {currentStep === 1 && (
          <Step1NeedSelection
            needType={formData.needType}
            propertyType={formData.propertyType}
            onSelectNeedType={(type: NeedType) => handleFieldChange('needType', type)}
            onSelectPropertyType={(type: string) => handleFieldChange('propertyType', type)}
            onNext={handleStep1Next}
          />
        )}

        {/* Step 2: Chi tiết yêu cầu, Lưu nháp & Gửi duyệt (FR-POST-002, FR-POST-003, FR-POST-004) */}
        {currentStep === 2 && (
          <Step2RequirementDetails
            formData={formData}
            errorMessage=""
            draftSavedMessage=""
            onChangeField={handleFieldChange}
            onBack={() => setCurrentStep(1)}
            onSaveDraft={handleSaveDraft}
            onSubmit={handleSubmit}
          />
        )}

        {/* Step 3: Thông báo gửi duyệt thành công (FR-POST-004, AC-4, AC-5) */}
        {currentStep === 3 && (
          <Step4Success title={formData.title} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default CreatePropertyPost;
