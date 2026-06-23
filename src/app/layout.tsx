import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { MyTypeProvider } from "@/contexts/my-type-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "Enneagram Growth",
    template: "%s | Enneagram Growth",
  },
  description:
    "A place to watch yourself, with depth, not diagnosis. Explore the nine Enneagram types, discover your path, and grow at your own pace.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    siteName: "Enneagram Growth",
    locale: "en_US",
    images: [
      {
        url: "/images/hero-nature.jpg",
        width: 1200,
        height: 630,
        alt: "Enneagram Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-dvh flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white focus:text-small focus:font-medium focus:shadow-lg"
        >
          Skip to content
        </a>
        <MyTypeProvider>
          {children}
          <Toaster />
        </MyTypeProvider>
      </body>
    </html>
  );
}
