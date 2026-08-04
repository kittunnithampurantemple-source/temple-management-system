'use client';
import { usePathname } from 'next/navigation';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) return <>{children}</>;

  return (
    <AdminGuard>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8 min-h-screen" style={{ background: 'linear-gradient(135deg, #f8f7ff 0%, #f0f4ff 50%, #f8f0ff 100%)' }}>{children}</main>
      </div>
    </AdminGuard>
  );
}
