import { getArticles } from "@/lib/articles.js";

export default async function ArticlesPage({ params }) {
  const lang = params.lang;
  const articles = await getArticles();
  const heading = lang === "en" ? "Articles" : "Articles";

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{heading}</h1>
      <ul className="space-y-2">
        {articles.map((article) => (
          <li key={article.id} className="p-4 rounded-md bg-gray-900/60">
            <h2 className="text-xl font-semibold text-white mb-1">{article.titre}</h2>
            <p className="text-gray-300">{article.contenu}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
