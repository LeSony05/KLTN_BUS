// /src/modules/client/my-posts/components/MyPostsTable.tsx
import React from 'react';
import {
  Building,
  KeyRound,
  Eye,
  Edit,
  Trash2,
  ShieldCheck,
  Clock,
  XCircle,
  EyeOff,
  CheckCheck,
  RotateCw,
  FileEdit,
  History,
  Calendar,
} from 'lucide-react';
import type { MyPostItem } from '../models/my-posts.model';
import { ActionDropdown, type ActionMenuItem } from '@/common/components/ui/ActionDropdown';
import { Pagination } from '@/common/components/ui/Pagination';

interface MyPostsTableProps {
  posts: MyPostItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onViewDetail: (post: MyPostItem) => void;
  onEdit: (post: MyPostItem) => void;
  onDelete: (postId: string) => void;
  onToggleHide: (post: MyPostItem) => void;
  onMarkCompleted: (post: MyPostItem) => void;
  onRenew: (post: MyPostItem) => void;
}

export const MyPostsTable: React.FC<MyPostsTableProps> = ({
  posts,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onViewDetail,
  onEdit,
  onDelete,
  onToggleHide,
  onMarkCompleted,
  onRenew,
}) => {
  const getActionItems = (post: MyPostItem): ActionMenuItem[] => {
    const items: ActionMenuItem[] = [
      {
        key: 'view',
        label: 'Xem chi tiết',
        icon: <Eye className="w-4 h-4 text-slate-500" />,
        onClick: () => onViewDetail(post),
      },
    ];

    if (post.status === 'DRAFT' || post.status === 'REJECTED' || post.status === 'APPROVED') {
      items.push({
        key: 'edit',
        label: 'Chỉnh sửa tin',
        icon: <Edit className="w-4 h-4 text-emerald-700" />,
        variant: 'success',
        onClick: () => onEdit(post),
      });
    }

    if (post.status === 'APPROVED') {
      items.push({
        key: 'hide',
        label: 'Tạm ẩn tin',
        icon: <EyeOff className="w-4 h-4 text-slate-500" />,
        onClick: () => onToggleHide(post),
      });
    }

    if (post.status === 'HIDDEN') {
      items.push({
        key: 'unhide',
        label: 'Hiển thị lại tin',
        icon: <Eye className="w-4 h-4 text-emerald-700" />,
        variant: 'success',
        onClick: () => onToggleHide(post),
      });
    }

    if (post.status === 'APPROVED' || post.status === 'HIDDEN') {
      items.push({
        key: 'complete',
        label: 'Đánh dấu hoàn tất',
        icon: <CheckCheck className="w-4 h-4 text-sky-600" />,
        onClick: () => onMarkCompleted(post),
      });
    }

    if (post.status === 'EXPIRED') {
      items.push({
        key: 'renew',
        label: 'Gia hạn tin đăng',
        icon: <RotateCw className="w-4 h-4 text-orange-600" />,
        variant: 'warning',
        onClick: () => onRenew(post),
      });
    }

    items.push({
      key: 'delete',
      label: 'Xóa tin đăng',
      icon: <Trash2 className="w-4 h-4 text-rose-500" />,
      variant: 'danger',
      onClick: () => onDelete(post.id),
    });

    return items;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4 min-w-[280px]">Nội Dung Nhu Cầu & Vị Trí</th>
              <th className="py-3.5 px-4 w-28 whitespace-nowrap">Nhu Cầu</th>
              <th className="py-3.5 px-4 w-36 whitespace-nowrap">Ngân Sách & Diện Tích</th>
              <th className="py-3.5 px-4 w-32 whitespace-nowrap">Ngày Đăng</th>
              <th className="py-3.5 px-4 w-28 text-center whitespace-nowrap">Lượt Xem</th>
              <th className="py-3.5 px-4 w-36 whitespace-nowrap">Trạng Thái</th>
              <th className="py-3.5 px-4 w-20 text-center whitespace-nowrap">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50/70 transition-colors">
                {/* 1. Title & Info (FIRST COLUMN) */}
                <td className="py-4 px-4">
                  <div className="space-y-1 max-w-md">
                    <button
                      type="button"
                      onClick={() => onViewDetail(post)}
                      className="font-bold text-slate-900 hover:text-emerald-800 text-left line-clamp-2 transition-colors cursor-pointer"
                    >
                      {post.title}
                    </button>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-semibold">
                        {post.propertyType}
                      </span>
                      <span>•</span>
                      <span className="truncate max-w-xs">{post.location}</span>
                    </div>
                  </div>
                </td>

                {/* 2. Need Type */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-extrabold ${
                      post.needType === 'BUY'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                        : 'bg-sky-50 text-sky-800 border border-sky-200/60'
                    }`}
                  >
                    {post.needType === 'BUY' ? (
                      <Building className="w-3 h-3" />
                    ) : (
                      <KeyRound className="w-3 h-3" />
                    )}
                    <span>{post.needType === 'BUY' ? 'CẦN MUA' : 'CẦN THUÊ'}</span>
                  </span>
                </td>

                {/* 3. Price & Area */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <div>
                    <p className="font-extrabold text-emerald-900">{post.priceRange}</p>
                    <p className="text-[11px] text-slate-500">{post.areaRange}</p>
                  </div>
                </td>

                {/* 4. Created At (Ngày Đăng) */}
                <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.createdAt}</span>
                  </div>
                </td>

                {/* 5. Views Count (Lượt Xem) */}
                <td className="py-4 px-4 whitespace-nowrap text-center text-xs font-semibold text-slate-700">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px]">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.viewsCount ?? 0}</span>
                  </span>
                </td>

                {/* 6. Status Badge */}
                <td className="py-4 px-4 whitespace-nowrap">
                  {post.status === 'APPROVED' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Đang hiển thị</span>
                    </span>
                  )}
                  {post.status === 'PENDING' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      <Clock className="w-3 h-3" />
                      <span>Chờ duyệt</span>
                    </span>
                  )}
                  {post.status === 'REJECTED' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      <XCircle className="w-3 h-3" />
                      <span>Từ chối</span>
                    </span>
                  )}
                  {post.status === 'HIDDEN' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      <EyeOff className="w-3 h-3" />
                      <span>Tạm ẩn</span>
                    </span>
                  )}
                  {post.status === 'COMPLETED' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                      <CheckCheck className="w-3 h-3" />
                      <span>Đã hoàn tất</span>
                    </span>
                  )}
                  {post.status === 'EXPIRED' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
                      <History className="w-3 h-3" />
                      <span>Hết hạn</span>
                    </span>
                  )}
                  {post.status === 'DRAFT' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                      <FileEdit className="w-3 h-3" />
                      <span>Bản nháp</span>
                    </span>
                  )}
                </td>

                {/* 7. Actions 3 dots dropdown */}
                <td className="py-4 px-4 text-center whitespace-nowrap">
                  <ActionDropdown items={getActionItems(post)} align="right" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3 border-t border-slate-200/80 bg-slate-50/40">
        <div className="text-xs font-semibold text-slate-500">
          Hiển thị <strong className="text-slate-800 font-bold">{Math.min((currentPage - 1) * pageSize + 1, totalItems)}</strong> -{' '}
          <strong className="text-slate-800 font-bold">{Math.min(currentPage * pageSize, totalItems)}</strong> trên tổng số{' '}
          <strong className="text-slate-800 font-bold">{totalItems}</strong> tin đăng
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};
