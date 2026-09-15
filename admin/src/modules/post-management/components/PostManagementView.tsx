// admin/src/modules/post-management/components/PostManagementView.tsx
import React, { useState } from 'react';
import type { AdminPostItem } from '../models/post-management.model';
import { PostDetailModal } from './PostDetailModal';
import { PostRejectModal } from './PostRejectModal';
import {
  DataTable,
  MultiFilterBar,
  ActionDropdown,
  Badge,
  type Column,
} from '../../../common/components/ui';
import { Eye, CheckCircle, XCircle, Trash2, LayoutGrid, TableProperties } from 'lucide-react';
import { PostManagementCard } from './PostManagementCard';

const MOCK_ADMIN_POSTS: AdminPostItem[] = [
  {
    id: 'POST-1082',
    title: 'Cần mua gấp đất nền thổ cư TP. Thủ Đức ngân sách 3.5 tỷ',
    needType: 'BUY',
    propertyType: 'Đất thổ cư / Đất nền',
    location: 'Phường Tân Quy, Quận 7, TP. Hồ Chí Minh',
    priceRange: '3,5 tỷ',
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
    priceRange: '40 triệu/tháng',
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
    priceRange: '2,8 tỷ',
    areaRange: '65m²',
    authorName: 'Lê Hoàng Nam',
    authorPhone: '0977.889.900',
    createdAt: '09/09/2026',
    status: 'APPROVED',
    description:
      'Cần mua căn hộ 2 phòng ngủ 2 WC, tầng trung view thoáng mát, có sổ hồng đầy đủ.',
  },
  {
    id: 'POST-1079',
    title: 'Cần thuê nhà xưởng 500m2 khu vực Bình Chánh giá 25tr',
    needType: 'RENT',
    propertyType: 'Kho xưởng / Nhà xưởng',
    location: 'Huyện Bình Chánh, TP. Hồ Chí Minh',
    priceRange: '25 triệu/tháng',
    areaRange: '500m²',
    authorName: 'Phạm Minh Tuấn',
    authorPhone: '0933.112.233',
    createdAt: '08/09/2026',
    status: 'REJECTED',
    rejectReason: 'Nội dung thông tin không hợp lệ, thiếu số điện thoại liên hệ xác thực.',
    description: 'Cần thuê kho chứa hàng khô, đường xe container ra vào được 24/7.',
  },
];

const parseDDMMYYYY = (dateStr: string): Date => {
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
  }
  return new Date(dateStr);
};

export const PostManagementView: React.FC = () => {
  const [posts, setPosts] = useState<AdminPostItem[]>(MOCK_ADMIN_POSTS);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [needTypeFilter, setNeedTypeFilter] = useState<string>('ALL');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedPost, setSelectedPost] = useState<AdminPostItem | null>(null);
  const [rejectingPost, setRejectingPost] = useState<AdminPostItem | null>(null);

  // Filter logic
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      post.authorPhone.includes(searchKeyword) ||
      post.id.toLowerCase().includes(searchKeyword.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || post.status === statusFilter;
    const matchesNeedType = needTypeFilter === 'ALL' || post.needType === needTypeFilter;

    let matchesDateRange = true;
    const itemDate = parseDDMMYYYY(post.createdAt);

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      if (itemDate < start) matchesDateRange = false;
    }

    if (endDate && matchesDateRange) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      if (itemDate > end) matchesDateRange = false;
    }

    return matchesSearch && matchesStatus && matchesNeedType && matchesDateRange;
  });

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

  const handleDelete = (postId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài đăng này?')) {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    }
  };

  // Clean filter option labels without raw unicode emojis
  const filterGroups = [
    {
      key: 'needType',
      label: 'Loại nhu cầu',
      value: needTypeFilter,
      options: [
        { value: 'ALL', label: 'Tất cả nhu cầu' },
        { value: 'BUY', label: 'Cần Mua' },
        { value: 'RENT', label: 'Cần Thuê' },
      ],
    },
    {
      key: 'status',
      label: 'Trạng thái',
      value: statusFilter,
      options: [
        { value: 'ALL', label: 'Tất cả trạng thái' },
        { value: 'PENDING', label: 'Chờ duyệt' },
        { value: 'APPROVED', label: 'Đã duyệt' },
        { value: 'REJECTED', label: 'Từ chối' },
      ],
    },
  ];

  const handleFilterChange = (key: string, value: string) => {
    if (key === 'status') setStatusFilter(value);
    if (key === 'needType') setNeedTypeFilter(value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchKeyword('');
    setStatusFilter('ALL');
    setNeedTypeFilter('ALL');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  // Swapped "Nội Dung Nhu Cầu & Vị Trí" before "Nhu Cầu"
  const columns: Column<AdminPostItem>[] = [
    {
      key: 'id',
      header: 'Mã Tin',
      className: 'font-bold text-[#11382b] w-28 whitespace-nowrap',
      render: (item) => <span>{item.id}</span>,
    },
    {
      key: 'authorName',
      header: 'Người Đăng',
      className: 'w-44 whitespace-nowrap',
      render: (item) => (
        <div>
          <p className="font-semibold text-slate-800">{item.authorName}</p>
          <p className="text-[11px] text-emerald-700 font-medium">{item.authorPhone}</p>
        </div>
      ),
    },
    {
      key: 'title',
      header: 'Nội Dung Nhu Cầu & Vị Trí',
      render: (item) => (
        <div className="space-y-1 max-w-md">
          <p className="font-semibold text-slate-800 line-clamp-2">{item.title}</p>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-medium">
              {item.propertyType}
            </span>
            <span>•</span>
            <span className="truncate">{item.location}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'needType',
      header: 'Nhu Cầu',
      className: 'w-32 whitespace-nowrap',
      render: (item) => (
        <Badge variant={item.needType === 'BUY' ? 'buy' : 'rent'}>
          {item.needType === 'BUY' ? 'Cần Mua' : 'Cần Thuê'}
        </Badge>
      ),
    },
    {
      key: 'priceRange',
      header: 'Ngân Sách',
      className: 'w-32 font-bold text-amber-600 whitespace-nowrap',
      render: (item) => <span>{item.priceRange}</span>,
    },
    {
      key: 'status',
      header: 'Trạng Thái',
      className: 'w-32 whitespace-nowrap',
      render: (item) => {
        if (item.status === 'PENDING') return <Badge variant="pending">Chờ duyệt</Badge>;
        if (item.status === 'APPROVED') return <Badge variant="approved">Đã duyệt</Badge>;
        return <Badge variant="rejected">Từ chối</Badge>;
      },
    },
    {
      key: 'actions',
      header: 'Thao Tác',
      className: 'w-16 text-center whitespace-nowrap',
      render: (item) => (
        <ActionDropdown
          items={[
            {
              key: 'view',
              label: 'Xem chi tiết',
              icon: <Eye className="w-4 h-4 text-slate-500" />,
              onClick: () => setSelectedPost(item),
            },
            ...(item.status === 'PENDING'
              ? [
                  {
                    key: 'approve',
                    label: 'Phê duyệt tin',
                    icon: <CheckCircle className="w-4 h-4" />,
                    variant: 'success' as const,
                    onClick: () => handleApprove(item),
                  },
                  {
                    key: 'reject',
                    label: 'Từ chối duyệt',
                    icon: <XCircle className="w-4 h-4" />,
                    variant: 'warning' as const,
                    onClick: () => setRejectingPost(item),
                  },
                ]
              : []),
            {
              key: 'delete',
              label: 'Xóa bài đăng',
              icon: <Trash2 className="w-4 h-4" />,
              variant: 'danger',
              onClick: () => handleDelete(item.id),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Kiểm duyệt tin đăng BĐS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Phê duyệt hoặc từ chối các tin Cần Mua / Cần Thuê từ thành viên gửi lên sàn.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white text-[#11382b] shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableProperties className="w-4 h-4" />
            <span className="hidden sm:inline">Dạng Bảng</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white text-[#11382b] shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Dạng Lưới</span>
          </button>
        </div>
      </div>

      {/* Multi Criteria Filter Bar with Date Range Filter */}
      <MultiFilterBar
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
        searchPlaceholder="Tìm mã tin, tiêu đề, tên, số điện thoại..."
        filterGroups={filterGroups}
        onFilterChange={handleFilterChange}
        showDateFilter={true}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onResetFilters={handleResetFilters}
      />

      {/* View Content */}
      {viewMode === 'table' ? (
        <DataTable
          columns={columns}
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          emptyMessage="Không tìm thấy bài đăng nào phù hợp với bộ lọc"
          pagination={{
            currentPage,
            totalPages: Math.ceil(filteredPosts.length / 10) || 1,
            totalItems: filteredPosts.length,
            pageSize: 10,
            onPageChange: setCurrentPage,
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
      )}

      {/* Detail Modal */}
      <PostDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onApprove={handleApprove}
        onOpenReject={setRejectingPost}
      />

      {/* Reject Modal */}
      <PostRejectModal
        post={rejectingPost}
        onClose={() => setRejectingPost(null)}
        onConfirmReject={handleConfirmReject}
      />
    </div>
  );
};
