import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import users from "@/data/users.json";
import { updateUserRole } from "./actions";

const texts = {
  fr: {
    title: "Gestion des utilisateurs",
    update: "Mettre à jour",
    accessDenied: "Accès refusé",
  },
  en: {
    title: "User management",
    update: "Update",
    accessDenied: "Access denied",
  },
};

export default async function UsersAdminPage({ params }) {
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
        {users.map((u) => (
          <li key={u.id} className="mb-2">
            {u.name} - {u.role}
            <form action={updateUserRole} className="inline-block ml-2">
              <input type="hidden" name="id" value={u.id} />
              <select name="role" defaultValue={u.role} className="border p-1">
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
              <button type="submit" className="ml-1 underline">
                {t.update}
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
