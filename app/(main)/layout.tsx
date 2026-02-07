import type { Metadata } from "next";
import { LayoutWrapper } from "@/components/layout-wrapper";

export const metadata: Metadata = {
  title: "SambungRasa",
  description: "Digitalized conversation card game for meaningful gatherings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
