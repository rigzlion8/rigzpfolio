import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import Analytics from "@/components/Analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MaishaTech - Software Development Portfolio",
    template: "%s | MaishaTech Portfolio"
  },
  description: "Professional software development portfolio showcasing 8+ real-world applications including e-commerce, service delivery, chat platforms, payment gateways, and analytics dashboards. Built with Next.js, TypeScript, and modern cloud technologies.",
  keywords: [
    "software developer",
    "portfolio",
    "web development",
    "Next.js",
    "TypeScript",
    "React",
    "e-commerce",
    "payment gateway",
    "chat application",
    "service delivery",
    "Kenya developer",
    "full-stack developer",
    "cloud applications",
    "MongoDB",
    "Tailwind CSS"
  ],
  authors: [{ name: "Rigz Lion", url: "https://maishatech.co.ke" }],
  creator: "Rigz Lion",
  publisher: "MaishaTech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://maishatech.co.ke"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://maishatech.co.ke",
    title: "MaishaTech - Software Development Portfolio",
    description: "Professional software development portfolio showcasing 8+ real-world applications including e-commerce, service delivery, chat platforms, payment gateways, and analytics dashboards.",
    siteName: "MaishaTech Portfolio",
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: "MaishaTech Portfolio - Software Development Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MaishaTech - Software Development Portfolio",
    description: "Professional software development portfolio showcasing 8+ real-world applications including e-commerce, service delivery, chat platforms, payment gateways, and analytics dashboards.",
    images: ["/og-image"],
    creator: "@rigzlion8",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "your-google-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rigz Lion",
  jobTitle: "Software Developer",
  description: "Full-stack software developer specializing in modern web technologies and cloud applications",
  url: "https://maishatech.co.ke",
  sameAs: [
    "https://github.com/rigzlion8",
    "https://twitter.com/rigzlion8",
    "https://linkedin.com/in/rigzlion8"
  ],
  knowsAbout: [
    "Web Development",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Cloud Computing",
    "E-commerce",
    "Payment Systems",
    "Real-time Applications"
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Software Developer",
    description: "Developing modern web applications and cloud-native solutions"
  },
  worksFor: {
    "@type": "Organization",
    name: "MaishaTech",
    url: "https://maishatech.co.ke"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}