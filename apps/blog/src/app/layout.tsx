import type { Metadata } from "next";
import { AppLayout } from "@repo/ui";
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
  return <AppLayout>{children}</AppLayout>;
}
