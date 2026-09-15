import LoginClientPage from '@/modules/auth/pages/LoginClientPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập — King Connect Land',
  description: 'Đăng nhập vào hệ thống kết nối nhu cầu Bất Động Sản',
};

export default function LoginPage() {
  return <LoginClientPage />;
}
