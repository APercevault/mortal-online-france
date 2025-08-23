"use server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function updateUserRole(formData) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "superadmin") {
    throw new Error("Forbidden");
  }
  const id = formData.get("id");
  const role = formData.get("role");
  const filePath = path.join(process.cwd(), "data", "users.json");
  const users = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const user = users.find((u) => u.id === id);
  if (user) {
    user.role = role;
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  }
}
