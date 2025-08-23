import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import comments from "@/data/comments.json";
import { deleteComment } from "./actions";

const texts = {
  fr: {
    title: "Gestion des commentaires",
    delete: "Supprimer",
    accessDenied: "Accès refusé",
  },
  en: {
    title: "Comment moderation",
    delete: "Delete",
    accessDenied: "Access denied",
  },
};

export default async function CommentsAdminPage({ params }) {
  const lang = params.lang;
  const t = texts[lang] || texts.fr;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "superadmin") {
    return <p className="p-8">{t.accessDenied}</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4">{t.title}</h1>
      <ul>
        {comments.map((c) => (
          <li key={c.id} className="mb-2">
            {c.text}
            <form action={deleteComment} className="inline-block ml-2">
              <input type="hidden" name="id" value={c.id} />
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
