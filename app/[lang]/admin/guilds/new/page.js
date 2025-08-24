import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
/* eslint-disable @next/next/no-html-link-for-pages */

const texts = {
  fr: {
    title: "Nouvelle guilde",
    name: "Nom",
    description: "Description",
    video: "Lien vidéo",
    submit: "Soumettre",
    signIn: "Se connecter avec Discord",
  },
  en: {
    title: "New guild",
    name: "Name",
    description: "Description",
    video: "Video link",
    submit: "Submit",
    signIn: "Sign in with Discord",
  },
};

export default async function NewGuildPage({ params }) {
  const lang = params.lang;
  const t = texts[lang] || texts.fr;
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <a href="/api/auth/signin/discord" className="underline">
          {t.signIn}
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl mb-4">{t.title}</h1>
      <form action={`/api/guilds?lang=${lang}`} method="POST" className="space-y-4">
        <div>
          <label className="block mb-1" htmlFor="name">{t.name}</label>
          <input id="name" name="name" required className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1" htmlFor="description">{t.description}</label>
          <textarea id="description" name="description" required className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1" htmlFor="video">{t.video}</label>
          <input id="video" name="video" className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">{t.submit}</button>
      </form>
    </div>
  );
}
