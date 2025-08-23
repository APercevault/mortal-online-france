import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getGuild, isGuildAdmin } from "@/lib/guilds";
import GuildEditForm from "./GuildEditForm";

export default async function EditGuildPage({ params }) {
  const { guildId } = params;
  const session = await getServerSession(authOptions);
  const guild = getGuild(guildId);

  if (!session || !isGuildAdmin(guildId, session.user.id)) {
    return <p className="p-8">Access denied</p>;
  }
  if (!guild) {
    return <p className="p-8">Guild not found</p>;
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Edit Guild</h1>
      <GuildEditForm guild={guild} />
    </div>
  );
}
