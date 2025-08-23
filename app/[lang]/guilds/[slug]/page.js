import { notFound } from "next/navigation";
import { guilds, getGuildBySlug, getAverageRating, getComments } from "../../../../lib/guilds.js";
import GuildInteractions from "./GuildInteractions.js";

export default function GuildPage({ params }) {
  const { slug } = params;
  const guild = getGuildBySlug(slug);
  if (!guild) {
    notFound();
  }
  const average = getAverageRating(guild);
  const initial = getComments(guild.id, 1, 10);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{guild.name}</h1>
      <p>{guild.description}</p>
      <GuildInteractions
        guildId={guild.id}
        initialAverage={average}
        initialComments={initial.comments}
      />
    </div>
  );
}

export function generateStaticParams() {
  const langs = ["fr", "en"]; // generate for both languages
  const params = [];
  for (const lang of langs) {
    for (const g of guilds) {
      params.push({ lang, slug: g.slug });
    }
  }
  return params;
}
