import type { Metadata } from "next";
import { Syne, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider/LenisProvider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WT Joias — Ouro 18k Legítimo",
  description:
    "Cordões, pulseiras, anéis e pingentes em ouro 18k legítimo (750). Peças maciças com acabamento espelhado e garantia eterna de autenticidade. Atendimento VIP via WhatsApp.",
  keywords: [
    "WT Joias",
    "joias masculinas",
    "ouro 18k",
    "ouro 750",
    "cordão de ouro",
    "corrente grumet",
    "corrente cartier",
    "pingente de ouro",
    "pulseira de ouro",
    "anel de ouro",
    "dediras",
    "joias de luxo",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${syne.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
