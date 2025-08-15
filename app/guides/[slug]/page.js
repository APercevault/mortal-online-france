import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

export default async function GuidePage({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'content', 'guides', `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const GuideContent = (await import(`../../../content/guides/${slug}.mdx`)).default;

  return (
    <article className="prose">
      <GuideContent />
    </article>
  );
}

export function generateStaticParams() {
  const guidesDir = path.join(process.cwd(), 'content', 'guides');
  if (!fs.existsSync(guidesDir)) {
    return [];
  }

  return fs
    .readdirSync(guidesDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({ slug: file.replace(/\.mdx$/, '') }));
}
