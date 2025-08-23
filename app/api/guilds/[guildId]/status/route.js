import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma.js';

export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'superadmin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { guildId } = params;
  const { action } = await request.json();
  const guild = await prisma.guild.findUnique({
    where: { id: guildId },
    include: { guildAdmins: true },
  });

  if (!guild) {
    return NextResponse.json({ error: 'Guild not found' }, { status: 404 });
  }

  if (action === 'approve') {
    await prisma.guild.update({
      where: { id: guildId },
      data: { status: 'published' },
    });
    const creator = guild.guildAdmins[0];
    if (creator) {
      await prisma.user.update({
        where: { id: creator.userId },
        data: { role: 'admin' },
      });
    }
  } else if (action === 'reject') {
    await prisma.guild.update({
      where: { id: guildId },
      data: { status: 'rejected' },
    });
  } else {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
