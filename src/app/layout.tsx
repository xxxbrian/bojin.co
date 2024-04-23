import type { Metadata } from "next";
import { Overpass, Old_Standard_TT, Overpass_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Head from "next/head";

// import { cn } from "@/lib/utils";

const sans = Overpass({
  subsets: ["latin"],
  variable: "--font-sans",
});
const serif = Old_Standard_TT({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});
const mono = Overpass_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Bojin Li",
  description: "New personal website of Bojin Li",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>Bojin Li | 李帛锦</title>
        <meta name="description" content="Bojin Li | 李帛锦" />
        <meta
          name="keywords"
          content="Bojin Li, 李帛锦, Brian, Bojin, xxxbrian, bojinli, UNSW, lipochin, 3xbrian"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <body className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
