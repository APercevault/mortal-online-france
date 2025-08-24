import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import guilds from "@/data/guilds.json";
import { deleteGuild } from "./actions";

const texts = {
  fr: {
    title: "Gestion des guildes",
    delete: "Supprimer",
    accessDenied: "Accès refusé",
  },
  en: {
    title: "Guild management",
    delete: "Delete",
    accessDenied: "Access denied",
  },
};

export default async function GuildsAdminPage({ params }) {
  const lang = params.lang;
  const t = texts[lang] || texts.fr;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "superadmin") {
    return <p>{t.accessDenied}</p>;
  }

  return (
    <div>
      <h1 className="text-xl mb-4">{t.title}</h1>
      <ul>
        {guilds.map((g) => (
          <li key={g.id} className="mb-2">
            {g.name}
            <form action={deleteGuild} className="inline-block ml-2">
              <input type="hidden" name="id" value={g.id} />
              <button type="submit" className="underline">
                {t.delete}
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
