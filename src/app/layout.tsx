import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const sans = Space_Grotesk({
  variable: "--font-sans-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Newsreader({
  variable: "--font-serif-var",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-var",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE = "https://keymap.1619.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "KeyMap — The keyboard shortcut reference",
    template: "%s · KeyMap",
  },
  description:
    "A fast, verified reference for keyboard shortcuts across the tools you use every day. Windows and macOS, beginner to advanced.",
  applicationName: "KeyMap",
  keywords: [
    "keyboard shortcuts", "hotkeys", "cheat sheet", "Windows shortcuts",
    "macOS shortcuts", "VS Code", "Excel", "Chrome", "Figma", "productivity",
  ],
  authors: [{ name: "kumardeepak16", url: "https://github.com/kumardeepak16" }],
  creator: "kumardeepak16",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "KeyMap",
    title: "KeyMap — The keyboard shortcut reference",
    description:
      "Fast, verified keyboard shortcuts for the tools you use every day. Windows and macOS, beginner to advanced.",
    url: SITE,
  },
  twitter: {
    card: "summary_large_image",
    title: "KeyMap — The keyboard shortcut reference",
    description:
      "Fast, verified keyboard shortcuts for the tools you use every day. Windows and macOS.",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#14130f" },
  ],
};

// Set the theme before paint to avoid a flash.
const themeInit = `
(function(){
  try {
    var t = localStorage.getItem('keymap-theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
  } catch(e) { document.documentElement.setAttribute('data-theme','light'); }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "KeyMap",
              url: SITE,
              description:
                "Fast, verified keyboard shortcut reference for 60+ apps. Windows and macOS.",
              publisher: { "@type": "Person", name: "Kumar Deepak", url: "https://1619.in" },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Providers>
          <a href="#main" className="skip-link">Skip to content</a>
          <SiteHeader />
          <main id="main" className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
