import { Vollkorn_SC } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const vollkorn = Vollkorn_SC({
  variable: "--font-vollkorn",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mortal Online France",
  description: "Actualités et guides francophones pour Mortal Online 2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${vollkorn.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 container mx-auto p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
