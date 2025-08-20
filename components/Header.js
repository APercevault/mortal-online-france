"use client";

import Link from "next/link";
import Image from "next/image";
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

  // Remove the current language prefix from the path. If the resulting
  // string is empty, we're on the homepage and we keep it that way so the
  // switch link leads back to the French root.
  const pathWithoutLang = pathname.replace(/^\/(fr|en)/, "") || "/";
  const cleanPath = pathWithoutLang === "/" ? "" : pathWithoutLang;

  // Build the destination URL for the language switcher. When the current
  // language is English we explicitly link back to the French version of the
  // same page.
  const switchHref = `/${otherLang}${cleanPath}`;
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
          className="ml-auto border px-2 py-1 rounded flex items-center gap-2"
        >
          <Image
            src={`/flags/${otherLang}.svg`}
            width={20}
            height={15}
            alt={switchLabel}
          />
          {switchLabel}
        </Link>
      </nav>
    </header>
  );
}
