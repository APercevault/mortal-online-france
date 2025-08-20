export default function Contact({ params }) {
  const lang = params.lang;
  const texts = {
    fr: {
      title: "Contact",
      description:
        "Pour toute question ou suggestion, vous pouvez nous contacter à l'adresse suivante :",
    },
    en: {
      title: "Contact",
      description: "For any questions or suggestions, you can reach us at:",
    },
  };
  const t = texts[lang] || texts.fr;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <p>
        {t.description}
        {" "}
        <a className="text-indigo-600 hover:underline" href="mailto:contact@mortalonline.fr">
          contact@mortalonline.fr
        </a>
      </p>
    </div>
  );
}
