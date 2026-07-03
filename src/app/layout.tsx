import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "@/components/common/providers";

export const metadata: Metadata = {
  title: "AxioPanel",
  description: "Infrastructure Platform by AxioWeb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}