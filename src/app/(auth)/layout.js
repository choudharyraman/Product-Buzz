import Link from 'next/link';

export const metadata = {
  title: 'Sign In | Product Buzz',
  description: 'Sign in to your Product Buzz account.',
};

export default function AuthLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}
