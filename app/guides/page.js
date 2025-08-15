import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function GuidesPage() {
  const guidesDir = path.join(process.cwd(), 'content', 'guides');
  const files = fs.existsSync(guidesDir) ? fs.readdirSync(guidesDir) : [];
  const guides = files
    .filter((file) => file.endsWith('.json'))
    .map((file) => {
      const { title } = JSON.parse(
        fs.readFileSync(path.join(guidesDir, file), 'utf8')
      );
      return {
        slug: file.replace(/\.json$/, ''),
        title,
      };
    });

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Guides</h1>
      <ul className="space-y-2">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="text-blue-500 hover:underline"
            >
              {guide.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

