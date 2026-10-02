import React from "react";
import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto bg-neutral-50 dark:bg-neutral-950/50 py-10 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-serif font-semibold text-foreground text-base">
              Lamia Islam
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Machine Learning &amp; Robotics Researcher &bull; B.Sc. ICE, PUST &bull; Bangladesh
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <p>&copy; 2026 Lamia Islam. All rights reserved.</p>
            <a
              href="#hero"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
