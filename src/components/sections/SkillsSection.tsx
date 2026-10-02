import React from "react";
import { Terminal } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function SkillsSection() {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="py-16 sm:py-20 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            <Terminal className="h-3.5 w-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Skills &amp; Methodologies
          </h2>
          <div className="w-12 h-0.5 bg-neutral-900 dark:bg-neutral-100 mt-2 mx-auto sm:mx-0" />
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
            Grouped by domain expertise across machine learning, safety-critical evaluation, biomedical signal processing, and robotics.
          </p>
        </div>

        {/* Grouped Chips - One row/block per group */}
        <div className="space-y-4">
          {skills.map((group, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl border border-border/70 bg-card/60 hover:bg-card hover:border-neutral-400 dark:hover:border-neutral-700 transition-all flex flex-col md:flex-row md:items-center gap-3 sm:gap-6"
            >
              {/* Category Name Label */}
              <div className="md:w-64 shrink-0">
                <span className="font-serif font-bold text-sm sm:text-base text-foreground block">
                  {group.category}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {group.skills.length} competencies
                </span>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-2 flex-1">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-foreground border border-border/60 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
