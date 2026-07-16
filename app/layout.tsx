import type { Metadata } from "next";
import { JetBrains_Mono, DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

// OG urls must be absolute. Order: explicit domain -> Vercel production url -> localhost.
// oscarintuscany.com is the domain; set NEXT_PUBLIC_SITE_URL on Vercel to lock it.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://oscarintuscany.com");

const title = "oscar in tuscany · an application to rick rubin";
const description =
  "music guy turned agent builder. you bring 40 years of taste, i bring the tools. an application to the ai summer residency.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ["Oscar Morke", "Rick Rubin", "AI Summer Residency", "AI Agents", "Tuscany", "music"],
  authors: [{ name: "Oscar Morke" }],
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", creator: "@morkeeth" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="smooth-scroll">
      <body className={`${jetbrainsMono.variable} ${dmSans.variable} ${dmSerif.variable} antialiased`}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
