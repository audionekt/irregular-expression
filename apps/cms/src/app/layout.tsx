import type { Metadata } from "next";
import { Layout } from "aurigami";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "CMS Dashboard",
  description: "Content Management System Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      <Providers>{children}</Providers>
    </Layout>
  );
}
