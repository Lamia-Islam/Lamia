"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Research", href: "/#research" },
  { label: "Projects", href: "/#projects" },
  { label: "Publications", href: "/#publications" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/80 shadow-xs"
          : "bg-background/80 backdrop-blur-sm border-b border-border/40"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Name */}
        <Link
          href="/"
          className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground hover:opacity-85 transition-opacity"
        >
          Lamia Islam
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-1.5 rounded-md text-foreground/85 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* CV Button */}
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-foreground/85 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>CV</span>
            <ArrowUpRight className="h-3 w-3 opacity-60" />
          </a>

          <div className="pl-2 border-l border-border ml-2 flex items-center">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="h-9 w-9 rounded-md"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-base font-medium text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Download CV (PDF)
              </span>
              <ArrowUpRight className="h-4 w-4 opacity-60" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
