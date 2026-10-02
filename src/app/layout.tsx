import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lamia Islam | Machine Learning & Robotics Researcher",
  description:
    "Portfolio of Lamia Islam. Machine learning researcher building reliable AI for human-state sensing and robotics. B.Sc. in ICE from PUST. ML Engineering Intern at FlyRank AI.",
  keywords: [
    "Lamia Islam",
    "Machine Learning Researcher",
    "Robotics",
    "Affective Computing",
    "Driver-State Monitoring",
    "ROS 2",
    "Out-of-Distribution Detection",
    "PUST",
    "FlyRank AI",
  ],
  authors: [{ name: "Lamia Islam" }],
  openGraph: {
    title: "Lamia Islam | Machine Learning & Robotics Researcher",
    description:
      "Machine learning researcher building reliable AI for human-state sensing and robotics.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-neutral-200 dark:selection:bg-neutral-800 flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delay={200}>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
