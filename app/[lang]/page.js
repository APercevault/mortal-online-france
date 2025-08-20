import Link from "next/link";
import Image from "next/image";

const translations = {
  fr: {
    alt: "Guerriers se préparant pour la bataille dans Mortal Online 2",
    subtitle:
      "Actualités, guides et communauté pour les aventuriers francophones de Nave.",
    latestNews: "Dernières nouvelles",
    ourGuides: "Nos guides",
    sections: {
      guidesTitle: "Guides",
      guidesDesc: "Des conseils pour maîtriser le monde de Nave.",
      newsTitle: "Actualités",
      newsDesc: "Suivez les dernières informations du jeu.",
      communityTitle: "Communauté",
      communityDesc: "Rejoignez les aventuriers francophones.",
    },
  },
  en: {
    alt: "Warriors preparing for battle in Mortal Online 2",
    subtitle:
      "News, guides and community for the French-speaking adventurers of Nave.",
    latestNews: "Latest news",
    ourGuides: "Our guides",
    sections: {
      guidesTitle: "Guides",
      guidesDesc: "Tips to master the world of Nave.",
      newsTitle: "News",
      newsDesc: "Follow the latest game updates.",
      communityTitle: "Community",
      communityDesc: "Join French-speaking adventurers.",
    },
  },
};

export default function Home({ params }) {
  const lang = params.lang;
  const t = translations[lang] || translations.fr;

  return (
    <div className="space-y-24">
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden rounded-lg">
        <Image
          src="/mo2-hero.jpg"
          alt={t.alt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 drop-shadow-md">
            Mortal Online France
          </h1>
          <p className="text-lg sm:text-2xl text-gray-200 mb-8 max-w-2xl">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${lang}/news`}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-md transition"
            >
              {t.latestNews}
            </Link>
            <Link
              href={`/${lang}/guides`}
              className="bg-gray-100/90 hover:bg-white text-gray-900 font-medium px-6 py-3 rounded-md transition"
            >
              {t.ourGuides}
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-3">
        <div className="bg-gray-900/60 rounded-lg p-6 text-center hover:bg-gray-900 transition">
          <h2 className="text-2xl font-semibold mb-2 text-white">{t.sections.guidesTitle}</h2>
          <p className="text-gray-300">{t.sections.guidesDesc}</p>
        </div>
        <div className="bg-gray-900/60 rounded-lg p-6 text-center hover:bg-gray-900 transition">
          <h2 className="text-2xl font-semibold mb-2 text-white">{t.sections.newsTitle}</h2>
          <p className="text-gray-300">{t.sections.newsDesc}</p>
        </div>
        <div className="bg-gray-900/60 rounded-lg p-6 text-center hover:bg-gray-900 transition">
          <h2 className="text-2xl font-semibold mb-2 text-white">{t.sections.communityTitle}</h2>
          <p className="text-gray-300">{t.sections.communityDesc}</p>
        </div>
      </section>
    </div>
  );
}
