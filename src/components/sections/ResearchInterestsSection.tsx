import React from "react";
import { ShieldCheck, Activity, Bot, Microscope, HeartHandshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

const icons = [ShieldCheck, Activity, Bot, Microscope, HeartHandshake];

export function ResearchInterestsSection() {
  const { researchInterests } = PORTFOLIO_DATA;

  return (
    <section id="research" className="py-16 sm:py-20 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-10 text-center sm:text-left">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Research Interests
          </h2>
          <div className="w-12 h-0.5 bg-neutral-900 dark:bg-neutral-100 mt-2 mx-auto sm:mx-0" />
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
            My research spans reliable machine learning under domain shift, affective biosensing, and autonomous intervention control in robotics.
          </p>
        </div>

        {/* Grid of 5 Research Interest Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchInterests.map((interest, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <Card
                key={idx}
                className="border-border bg-card/60 hover:bg-card hover:border-neutral-400 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-foreground mb-3">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <CardTitle className="font-serif text-lg font-bold text-foreground leading-snug">
                    {interest.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {interest.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {interest.tags.map((tag, tIdx) => (
                      <Badge
                        key={tIdx}
                        variant="secondary"
                        className="text-[11px] font-normal bg-neutral-100 dark:bg-neutral-800/80 text-foreground border border-border/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
