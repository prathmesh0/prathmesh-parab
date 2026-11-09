import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { COLOR_VARS } from '@/lib/theme-config';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://prathmesh-parab-portfolio.vercel.app'),
  title: {
    default: 'Prathmesh Parab - Software Engineer & Full Stack Developer',
    template: '%s | Prathmesh Parab',
  },
  description:
    'Software Engineer & Full Stack Developer specializing in Next.js, React, Node.js, TypeScript, and Flutter. Crafting scalable, high-performance web and mobile applications end-to-end.',
  keywords: [
    'Prathmesh Parab',
    'Software Developer',
    'Software Engineer',
    'Full Stack Developer',
    'Next.js Developer',
    'React Developer',
    'Node.js Developer',
    'TypeScript',
    'Flutter Developer',
    'Web Developer',
    'Mobile Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Prathmesh Parab', url: 'https://prathmesh-parab-portfolio.vercel.app' }],
  creator: 'Prathmesh Parab',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://prathmesh-parab-portfolio.vercel.app',
    title: 'Prathmesh Parab - Software Engineer & Full Stack Developer',
    description:
      'Software Developer building scalable, high-performance web and mobile applications with Next.js, React, Node.js, and Flutter.',
    siteName: 'Prathmesh Parab Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Prathmesh Parab - Software Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prathmesh Parab - Software Engineer & Full Stack Developer',
    description:
      'Software Developer building scalable web and mobile applications with Next.js, React, Node.js, and Flutter.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
  ],
  width: 'device-width',
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
    var colorVars = ${JSON.stringify(COLOR_VARS)};
    var cv = colorVars[color] || colorVars.indigo;
    var st = document.documentElement.style;
    st.setProperty('--primary', cv.primary);
    st.setProperty('--ring', cv.ring);
    st.setProperty('--gradient-start', cv.gradient[0]);
    st.setProperty('--gradient-end', cv.gradient[0]);
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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before paint — prevents FOUC without triggering React's script warning */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className="min-h-screen antialiased overflow-x-clip"
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
