import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Providers from "./_components/Provider";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "designhunt - join the waitlist",
  description:
    "A curated launchpad for designers, frontend developers, and creative coders. Discover and share the latest UI experiments, micro-interactions, animations, and web design tools.",
  openGraph: {
    images: ["/ogimage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "designhunt - join the waitlist",
    description:
      "A curated launchpad for designers, frontend developers, and creative coders. Discover and share the latest UI experiments, micro-interactions, animations, and web design tools.",
    images: ["/ogimage.png"],
    creator: "@ronitrajfr",
  },
  icons: [{ rel: "icon", url: "/logo.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <Providers>
        <body>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </Providers>
    </html>
  );
}
