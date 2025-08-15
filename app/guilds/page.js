import Image from "next/image";

export const metadata = {
  title: "Guildes",
  description: "Présentation des guildes et médias",
};

export default function GuildsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Présentation des guildes</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Stream Twitch</h2>
        <div className="aspect-video w-full">
          <iframe
            src="https://player.twitch.tv/?channel=example&parent=localhost"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Vidéo YouTube</h2>
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
        <h2 className="text-2xl font-semibold">Capture d&apos;écran</h2>
        <Image
          src="/mo2-hero.jpg"
          alt="Capture du jeu"
          width={800}
          height={450}
          className="w-full h-auto"
        />
      </section>
    </div>
  );
}
