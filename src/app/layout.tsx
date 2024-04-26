import type { Metadata } from "next";
import { Overpass, Old_Standard_TT, Overpass_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
  title: "Bojin Li | 李帛锦",
  description: "Bojin Li | 李帛锦",
  keywords:
    "Bojin Li, 李帛锦, Brian, Bojin, xxxbrian, bojinli, UNSW, lipochin, 3xbrian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // enableSystem
          disableTransitionOnChange
        >
          <main className="font-sans">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
