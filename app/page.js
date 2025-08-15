import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center text-white bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-lg p-10 sm:p-20">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Mortal Online France
        </h1>
        <p className="text-lg sm:text-2xl mb-8">
          Actualités et guides pour les aventuriers francophones de Mortal Online 2
        </p>
        <Link
          href="/news"
          className="inline-block bg-white text-gray-900 font-medium px-6 py-3 rounded-md hover:bg-gray-200 transition"
        >
          Dernières nouvelles
        </Link>
      </section>

      <section className="grid gap-8 md:grid-cols-3">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Guides</h2>
          <p>Des conseils pour maîtriser le monde de Nave.</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Actualités</h2>
          <p>Suivez les dernières informations du jeu.</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Communauté</h2>
          <p>Rejoignez les aventuriers francophones.</p>
        </div>
      </section>
    </div>
  );
}

