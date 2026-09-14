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
  title: "Daerobi — Web Developer & Homelab Engineer",
  description: "Mahasiswa IT Universitas Pamulang & Founder Buatin.biz.id. Membangun aplikasi web modern, sistem terdistribusi, dan infrastruktur homelab mandiri.",
  keywords: ["Daerobi", "Portfolio", "Web Developer", "Universitas Pamulang", "Buatin.biz.id", "Next.js", "Coolify", "Proxmox", "Homelab"],
  authors: [{ name: "Daerobi", url: "https://github.com/daerobi-devs" }],
  openGraph: {
    title: "Daerobi — Web Developer & Homelab Engineer",
    description: "Portofolio arsitektur web modern, real-time micro-services, dan live projects berbasis homelab Coolify & Proxmox.",
    type: "website",
    locale: "id_ID",
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
  return (
    <html lang="id" className={`${sansFont.variable} ${monoFont.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen bg-[#0c0d10] text-[#e4e4e7] font-sans selection:bg-amber-500/20 selection:text-amber-300">
        <div className="fixed inset-0 tech-grid pointer-events-none opacity-60 z-0" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
