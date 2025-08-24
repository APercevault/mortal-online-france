'use client';

import { useSearchParams } from 'next/navigation';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');

  return (
    <div>
      <h1>Authentication Error</h1>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}
