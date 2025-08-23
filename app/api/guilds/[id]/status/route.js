import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getGuildById, updateGuildStatus, addGuildAdmin, notifyUser } from '@/lib/guilds';

export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'superadmin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  const { action } = await request.json();
  const guild = getGuildById(id);

  if (!guild) {
    return NextResponse.json({ error: 'Guild not found' }, { status: 404 });
  }

  if (action === 'approve') {
    updateGuildStatus(id, 'published');
    addGuildAdmin(id, guild.authorId);
    notifyUser(guild.authorId, 'Your guild has been approved');
  } else if (action === 'reject') {
    updateGuildStatus(id, 'rejected');
    notifyUser(guild.authorId, 'Your guild has been rejected');
  } else {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
