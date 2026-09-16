// /app/(client)/my-posts/page.tsx
import { Metadata } from 'next';
import ClientLayout from '@/modules/client/common/layouts/ClientLayout';
import { MyPostsClientPage } from '@/modules/client/my-posts/MyPostsClientPage';

export const metadata: Metadata = {
  title: 'Quản Lý Tin Đăng Cá Nhân | King Connect Land',
  description: 'Quản lý danh sách tin nhu cầu Cần Mua / Cần Thuê cá nhân, theo dõi trạng thái duyệt tin và xem lý do từ chối.',
};

export default function MyPostsPage() {
  return (
    <ClientLayout>
      <MyPostsClientPage />
    </ClientLayout>
  );
}
