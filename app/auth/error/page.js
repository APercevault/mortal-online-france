export default function AuthErrorPage({ searchParams }) {
  const error = searchParams?.error;
  const message = searchParams?.message;

  return (
    <div>
      <h1>Authentication Error</h1>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}
