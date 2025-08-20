"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LangSwitcher({ lang, className = "" }) {
  const pathname = usePathname();
  const otherLang = lang === "fr" ? "en" : "fr";
  const targetPath = pathname ? pathname.replace(/^\/(fr|en)/, `/${otherLang}`) : `/${otherLang}`;

  return (
    <Link href={targetPath} className={className}>
      {otherLang.toUpperCase()}
    </Link>
  );
}
