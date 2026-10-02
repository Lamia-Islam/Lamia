import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles, Code, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { cn } from "cn";

export function FeaturedProjectsSection() {
  const { featuredProjects, smallerProjects } = PORTFOLIO_DATA;

  return (
    <section id="projects" className="py-16 sm:py-20 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Core Research</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Featured Projects
          </h2>
          <div className="w-12 h-0.5 bg-neutral-900 dark:bg-neutral-100 mt-2 mx-auto sm:mx-0" />
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
            Selected investigations in competence-gated human state monitoring, multi-agent robotics, and medical benchmark reliability. Click any project card to view full technical details, methodology, and figures.
          </p>
        </div>

        {/* 2x2 Grid of Featured Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, idx) => (
            <Card
              key={project.slug}
              className="border-border/90 bg-card hover:border-neutral-400 dark:hover:border-neutral-600 transition-all flex flex-col justify-between shadow-2xs hover:shadow-md relative overflow-hidden group"
            >
              {/* Highlight bar for Project 1 (Thesis) */}
              {idx === 0 && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-900 dark:bg-neutral-100" />
              )}

              <CardHeader className="space-y-2 pb-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-mono">{project.year}</span>
                  {idx === 0 && (
                    <Badge variant="outline" className="text-[10px] font-semibold tracking-wide border-neutral-400 dark:border-neutral-600">
                      Undergraduate Thesis
                    </Badge>
                  )}
                </div>

                <CardTitle className="font-serif text-xl sm:text-2xl font-bold text-foreground leading-snug group-hover:text-[#28598A] dark:group-hover:text-[#6ba7e6] transition-colors">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </CardTitle>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.summary}
                </p>
              </CardHeader>

              <CardContent className="space-y-4 pt-1">
                {/* Headline Result Highlight Banner */}
                <div className="p-3 rounded-lg bg-neutral-100/80 dark:bg-neutral-900/80 border border-border/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Key Result
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                    {project.keyResults[0]}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techTags.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 text-[11px] rounded bg-neutral-100 dark:bg-neutral-800 text-foreground/80 border border-border/40 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Quick Paper / Preprint Links */}
                {project.links.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                    {project.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="academic-link inline-flex items-center gap-1"
                      >
                        {link.type === "code" ? (
                          <Code className="h-3 w-3" />
                        ) : (
                          <FileText className="h-3 w-3" />
                        )}
                        <span>{link.label}</span>
                        <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                      </a>
                    ))}
                  </div>
                )}
              </CardContent>

              <CardFooter className="pt-2 border-t border-border/40 flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "px-0 hover:bg-transparent text-sm font-medium text-[#28598A] dark:text-[#6ba7e6] hover:opacity-80 inline-flex items-center gap-1.5"
                  )}
                >
                  <span>View Project Details</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-xs text-muted-foreground font-mono">
                  0{idx + 1}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Compact Smaller Projects Section */}
        <div className="mt-14 pt-12 border-t border-border/80">
          <div className="mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              More Projects &amp; Prototypes
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Supplementary hardware-in-the-loop systems, embedded firmware, and peer-reviewed biomedical applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {smallerProjects.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-border bg-neutral-50/50 dark:bg-neutral-900/30 flex flex-col justify-between space-y-3"
              >
                <div>
                  <h4 className="font-serif font-semibold text-foreground text-sm leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="space-y-2 pt-1 border-t border-border/50">
                  {p.publication && (
                    <div className="text-[11px] font-medium text-foreground">
                      {p.doi ? (
                        <a
                          href={p.doi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="academic-link inline-flex items-center gap-1"
                        >
                          <span>{p.publication}</span>
                          <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                        </a>
                      ) : (
                        <span>{p.publication}</span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {p.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-1.5 py-0.5 text-[10px] rounded bg-neutral-200/60 dark:bg-neutral-800 text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
