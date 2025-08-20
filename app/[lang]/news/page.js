import fs from "fs";
import path from "path";
import Link from "next/link";

export default function NewsPage({ params }) {
  const lang = params.lang;
  const newsDir = path.join(process.cwd(), "content", lang, "news");
  const files = fs.existsSync(newsDir) ? fs.readdirSync(newsDir) : [];
  const articles = files
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const { title, date } = JSON.parse(
        fs.readFileSync(path.join(newsDir, file), "utf8")
      );
      return {
        slug: file.replace(/\.json$/, ""),
        title,
        date,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const heading = lang === "en" ? "News" : "Actualités";

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{heading}</h1>
      <ul className="space-y-2">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/${lang}/news/${article.slug}`}
              className="text-blue-500 hover:underline"
            >
              {article.title}
            </Link>
            <span className="block text-sm text-gray-500">{article.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
