"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const otherLang = lang === "fr" ? "en" : "fr";
  const pathWithoutLang = pathname.replace(/^\/(fr|en)/, "");
  const switchHref = `/${otherLang}${pathWithoutLang}`;
  const switchLabel = otherLang === "fr" ? "Français" : "English";

  return (
    <header className="bg-black text-white">
      <nav className="container mx-auto flex gap-4 p-4 items-center">
        <Link href={`/${lang}`}>{t.home}</Link>
        <Link href={`/${lang}/news`}>{t.news}</Link>
        <Link href={`/${lang}/guides`}>{t.guides}</Link>
        <Link href={`/${lang}/guilds`}>{t.guilds}</Link>
        <Link href={`/${lang}/contact`}>{t.contact}</Link>
        <Link
          href={switchHref}
          className="ml-auto border px-2 py-1 rounded"
        >
          {switchLabel}
        </Link>
      </nav>
    </header>
  );
}
