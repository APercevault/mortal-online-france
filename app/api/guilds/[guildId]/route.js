import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getGuild, updateGuild, isGuildAdmin } from "@/lib/guilds";

export async function GET(request, { params }) {
  const guild = getGuild(params.guildId);
  if (!guild) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(JSON.stringify(guild), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!isGuildAdmin(params.guildId, session.user.id)) {
    return new Response("Forbidden", { status: 403 });
  }
  const data = await request.json();
  const updated = updateGuild(params.guildId, data);
  if (!updated) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(JSON.stringify(updated), {
    headers: { "Content-Type": "application/json" },
  });
}
