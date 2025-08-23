import { addComment, getComments } from "@/lib/guilds";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const data = getComments(params.guildId, page, limit);
  if (!data) {
    return new Response("Guild not found", { status: 404 });
  }
  return Response.json(data);
}

export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { content } = await request.json();
  const comment = addComment(params.guildId, session.user.id, content);
  if (!comment) {
    return new Response("Guild not found", { status: 404 });
  }
  return Response.json(comment, { status: 201 });
}
