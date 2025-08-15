import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black text-white">
      <nav className="container mx-auto flex gap-4 p-4">
        <Link href="/">Accueil</Link>
        <Link href="/news">Actualités</Link>
        <Link href="/guides">Guides</Link>
        <Link href="/guilds">Guildes</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
