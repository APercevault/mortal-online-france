import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma.js";

export async function GET(request, { params }) {
  const guild = await prisma.guild.findUnique({ where: { id: params.guildId } });
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
  const admin = await prisma.guildAdmin.findUnique({
    where: {
      userId_guildId: {
        userId: session.user.id,
        guildId: params.guildId,
      },
    },
  });
  if (!admin) {
    return new Response("Forbidden", { status: 403 });
  }
  const data = await request.json();
  const updated = await prisma.guild.update({
    where: { id: params.guildId },
    data: {
      description: data.description ?? undefined,
    },
  });
  return new Response(JSON.stringify(updated), {
    headers: { "Content-Type": "application/json" },
  });
}
