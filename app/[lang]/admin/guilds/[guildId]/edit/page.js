import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getGuild, isGuildAdmin } from "@/lib/guilds";
import GuildEditForm from "./GuildEditForm";

export default async function EditGuildPage({ params }) {
  const { guildId } = params;
  const session = await getServerSession(authOptions);
  const guild = getGuild(guildId);

  if (!session || !isGuildAdmin(guildId, session.user.id)) {
    return <p>Access denied</p>;
  }
  if (!guild) {
    return <p>Guild not found</p>;
  }
  return (
    <div>
      <h1 className="text-2xl mb-4">Edit Guild</h1>
      <GuildEditForm guild={guild} />
    </div>
  );
}
