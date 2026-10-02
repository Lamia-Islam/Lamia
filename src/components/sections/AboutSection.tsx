import React from "react";
import { Quote } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function AboutSection() {
  const { about } = PORTFOLIO_DATA;

  return (
    <section id="about" className="py-16 sm:py-20 border-b border-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            About Me
          </h2>
          <div className="w-12 h-0.5 bg-neutral-900 dark:bg-neutral-100 mt-2" />
        </div>

        {/* Featured Opening Question Quote */}
        <div className="relative p-6 sm:p-8 rounded-2xl border border-border bg-neutral-50/70 dark:bg-neutral-900/40 mb-8">
          <Quote className="h-8 w-8 text-muted-foreground/30 absolute top-4 right-4" />
          <p className="font-serif text-lg sm:text-xl md:text-2xl font-semibold text-foreground leading-relaxed italic">
            &ldquo;{about.openingQuestion}&rdquo;
          </p>
        </div>

        {/* Narrative Paragraphs */}
        <div className="space-y-5 text-base sm:text-lg leading-relaxed text-foreground/90">
          <p>
            {about.paragraphs[1]}
          </p>
          <p>
            {about.paragraphs[2]}
          </p>
          <p className="font-medium text-foreground">
            {about.paragraphs[3]}
          </p>
        </div>

      </div>
    </section>
  );
}
