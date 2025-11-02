import type { Metadata } from "next";
import { Layout } from "aurigami";
import "@repo/styles/globals.css";

export const metadata: Metadata = {
  title: "CMS Dashboard",
  description: "Content Management System Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
