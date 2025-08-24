/* eslint-disable @next/next/no-html-link-for-pages */
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getPendingGuilds } from '@/lib/guilds';

const texts = {
  fr: {
    signIn: 'Se connecter avec Discord',
    accessDenied: 'Accès refusé',
    title: 'Guildes en attente',
    approve: 'Approuver',
    reject: 'Rejeter',
  },
  en: {
    signIn: 'Sign in with Discord',
    accessDenied: 'Access denied',
    title: 'Pending guilds',
    approve: 'Approve',
    reject: 'Reject',
  },
};

export default async function PendingGuildsPage({ params }) {
  const lang = params.lang;
  const t = texts[lang] || texts.fr;
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <a href="/api/auth/signin/discord" className="underline">
          {t.signIn}
        </a>
      </div>
    );
  }

  if (session.user.role !== 'superadmin') {
    return <p>{t.accessDenied}</p>;
  }

  const guilds = getPendingGuilds();

  return (
    <div>
      <h1 className="text-xl mb-4">{t.title}</h1>
      <ul>
        {guilds.map((g) => (
          <li key={g.id} className="mb-2">
            {g.name}
            <form
              action={`/api/guilds/${g.id}/status`}
              method="POST"
              className="inline ml-2"
            >
              <input type="hidden" name="action" value="approve" />
              <button className="underline mr-2">{t.approve}</button>
            </form>
            <form
              action={`/api/guilds/${g.id}/status`}
              method="POST"
              className="inline"
            >
              <input type="hidden" name="action" value="reject" />
              <button className="underline">{t.reject}</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
