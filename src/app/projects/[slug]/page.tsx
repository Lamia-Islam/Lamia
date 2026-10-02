import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  UserCheck,
  FileText,
  Code,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Cpu,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { cn } from "cn";
import {
  NDPAIDiagram,
  MultiRobotDiagram,
  WoundBenchmarkDiagram,
  RoboticArmDiagram,
} from "@/components/projects/ProjectDiagrams";

export function generateStaticParams() {
  return PORTFOLIO_DATA.featuredProjects.map((p) => ({
    slug: p.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PORTFOLIO_DATA.featuredProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const renderDiagram = () => {
    switch (project.slug) {
      case "ndpai-driver-state-monitoring":
        return <NDPAIDiagram />;
      case "multi-robot-search-and-rescue":
        return <MultiRobotDiagram />;
      case "synthetic-wound-segmentation-benchmarks":
        return <WoundBenchmarkDiagram />;
      case "6dof-robotic-arm-simulation":
        return <RoboticArmDiagram />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Navigation Breadcrumb / Back Link */}
        <div>
          <Link
            href="/#projects"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "px-0 hover:bg-transparent text-sm font-medium text-[#28598A] dark:text-[#6ba7e6] hover:opacity-80 inline-flex items-center gap-1.5"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to all projects</span>
          </Link>
        </div>

        {/* Project Header */}
        <header className="space-y-4 border-b border-border/80 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              {project.year}
            </Badge>
            {project.thesisDetails && (
              <Badge variant="secondary" className="font-sans text-xs">
                Undergraduate Thesis
              </Badge>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-foreground font-serif leading-relaxed">
            {project.summary}
          </p>

          {/* Academic Metadata (Supervisor, Defense Date, etc.) */}
          {project.thesisDetails && (
            <div className="p-4 rounded-xl border border-border bg-neutral-50 dark:bg-neutral-900/40 text-xs sm:text-sm space-y-1">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <UserCheck className="h-4 w-4 text-neutral-500" />
                <span>Supervisor: {project.thesisDetails.supervisor}</span>
              </div>
              <p className="text-muted-foreground">
                Formal Thesis Title: &ldquo;{project.thesisDetails.title}&rdquo; &bull; Defended {project.thesisDetails.defended}
              </p>
            </div>
          )}

          {/* External Action Links (Code / Paper / Preprint) */}
          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {project.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: "sm", variant: "outline" }),
                    "border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 inline-flex items-center cursor-pointer"
                  )}
                >
                  {link.type === "code" ? (
                    <Code className="h-3.5 w-3.5 mr-1.5" />
                  ) : (
                    <FileText className="h-3.5 w-3.5 mr-1.5" />
                  )}
                  <span>{link.label}</span>
                  <ExternalLink className="h-3 w-3 ml-1.5 opacity-60" />
                </a>
              ))}
            </div>
          )}
        </header>

        {/* Technical Architecture Figure Container */}
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
            System Architecture &amp; Methodology
          </h2>
          <div className="pt-2">
            {renderDiagram()}
          </div>
          <p className="text-xs text-muted-foreground italic text-center sm:text-left">
            Figure: {project.figureCaption}
          </p>
        </section>

        {/* The Problem Statement */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-neutral-500" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              The Problem
            </h2>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card text-foreground/90 leading-relaxed text-sm sm:text-base">
            {project.problem}
          </div>
        </section>

        {/* What I Built / Did */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-neutral-500" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              What I Built &amp; Implemented
            </h2>
          </div>
          <ul className="space-y-3">
            {project.whatBuilt.map((item, idx) => (
              <li
                key={idx}
                className="p-4 rounded-xl border border-border bg-card/60 flex items-start gap-3 text-sm sm:text-base leading-relaxed text-foreground/90"
              >
                <span className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border flex items-center justify-center font-mono text-xs font-bold text-muted-foreground shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Key Results & Statistical Validation */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              Key Results &amp; Empirical Findings
            </h2>
          </div>
          <div className="space-y-3">
            {project.keyResults.map((result, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-border/80 bg-neutral-50/80 dark:bg-neutral-900/50 flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100 shrink-0 mt-2" />
                <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed">
                  {result}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Publication Information */}
        {project.papers && project.papers.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              Associated Publications
            </h2>
            <div className="space-y-3">
              {project.papers.map((paper, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-border bg-card space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[11px]">
                      {paper.status}
                    </Badge>
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-foreground leading-snug">
                    {paper.title}
                  </h3>
                  <p className="text-xs italic text-muted-foreground">
                    {paper.venue}
                  </p>
                  {paper.doiUrl && (
                    <a
                      href={paper.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="academic-link inline-flex items-center gap-1 text-xs pt-1"
                    >
                      <span>Read Publication / DOI</span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technologies Used */}
        <section className="space-y-3 border-t border-border pt-8">
          <h2 className="font-serif text-lg font-bold text-foreground">
            Technologies &amp; Frameworks
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techTags.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs rounded-md bg-neutral-100 dark:bg-neutral-800 text-foreground border border-border font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Bottom Back Button */}
        <div className="pt-6 border-t border-border flex items-center justify-between">
          <Link
            href="/#projects"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 inline-flex items-center cursor-pointer"
            )}
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            <span>All Featured Projects</span>
          </Link>

          <Link
            href="/#contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 inline-flex items-center cursor-pointer"
            )}
          >
            <span>Contact Lamia</span>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
