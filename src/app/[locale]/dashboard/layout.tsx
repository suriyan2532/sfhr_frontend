import { MainLayout } from '@/components/layout/MainLayout';
import { auth } from '@/auth';

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
