"use server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function deleteComment(formData) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "superadmin") {
    throw new Error("Forbidden");
  }
  const id = parseInt(formData.get("id"), 10);
  const filePath = path.join(process.cwd(), "data", "comments.json");
  const comments = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const newComments = comments.filter((c) => c.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(newComments, null, 2));
}
