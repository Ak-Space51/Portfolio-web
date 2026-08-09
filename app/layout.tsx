import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tactical-hud-portfolio.vercel.app"),
  title: {
    default: "OPERATOR // Tactical Systems Interface",
    template: "%s // Tactical Systems Interface",
  },
  description:
    "Personnel command interface for a software engineer — operations, capabilities and deployment history rendered as a tactical HUD operating system.",
  keywords: [
    "software engineer",
    "portfolio",
    "frontend",
    "cyberpunk",
    "HUD",
    "command center",
  ],
  authors: [{ name: "OPERATOR" }],
  openGraph: {
    title: "OPERATOR // Tactical Systems Interface",
    description:
      "A software engineer's portfolio rendered as a futuristic tactical command-center operating system.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${rajdhani.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-accent focus:px-4 focus:py-2 focus:text-bg focus:head focus:text-xs focus:tracking-widest"
        >
          SKIP TO MAIN CONTENT
        </a>
        {children}
      </body>
    </html>
  );
}
