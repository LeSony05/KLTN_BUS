import RegisterClientPage from '@/modules/auth/pages/RegisterClientPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng ký tài khoản — King Connect Land',
  description: 'Đăng ký tài khoản miễn phí để kết nối nhu cầu Bất Động Sản',
};

export default function RegisterPage() {
  return <RegisterClientPage />;
}
