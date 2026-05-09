import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const siteUrl = "https://paintersgo.top";
const siteTitle = "PaintersGO - AI-Driven 3D Modeling on Android";
const siteDescription =
  "PaintersGO is an Android AI 3D creation studio for turning text or images into editable, printable 3D models.";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "PaintersGO",
  title: {
    default: siteTitle,
    template: "%s",
  },
  description: siteDescription,
  keywords: [
    "PaintersGO",
    "AI 3D",
    "text to 3D",
    "image to 3D",
    "Android 3D modeling",
    "3D printing",
  ],
  authors: [{ name: "Gan Binyi", url: `${siteUrl}/author` }],
  creator: "Gan Binyi",
  publisher: "PaintersGO",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      zh: "/?lang=zh",
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "PaintersGO",
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    alternateLocale: ["zh_CN"],
    images: [
      {
        url: "/ar-hero.webp",
        width: 1920,
        height: 1025,
        alt: "PaintersGO Android AI 3D creation preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/ar-hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-surface font-body selection:bg-primary/30">
        {children}
      </body>
    </html>
  );
}
