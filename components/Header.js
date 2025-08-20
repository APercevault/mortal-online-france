import Link from "next/link";

const labels = {
  fr: {
    home: "Accueil",
    news: "Actualités",
    guides: "Guides",
    guilds: "Guildes",
    contact: "Contact",
  },
  en: {
    home: "Home",
    news: "News",
    guides: "Guides",
    guilds: "Guilds",
    contact: "Contact",
  },
};

export default function Header({ lang }) {
  const t = labels[lang] || labels.fr;

  return (
    <header className="bg-black text-white">
      <nav className="container mx-auto flex gap-4 p-4">
        <Link href={`/${lang}`}>{t.home}</Link>
        <Link href={`/${lang}/news`}>{t.news}</Link>
        <Link href={`/${lang}/guides`}>{t.guides}</Link>
        <Link href={`/${lang}/guilds`}>{t.guilds}</Link>
        <Link href={`/${lang}/contact`}>{t.contact}</Link>
      </nav>
    </header>
  );
}
