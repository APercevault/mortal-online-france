export default function Footer({ lang }) {
  const year = new Date().getFullYear();
  const text =
    lang === "en"
      ? `© ${year} Mortal Online France – unofficial website`
      : `© ${year} Mortal Online France – site non officiel`;

  return (
    <footer className="bg-black text-white text-center py-4 text-sm">
      {text}
    </footer>
  );
}
