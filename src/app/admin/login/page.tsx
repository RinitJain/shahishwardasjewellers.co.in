import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login | Shah Ishwardas Jewellers',
  description: 'Admin login for Shah Ishwardas Jewellers dashboard.',
};

export default function AdminLoginPage() {
  return (
     <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <AdminLoginForm />
    </div>
  );
}
