import type { Metadata } from "next";
import { AppLayout } from "@repo/ui";
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
  return <AppLayout>{children}</AppLayout>;
}
