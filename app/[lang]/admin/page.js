import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

/* eslint-disable @next/next/no-html-link-for-pages */

const texts = {
  fr: {
    signIn: "Se connecter avec Discord",
    accessDenied: "Accès refusé",
    backoffice: "Backoffice",
    welcome: "Bienvenue",
    role: "Rôle",
    signOut: "Se déconnecter",
    guilds: "Guildes",
    comments: "Commentaires",
    users: "Utilisateurs",
  },
  en: {
    signIn: "Sign in with Discord",
    accessDenied: "Access denied",
    backoffice: "Admin panel",
    welcome: "Welcome",
    role: "Role",
    signOut: "Sign out",
    guilds: "Guilds",
    comments: "Comments",
    users: "Users",
  },
};

export default async function AdminPage({ params }) {
  const lang = params.lang;
  const t = texts[lang] || texts.fr;
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="p-8">
        <a href="/api/auth/signin" className="underline">
          {t.signIn}
        </a>
      </div>
    );
  }

  if (session.user.role !== "superadmin") {
    return <p className="p-8">{t.accessDenied}</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4">{t.backoffice}</h1>
      <p className="mb-2">
        {t.welcome}, {session.user.name}
      </p>
      <p className="mb-4">
        {t.role}: {session.user.role}
      </p>
      <nav className="mb-4 space-y-2">
        <div>
          <a href={`/${lang}/admin/guilds`} className="underline">
            {t.guilds}
          </a>
        </div>
        <div>
          <a href={`/${lang}/admin/comments`} className="underline">
            {t.comments}
          </a>
        </div>
        <div>
          <a href={`/${lang}/admin/users`} className="underline">
            {t.users}
          </a>
        </div>
      </nav>
      <a href="/api/auth/signout" className="underline">
        {t.signOut}
      </a>
    </div>
  );
}
