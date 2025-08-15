import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/* eslint-disable @next/next/no-html-link-for-pages */

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="p-8">
        <a href="/api/auth/signin" className="underline">Se connecter avec Discord</a>
      </div>
    );
  }

  if (session.user.role !== "admin") {
    return <p className="p-8">Accès refusé</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4">Backoffice</h1>
      <p className="mb-2">Bienvenue, {session.user.name}</p>
      <p className="mb-4">Rôle: {session.user.role}</p>
      <a href="/api/auth/signout" className="underline">Se déconnecter</a>
    </div>
  );
}
