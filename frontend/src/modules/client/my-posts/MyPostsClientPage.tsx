// /src/modules/client/my-posts/MyPostsClientPage.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, RefreshCw, FileText } from 'lucide-react';
import { useAuthStore } from '../../../context/useAuthStore';
import { MOCK_USER_POSTS } from './models/my-posts.mock';
import type { MyPostItem, MyPostStatus } from './models/my-posts.model';
import { MyPostsTable } from './components/MyPostsTable';
import { MyPostDetailModal } from './components/MyPostDetailModal';
import { MyPostEditModal } from './components/MyPostEditModal';
import { ConfirmModal } from '../../../common/components/ui/ConfirmModal';
import { Breadcrumb } from '../../../common/components/ui/Breadcrumb';

export const MyPostsClientPage: React.FC = () => {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState<MyPostItem[]>(MOCK_USER_POSTS);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusTab, setStatusTab] = useState<'ALL' | MyPostStatus>('ALL');
  const [needTypeFilter, setNeedTypeFilter] = useState<'ALL' | 'BUY' | 'RENT'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [selectedPost, setSelectedPost] = useState<MyPostItem | null>(null);
  const [editingPost, setEditingPost] = useState<MyPostItem | null>(null);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info' | 'success';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Filter logic
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      post.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      post.location.toLowerCase().includes(searchKeyword.toLowerCase());

    const matchesStatus = statusTab === 'ALL' || post.status === statusTab;
    const matchesNeedType = needTypeFilter === 'ALL' || post.needType === needTypeFilter;

    return matchesSearch && matchesStatus && matchesNeedType;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / pageSize) || 1;
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleStatusTabChange = (status: 'ALL' | MyPostStatus) => {
    setStatusTab(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchKeyword(val);
    setCurrentPage(1);
  };

  const handleNeedTypeChange = (type: 'ALL' | 'BUY' | 'RENT') => {
    setNeedTypeFilter(type);
    setCurrentPage(1);
  };

  // Calculate stats
  const totalCount = posts.length;
  const approvedCount = posts.filter((p) => p.status === 'APPROVED').length;
  const pendingCount = posts.filter((p) => p.status === 'PENDING').length;
  const rejectedCount = posts.filter((p) => p.status === 'REJECTED').length;
  const hiddenCount = posts.filter((p) => p.status === 'HIDDEN').length;
  const completedCount = posts.filter((p) => p.status === 'COMPLETED').length;
  const expiredCount = posts.filter((p) => p.status === 'EXPIRED').length;
  const draftCount = posts.filter((p) => p.status === 'DRAFT').length;

  const handleDeletePost = (postId: string) => {
    const postToDelete = posts.find((p) => p.id === postId);
    setConfirmModal({
      isOpen: true,
      title: 'Xóa tin đăng',
      message: `Bạn có chắc chắn muốn xóa vĩnh viễn tin đăng "${postToDelete?.title || postId}" khỏi hệ thống? Thao tác này không thể hoàn tác.`,
      confirmText: 'Xóa tin đăng',
      variant: 'danger',
      onConfirm: () => {
        setPosts((prev) => prev.filter((p) => p.id !== postId));
      },
    });
  };

  const handleToggleHide = (post: MyPostItem) => {
    const newStatus: MyPostStatus = post.status === 'APPROVED' ? 'HIDDEN' : 'APPROVED';
    const actionTitle = newStatus === 'HIDDEN' ? 'Tạm ẩn tin đăng' : 'Hiển thị lại tin đăng';
    const actionText = newStatus === 'HIDDEN' ? 'tạm ẩn' : 'hiển thị lại';
    
    setConfirmModal({
      isOpen: true,
      title: actionTitle,
      message: `Bạn có muốn ${actionText} tin đăng "${post.title}"?`,
      confirmText: newStatus === 'HIDDEN' ? 'Xác nhận tạm ẩn' : 'Hiển thị lại',
      variant: newStatus === 'HIDDEN' ? 'warning' : 'success',
      onConfirm: () => {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === post.id ? { ...p, status: newStatus, updatedAt: new Date().toLocaleDateString('vi-VN') } : p
          )
        );
      },
    });
  };

  const handleMarkCompleted = (post: MyPostItem) => {
    setConfirmModal({
      isOpen: true,
      title: 'Đánh dấu hoàn tất',
      message: `Xác nhận bài đăng "${post.title}" đã hoàn tất nhu cầu (đã mua/thuê thành công)?`,
      confirmText: 'Xác nhận hoàn tất',
      variant: 'info',
      onConfirm: () => {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === post.id ? { ...p, status: 'COMPLETED', updatedAt: new Date().toLocaleDateString('vi-VN') } : p
          )
        );
      },
    });
  };

  const handleRenew = (post: MyPostItem) => {
    setConfirmModal({
      isOpen: true,
      title: 'Gia hạn tin đăng',
      message: `Gửi yêu cầu gia hạn hiển thị tin đăng "${post.title}" lên Admin duyệt lại?`,
      confirmText: 'Gửi yêu cầu gia hạn',
      variant: 'success',
      onConfirm: () => {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === post.id ? { ...p, status: 'PENDING', updatedAt: new Date().toLocaleDateString('vi-VN') } : p
          )
        );
      },
    });
  };

  const handleSaveEdit = (updatedPost: MyPostItem) => {
    setPosts((prev) => prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    setEditingPost(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 py-4 font-sans text-slate-800">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb Navigation Trail */}
        <Breadcrumb
          items={[
            { label: 'Tài khoản cá nhân' },
            { label: 'Quản lý tin đăng' },
          ]}
        />

        {/* Page Header Title */}
        <div className="border-b border-slate-200/60 pb-5">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Quản Lý Tin Đăng Cá Nhân
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Xin chào, <strong className="text-slate-800 font-bold">{user?.fullName || 'Nguyễn Văn Hùng'}</strong>. Theo dõi trạng thái duyệt tin và quản lý các nhu cầu BĐS của bạn.
          </p>
        </div>

        {/* Filter Controls & Tabs */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => handleStatusTabChange('ALL')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusTab === 'ALL'
                    ? 'bg-[#113327] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                Tất cả ({totalCount})
              </button>

              <button
                type="button"
                onClick={() => handleStatusTabChange('APPROVED')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusTab === 'APPROVED'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                Đang hiển thị ({approvedCount})
              </button>

              <button
                type="button"
                onClick={() => handleStatusTabChange('PENDING')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusTab === 'PENDING'
                    ? 'bg-amber-500 text-slate-900 shadow-xs'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                Chờ duyệt ({pendingCount})
              </button>

              <button
                type="button"
                onClick={() => handleStatusTabChange('REJECTED')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusTab === 'REJECTED'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                }`}
              >
                Bị từ chối ({rejectedCount})
              </button>

              <button
                type="button"
                onClick={() => handleStatusTabChange('HIDDEN')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusTab === 'HIDDEN'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tạm ẩn ({hiddenCount})
              </button>

              <button
                type="button"
                onClick={() => handleStatusTabChange('COMPLETED')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusTab === 'COMPLETED'
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'bg-sky-50 text-sky-800 hover:bg-sky-100'
                }`}
              >
                Đã hoàn tất ({completedCount})
              </button>

              <button
                type="button"
                onClick={() => handleStatusTabChange('EXPIRED')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusTab === 'EXPIRED'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
                }`}
              >
                Hết hạn ({expiredCount})
              </button>

              <button
                type="button"
                onClick={() => handleStatusTabChange('DRAFT')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusTab === 'DRAFT'
                    ? 'bg-slate-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Nháp ({draftCount})
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setSearchKeyword('');
                setStatusTab('ALL');
                setNeedTypeFilter('ALL');
                setCurrentPage(1);
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-emerald-800 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Đặt lại bộ lọc</span>
            </button>
          </div>

          {/* Search & Select Filter Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Tìm theo tiêu đề tin đăng, mã tin hoặc vị trí..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600/30 bg-slate-50/50"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400 hidden sm:inline" />
              <select
                value={needTypeFilter}
                onChange={(e) => handleNeedTypeChange(e.target.value as 'ALL' | 'BUY' | 'RENT')}
                className="w-full sm:w-44 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/30 cursor-pointer"
              >
                <option value="ALL">Tất cả nhu cầu</option>
                <option value="BUY">Cần Mua</option>
                <option value="RENT">Cần Thuê</option>
              </select>
            </div>
          </div>
        </div>

        {/* Posts Table List */}
        {filteredPosts.length > 0 ? (
          <MyPostsTable
            posts={paginatedPosts}
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredPosts.length}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
            onViewDetail={setSelectedPost}
            onEdit={setEditingPost}
            onDelete={handleDeletePost}
            onToggleHide={handleToggleHide}
            onMarkCompleted={handleMarkCompleted}
            onRenew={handleRenew}
          />
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Không tìm thấy tin đăng</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto font-medium">
                Bạn hiện tại không có tin đăng nào cho trạng thái này
              </p>
            </div>
            <div className="pt-2">
              <Link href="/post-property/create">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFC700] hover:bg-[#E6B200] text-slate-950 font-extrabold text-xs sm:text-sm shadow-sm hover:shadow-md cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Đăng tin ngay</span>
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <MyPostDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onEdit={setEditingPost}
      />

      <MyPostEditModal
        post={editingPost}
        onClose={() => setEditingPost(null)}
        onSave={handleSaveEdit}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        cancelText={confirmModal.cancelText}
        variant={confirmModal.variant}
        onConfirm={confirmModal.onConfirm}
        onClose={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
