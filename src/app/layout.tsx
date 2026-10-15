import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const instrumentSans = Instrument_Sans({
  variable: "--sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Lamia Islam",
  description:
    "Lamia Islam, ICE graduate from Pabna University of Science and Technology. AI safety for systems that act in the real world. Applying for PhD positions for 2027.",
  openGraph: {
    title: "Lamia Islam",
    description:
      "AI safety for systems that act in the real world: how a model can tell when it should not be trusted, and what a robot or vehicle should do when that happens.",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23111'/%3E%3Ctext x='32' y='44' font-family='Georgia,serif' font-size='32' font-weight='700' fill='%23fff' text-anchor='middle'%3ELI%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${instrumentSans.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
