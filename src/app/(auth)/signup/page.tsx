import { SignupForm } from '@/components/auth/SignupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | Shah Ishwardas Jewellers',
  description: 'Create your account at Shah Ishwardas Jewellers.',
};

export default function SignupPage() {
  return <SignupForm />;
}
