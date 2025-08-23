import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma.js";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const video = formData.get("video");

  await prisma.guild.create({
    data: {
      name,
      description,
      status: "pending",
      guildAdmins: {
        create: { userId: session.user.id },
      },
      videos: video
        ? {
            create: { url: video, type: "youtube" },
          }
        : undefined,
    },
  });

  const lang = request.nextUrl.searchParams.get("lang") || "fr";
  return NextResponse.redirect(
    new URL(`/${lang}/admin/guilds/new/confirmation`, request.url)
  );
}
