"use server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function deleteGuild(formData) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "superadmin") {
    throw new Error("Forbidden");
  }
  const id = parseInt(formData.get("id"), 10);
  const filePath = path.join(process.cwd(), "data", "guilds.json");
  const guilds = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const newGuilds = guilds.filter((g) => g.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(newGuilds, null, 2));
}
