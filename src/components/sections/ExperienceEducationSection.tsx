import React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function ExperienceEducationSection() {
  const { experience, education } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-16 sm:py-20 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-12 text-center sm:text-left">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Experience &amp; Education
          </h2>
          <div className="w-12 h-0.5 bg-neutral-900 dark:bg-neutral-100 mt-2 mx-auto sm:mx-0" />
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
            Academic training and industry research engineering roles, ordered newest first.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14">
          
          {/* Experience Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border">
              <Briefcase className="h-5 w-5 text-foreground" />
              <h3 className="font-serif text-xl font-bold text-foreground">
                Research &amp; Industry Experience
              </h3>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-background bg-neutral-900 dark:bg-neutral-100 shadow-xs" />

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h4 className="font-serif font-bold text-base sm:text-lg text-foreground leading-snug">
                        {exp.title}
                      </h4>
                      <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {exp.period}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-medium text-foreground/80 flex items-center gap-2 flex-wrap">
                      <span>{exp.organization}</span>
                      <span className="text-muted-foreground">&bull;</span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </span>
                    </div>

                    {exp.supervisorOrMentor && (
                      <p className="text-xs italic text-muted-foreground font-serif">
                        {exp.supervisorOrMentor}
                      </p>
                    )}

                    <ul className="list-disc list-outside pl-4 space-y-1 text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-border">
              <GraduationCap className="h-5 w-5 text-foreground" />
              <h3 className="font-serif text-xl font-bold text-foreground">
                Education
              </h3>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
              {education.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-background bg-neutral-900 dark:bg-neutral-100 shadow-xs" />

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h4 className="font-serif font-bold text-base sm:text-lg text-foreground leading-snug">
                        {edu.degree}
                      </h4>
                      <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {edu.period}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm font-medium text-foreground/80">
                      {edu.institution}
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-foreground border border-border/60">
                      <Award className="h-3 w-3 text-neutral-500" />
                      <span>{edu.grade}</span>
                    </div>

                    {edu.details && (
                      <p className="text-xs text-muted-foreground">
                        {edu.details}
                      </p>
                    )}

                    {edu.thesis && (
                      <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-border/60 text-xs space-y-1">
                        <span className="font-serif font-semibold text-foreground block">
                          Undergraduate Thesis:
                        </span>
                        <p className="text-muted-foreground leading-relaxed italic">
                          {edu.thesis}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
