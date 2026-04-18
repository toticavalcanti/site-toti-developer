import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Toti Cavalcanti | Desenvolvedor, Videoclipes com IA e Músico Profissional",
  description: "Desenvolvimento web full-stack, videoclipes profissionais com IA generativa, arte generativa para produtos e pocket shows ao vivo. Cases: Site Zé Ramalho, Scarlett Finch, lojas Redbubble e Colab55.",
  keywords: [
    "desenvolvimento web",
    "videoclipes com ia",
    "ia generativa",
    "músico profissional",
    "pocket show",
    "saxofone",
    "flauta",
    "arte generativa",
    "redbubble",
    "colab55",
    "next.js",
    "toti cavalcanti",
    "zé ramalho",
    "scarlett finch"
  ],
  authors: [{ name: "Toti Cavalcanti" }],
  openGraph: {
    title: "Toti Cavalcanti - Desenvolvedor, Videoclipes IA e Músico",
    description: "Desenvolvimento web full-stack, videoclipes com IA, arte generativa e apresentações musicais ao vivo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-background text-foreground relative`}
        suppressHydrationWarning
      >
        <ParticlesBackground />
        <div className="relative">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

