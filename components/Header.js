import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white">
      <nav className="container mx-auto flex gap-4 p-4">
        <Link href="/">Accueil</Link>
        <Link href="/news">Actualités</Link>
        <Link href="/guides">Guides</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
