import { LoginForm } from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Shah Ishwardas Jewellers',
  description: 'Log in to your Shah Ishwardas Jewellers account.',
};

export default function LoginPage() {
  return <LoginForm />;
}
