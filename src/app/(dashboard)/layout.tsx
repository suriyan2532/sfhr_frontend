import { auth } from '@/auth';
import { MainLayout } from '@/components/layout/MainLayout';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <MainLayout user={session?.user}>
      {children}
    </MainLayout>
  );
}
