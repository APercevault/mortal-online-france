import Image from "next/image";

export async function generateMetadata({ params: { lang } }) {
  return {
    title: lang === "en" ? "Guilds" : "Guildes",
    description:
      lang === "en"
        ? "Guild presentation and media"
        : "Présentation des guildes et médias",
  };
}

const texts = {
  fr: {
    title: "Présentation des guildes",
    twitch: "Stream Twitch",
    youtube: "Vidéo YouTube",
    screenshot: "Capture d'écran",
    alt: "Capture du jeu",
  },
  en: {
    title: "Guild showcase",
    twitch: "Twitch stream",
    youtube: "YouTube video",
    screenshot: "Screenshot",
    alt: "Game screenshot",
  },
};

export default function GuildsPage({ params }) {
  const lang = params.lang;
  const t = texts[lang] || texts.fr;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{t.title}</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t.twitch}</h2>
        <div className="aspect-video w-full">
          <iframe
            src="https://player.twitch.tv/?channel=example&parent=localhost"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t.youtube}</h2>
        <div className="aspect-video w-full">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t.screenshot}</h2>
        <Image
          src="/mo2-hero.jpg"
          alt={t.alt}
          width={800}
          height={450}
          className="w-full h-auto"
        />
      </section>
    </div>
  );
}
