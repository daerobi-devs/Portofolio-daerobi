import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://daeroom.my.id"),
  title: {
    default: "Daerobi — Full-Stack Software Engineer & Homelab Architect",
    template: "%s | Daerobi",
  },
  description:
    "Official Portfolio of Daerobi — Full-Stack Software Engineer, Founder Buatin.biz.id & Informatics Student at Universitas Pamulang. Specializing in Next.js, React, TypeScript, Docker, and AI Agentic workflows.",
  keywords: [
    "Daerobi",
    "daeroom",
    "daeroom.my.id",
    "Daerobi Portfolio",
    "Daerobi Software Engineer",
    "Daerobi Web Developer",
    "Daerobi Pamulang",
    "Universitas Pamulang",
    "Buatin.biz.id",
    "Next.js Developer Indonesia",
    "Full-Stack Engineer",
    "Homelab Engineer",
    "Coolify",
    "Proxmox",
  ],
  authors: [{ name: "Daerobi", url: "https://daeroom.my.id" }],
  creator: "Daerobi",
  publisher: "Daerobi",
  alternates: {
    canonical: "https://daeroom.my.id",
  },
  openGraph: {
    title: "Daerobi — Full-Stack Software Engineer & Homelab Architect",
    description:
      "Official Portfolio of Daerobi — Full-Stack Software Engineer, Founder Buatin.biz.id. Membangun aplikasi web modern, sistem terdistribusi, dan infrastruktur homelab mandiri.",
    url: "https://daeroom.my.id",
    siteName: "Daerobi Portfolio",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/dr-logo.png",
        width: 800,
        height: 800,
        alt: "Daerobi Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daerobi — Full-Stack Software Engineer",
    description:
      "Official Portfolio of Daerobi — Next.js, React, TypeScript, and Homelab Infrastructure.",
    images: ["/dr-logo.png"],
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
  icons: {
    icon: "/dr-logo.png",
    shortcut: "/dr-logo.png",
    apple: "/dr-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Daerobi",
    alternateName: ["daeroom", "dae.obiy"],
    url: "https://daeroom.my.id",
    image: "https://daeroom.my.id/dr-logo.png",
    jobTitle: "Full-Stack Software Engineer & Founder",
    worksFor: {
      "@type": "Organization",
      name: "Buatin.biz.id",
      url: "https://buatin.biz.id",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Universitas Pamulang",
    },
    sameAs: [
      "https://github.com/daerobi-devs",
      "https://www.instagram.com/dae.obiy",
      "https://wa.me/6285123607711",
      "https://daeroom.my.id",
    ],
    knowsAbout: [
      "Software Engineering",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Docker",
      "Proxmox",
      "Coolify",
      "AI Agentic Systems",
    ],
  };

  return (
    <html lang="id" className={`${sansFont.variable} ${monoFont.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-[#0c0d10] text-[#e4e4e7] font-sans selection:bg-amber-500/20 selection:text-amber-300">
        <div className="fixed inset-0 tech-grid pointer-events-none opacity-60 z-0" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
