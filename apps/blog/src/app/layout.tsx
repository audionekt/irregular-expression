import type { Metadata } from "next";
import { Layout } from "aurigami";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Blog",
  description: "Personal blog and writing",
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
