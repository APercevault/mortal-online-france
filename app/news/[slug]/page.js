import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

export default function NewsArticle({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'content', 'news', `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const { title, date, content } = JSON.parse(
    fs.readFileSync(filePath, 'utf8')
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
  const newsDir = path.join(process.cwd(), 'content', 'news');
  return fs
    .readdirSync(newsDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => ({ slug: file.replace(/\.json$/, '') }));
}
