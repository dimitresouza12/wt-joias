import type { Metadata } from "next";
import { Syne, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider/LenisProvider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "optional", // decorativo — sem CLS crítico
});

const SITE_URL = "https://wtjoias.com.br"; // ← atualizar com domínio real

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "WT Joias — Banhado a Ouro 18k",
  description:
    "Cordões, pulseiras, anéis, pingentes e conjuntos femininos banhados a ouro 18k. Acabamento espelhado premium, modelos exclusivos. Atendimento via WhatsApp.",
  keywords: [
    "WT Joias",
    "joias banhadas a ouro",
    "ouro 18k",
    "cordão banhado a ouro",
    "conjunto feminino",
    "corrente grumet",
    "corrente cartier",
    "pingente banhado",
    "pulseira banhada",
    "anel banhado",
    "joias premium",
    "dia dos namorados joias",
  ],
  themeColor: "#050505",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "WT Joias",
    title: "WT Joias — Banhado a Ouro 18k",
    description:
      "Cordões, pulseiras, anéis, pingentes e conjuntos femininos banhados a ouro 18k. Atendimento via WhatsApp.",
    locale: "pt_BR",
    images: [
      {
        url: "/og-image.jpg",   // ← colocar na pasta public/
        width: 1200,
        height: 630,
        alt: "WT Joias — Banhado a Ouro 18k",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WT Joias — Banhado a Ouro 18k",
    description:
      "Cordões, pulseiras, anéis, pingentes e conjuntos femininos banhados a ouro 18k.",
    images: ["/og-image.jpg"],
  },
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
