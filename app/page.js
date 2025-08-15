import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-24">
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden rounded-lg">
        <Image
          src="/mo2-hero.jpg"
          alt="Guerriers se préparant pour la bataille dans Mortal Online 2"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 drop-shadow-md">
            Mortal Online France
          </h1>
          <p className="text-lg sm:text-2xl text-gray-200 mb-8 max-w-2xl">
            Actualités, guides et communauté pour les aventuriers francophones de Nave.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/news"
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-md transition"
            >
              Dernières nouvelles
            </Link>
            <Link
              href="/guides"
              className="bg-gray-100/90 hover:bg-white text-gray-900 font-medium px-6 py-3 rounded-md transition"
            >
              Nos guides
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-3">
        <div className="bg-gray-900/60 rounded-lg p-6 text-center hover:bg-gray-900 transition">
          <h2 className="text-2xl font-semibold mb-2 text-white">Guides</h2>
          <p className="text-gray-300">Des conseils pour maîtriser le monde de Nave.</p>
        </div>
        <div className="bg-gray-900/60 rounded-lg p-6 text-center hover:bg-gray-900 transition">
          <h2 className="text-2xl font-semibold mb-2 text-white">Actualités</h2>
          <p className="text-gray-300">Suivez les dernières informations du jeu.</p>
        </div>
        <div className="bg-gray-900/60 rounded-lg p-6 text-center hover:bg-gray-900 transition">
          <h2 className="text-2xl font-semibold mb-2 text-white">Communauté</h2>
          <p className="text-gray-300">Rejoignez les aventuriers francophones.</p>
        </div>
      </section>
    </div>
  );
}
