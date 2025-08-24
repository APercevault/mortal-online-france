const texts = {
  fr: {
    title: "Demande envoyée",
    message: "Votre guilde a été soumise et sera examinée prochainement.",
  },
  en: {
    title: "Request sent",
    message: "Your guild has been submitted and will be reviewed soon.",
  },
};

export default function GuildConfirmationPage({ params }) {
  const lang = params.lang;
  const t = texts[lang] || texts.fr;
  return (
    <div>
      <h1 className="text-2xl mb-4">{t.title}</h1>
      <p>{t.message}</p>
    </div>
  );
}
