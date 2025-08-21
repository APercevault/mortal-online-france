/* eslint-disable @next/next/no-page-custom-font */
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mortal Online France",
  description: "Actualités et guides francophones pour Mortal Online 2",
};

export default function RootLayout({ children, params }) {
  const lang = params?.lang || "fr";

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Vollkorn+SC:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto p-4">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
