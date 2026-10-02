import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function StatsSection() {
  const { stats } = PORTFOLIO_DATA;

  return (
    <section className="py-10 sm:py-12 bg-neutral-50/70 dark:bg-neutral-900/40 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center md:items-start text-center md:text-left p-4 rounded-xl border border-border/50 bg-background/80 shadow-2xs hover:border-border transition-colors"
            >
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-foreground mt-2 leading-snug">
                {stat.label}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                {stat.highlight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
