// admin/src/modules/post-management/components/PostManagementView.tsx
import React, { useState } from 'react';
import type { AdminPostItem, PostFilterStatus } from '../models/post-management.model';
import { PostFilterTabs } from './PostFilterTabs';
import { PostManagementCard } from './PostManagementCard';
import { PostDetailModal } from './PostDetailModal';
import { PostRejectModal } from './PostRejectModal';

const MOCK_ADMIN_POSTS: AdminPostItem[] = [
  {
    id: 'POST-1082',
    title: 'Cần mua gấp đất nền thổ cư TP. Thủ Đức ngân sách 3.5 tỷ',
    needType: 'BUY',
    propertyType: 'Đất thổ cư / Đất nền',
    location: 'Phường Tân Quy, Quận 7, TP. Hồ Chí Minh',
    priceRange: '3,5 tỷ ngân sách tối đa',
    areaRange: '80m²',
    authorName: 'Nguyễn Văn Hùng',
    authorPhone: '0912.345.678',
    createdAt: '10/09/2026',
    status: 'PENDING',
    description:
      'Cần tìm đất có sổ hồng riêng chính chủ, hẻm từ 4m trở lên, hướng Đông Nam hoặc Nam. Tài chính có sẵn, giao dịch nhanh chóng trong tháng.',
  },
  {
    id: 'POST-1083',
    title: 'Cần thuê mặt bằng kinh doanh F&B quận 1 ngân sách 40 triệu',
    needType: 'RENT',
    propertyType: 'Mặt bằng kinh doanh',
    location: 'Quận 1, TP. Hồ Chí Minh',
    priceRange: '40 triệu/tháng ngân sách tối đa',
    areaRange: '120m²',
    authorName: 'Trần Thị Mai',
    authorPhone: '0988.765.432',
    createdAt: '11/09/2026',
    status: 'PENDING',
    description:
      'Cần thuê nhà nguyên căn hoặc mặt bằng kinh doanh ẩm thực sạch sẽ, vỉa hè rộng, hợp đồng dài hạn tối thiểu 3 năm.',
  },
  {
    id: 'POST-1080',
    title: 'Cần mua căn hộ 2PN quận 7 ngân sách 2.8 tỷ',
    needType: 'BUY',
    propertyType: 'Căn hộ chung cư',
    location: 'Quận 7, TP. Hồ Chí Minh',
    priceRange: '2,8 tỷ ngân sách tối đa',
    areaRange: '65m²',
    authorName: 'Lê Hoàng Nam',
    authorPhone: '0977.889.900',
    createdAt: '09/09/2026',
    status: 'APPROVED',
    description:
      'Cần mua căn hộ 2 phòng ngủ 2 WC, tầng trung view thoáng mát, có sổ hồng đầy đủ.',
  },
];

export const PostManagementView: React.FC = () => {
  const [posts, setPosts] = useState<AdminPostItem[]>(MOCK_ADMIN_POSTS);
  const [statusFilter, setStatusFilter] = useState<PostFilterStatus>('PENDING');
  const [selectedPost, setSelectedPost] = useState<AdminPostItem | null>(null);
  const [rejectingPost, setRejectingPost] = useState<AdminPostItem | null>(null);

  const filteredPosts = posts.filter(
    (p) => statusFilter === 'ALL' || p.status === statusFilter
  );

  const counts = {
    all: posts.length,
    pending: posts.filter((p) => p.status === 'PENDING').length,
    approved: posts.filter((p) => p.status === 'APPROVED').length,
    rejected: posts.filter((p) => p.status === 'REJECTED').length,
  };

  const handleApprove = (post: AdminPostItem) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, status: 'APPROVED' } : p))
    );
    setSelectedPost(null);
  };

  const handleConfirmReject = (post: AdminPostItem, reason: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === post.id ? { ...p, status: 'REJECTED', rejectReason: reason } : p
      )
    );
    setRejectingPost(null);
    setSelectedPost(null);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Kiểm duyệt tin đăng BĐS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Phê duyệt hoặc từ chối các tin Cần mua / Cần thuê do hội viên gửi lên sàn.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">
            Tổng cộng: <strong className="text-[#143D30] font-bold">{posts.length}</strong> tin
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <PostFilterTabs
        statusFilter={statusFilter}
        onChangeFilter={setStatusFilter}
        counts={counts}
      />

      {/* Grid thẻ tin BĐS */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPosts.map((post) => (
            <PostManagementCard
              key={post.id}
              post={post}
              onViewDetail={setSelectedPost}
              onApprove={handleApprove}
              onReject={setRejectingPost}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400 text-xs">
          Không có bài đăng nào trong trạng thái này.
        </div>
      )}

      {/* MODAL CHI TIẾT */}
      <PostDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onApprove={handleApprove}
        onOpenReject={setRejectingPost}
      />

      {/* MODAL TỪ CHỐI */}
      <PostRejectModal
        post={rejectingPost}
        onClose={() => setRejectingPost(null)}
        onConfirmReject={handleConfirmReject}
      />
    </div>
  );
};
