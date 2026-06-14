import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prathmeshparab.dev"),
  title: {
    default: "Prathmesh Parab - Software Engineer",
    template: "%s | Prathmesh Parab",
  },
  description:
    "Software Engineer & Frontend Developer specializing in Next.js, React, TypeScript, and Flutter. Building high-performance web and mobile applications.",
  keywords: [
    "Prathmesh Parab",
    "Frontend Developer",
    "Software Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Flutter",
    "Portfolio",
  ],
  authors: [{ name: "Prathmesh Parab", url: "https://prathmeshparab.dev" }],
  creator: "Prathmesh Parab",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prathmeshparab.dev",
    title: "Prathmesh Parab - Software Engineer & Frontend Developer",
    description:
      "Building high-performance, visually stunning web and mobile experiences.",
    siteName: "Prathmesh Parab Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prathmesh Parab Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathmesh Parab - Software Engineer",
    description: "Building high-performance web and mobile experiences.",
    images: ["/og-image.png"],
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
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Inline script runs before React hydration to apply saved theme without flash
const themeScript = `
(function() {
  try {
    var mode = localStorage.getItem('theme-mode') || 'dark';
    var color = localStorage.getItem('theme-color') || 'indigo';
    var resolved = mode === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;
    document.documentElement.classList.add(resolved);
    var colorVars = {
      indigo:  ['239 84% 67%', '#6366f1', '#8b5cf6'],
      blue:    ['217 91% 60%', '#3b82f6', '#60a5fa'],
      emerald: ['160 84% 39%', '#10b981', '#34d399'],
      rose:    ['350 89% 60%', '#f43f5e', '#fb7185'],
      orange:  ['24 95% 53%',  '#f97316', '#fb923c'],
      purple:  ['271 91% 65%', '#a855f7', '#c084fc'],
    };
    var cv = colorVars[color] || colorVars.indigo;
    document.documentElement.style.setProperty('--primary', cv[0]);
    document.documentElement.style.setProperty('--ring', cv[0]);
    document.documentElement.style.setProperty('--gradient-start', cv[1]);
    document.documentElement.style.setProperty('--gradient-end', cv[2]);
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before paint — prevents FOUC without triggering React's script warning */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
