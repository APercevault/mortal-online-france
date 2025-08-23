import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const video = formData.get("video");

  const guild = {
    name,
    description,
    video,
    status: "pending",
    author: {
      name: session.user.name,
      email: session.user.email,
    },
    createdAt: new Date().toISOString(),
  };

  const filePath = path.join(process.cwd(), "data", "guilds.json");
  let guilds = [];
  try {
    const file = await fs.readFile(filePath, "utf8");
    guilds = JSON.parse(file);
  } catch {
    // file does not exist or is invalid
  }
  guilds.push(guild);
  await fs.writeFile(filePath, JSON.stringify(guilds, null, 2));

  const lang = request.nextUrl.searchParams.get("lang") || "fr";
  return NextResponse.redirect(
    new URL(`/${lang}/admin/guilds/new/confirmation`, request.url)
  );
}
