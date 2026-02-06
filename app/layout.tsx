import type { Metadata } from "next";
import { Outfit, Merriweather } from "next/font/google";
import "@/app/globals.css";
import { ModalProvider } from "@/components/modal";
import { LayoutWrapper } from "@/components/layout-wrapper";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Obrolan Card Game",
  description: "Digitalized conversation card game for meaningful gatherings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="obrolan">
      <body
        className={`${outfit.variable} ${merriweather.variable} antialiased min-h-screen flex flex-col bg-gradient-game`}
      >
        <ModalProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ModalProvider>
      </body>
    </html>
  );
}
