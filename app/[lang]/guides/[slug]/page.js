import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

export default async function GuidePage({ params }) {
  const { lang, slug } = params;
  const filePath = path.join(
    process.cwd(),
    "content",
    lang,
    "guides",
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const GuideContent = (
    await import(`../../../../content/${lang}/guides/${slug}.mdx`)
  ).default;

  return (
    <article className="prose">
      <GuideContent />
    </article>
  );
}

export function generateStaticParams() {
  const locales = ["fr", "en"];
  const params = [];

  for (const lang of locales) {
    const guidesDir = path.join(process.cwd(), "content", lang, "guides");
    if (!fs.existsSync(guidesDir)) {
      continue;
    }

    fs
      .readdirSync(guidesDir)
      .filter((file) => file.endsWith(".mdx"))
      .forEach((file) => {
        params.push({ lang, slug: file.replace(/\.mdx$/, "") });
      });
  }

  return params;
}
