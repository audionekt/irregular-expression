import type { Metadata } from "next";
import { Layout } from "aurigami/layout";
import "@repo/styles/globals.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Personal blog and writing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
