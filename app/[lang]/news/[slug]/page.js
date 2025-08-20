import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

export default function NewsArticle({ params }) {
  const { lang, slug } = params;
  const filePath = path.join(
    process.cwd(),
    "content",
    lang,
    "news",
    `${slug}.json`
  );
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const { title, date, content } = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  return (
    <article className="prose">
      <h1>{title}</h1>
      <p className="text-sm text-gray-500">{date}</p>
      <p>{content}</p>
    </article>
  );
}

export function generateStaticParams() {
  const locales = ["fr", "en"];
  const params = [];

  for (const lang of locales) {
    const newsDir = path.join(process.cwd(), "content", lang, "news");
    if (!fs.existsSync(newsDir)) {
      continue;
    }

    fs
      .readdirSync(newsDir)
      .filter((file) => file.endsWith(".json"))
      .forEach((file) => {
        params.push({ lang, slug: file.replace(/\.json$/, "") });
      });
  }

  return params;
}
