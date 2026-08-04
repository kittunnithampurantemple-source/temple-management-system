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
        <main className="flex-1 p-8 bg-cream-dark min-h-screen">{children}</main>
      </div>
    </AdminGuard>
  );
}
