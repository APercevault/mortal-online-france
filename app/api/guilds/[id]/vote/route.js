import { addVote, getGuildById, getAverageRating } from "../../../../lib/guilds.js";
import { authOptions } from "../../../../lib/auth.js";
import { getServerSession } from "next-auth";

export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { rating } = await request.json();
  const guild = addVote(params.id, session.user.id, Number(rating));
  if (!guild) {
    return new Response("Guild not found", { status: 404 });
  }
  const average = getAverageRating(guild);
  return Response.json({ average });
}

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  const guild = getGuildById(params.id);
  if (!guild) {
    return new Response("Guild not found", { status: 404 });
  }
  const average = getAverageRating(guild);
  const userRating = session ? guild.votes[session.user.id] : undefined;
  return Response.json({ average, userRating });
}
