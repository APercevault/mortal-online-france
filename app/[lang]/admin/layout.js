/* eslint-disable @next/next/no-html-link-for-pages */
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const texts = {
  fr: {
    signOut: "Se déconnecter",
  },
  en: {
    signOut: "Sign out",
  },
};

export default async function AdminLayout({ children, params }) {
  const lang = params.lang;
  const t = texts[lang] || texts.fr;
  const session = await getServerSession(authOptions);

  return (
    <div className="p-8">
      {session && (
        <div className="mb-4 text-right">
          <a href="/api/auth/signout" className="underline">
            {t.signOut}
          </a>
        </div>
      )}
      {children}
    </div>
  );
}
