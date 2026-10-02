"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FileText,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  GoogleScholarIcon,
  ResearchGateIcon,
  OrcidIcon,
} from "@/components/ui/academic-icons";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { cn } from "cn";

function GitHubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export function HeroSection() {
  const { profile } = PORTFOLIO_DATA;
  const [imageError, setImageError] = useState(false);

  return (
    <section id="hero" className="py-12 sm:py-16 md:py-20 lg:py-24 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-10 md:gap-14">
          
          {/* Left Column: Info, Headline, Actions */}
          <div className="flex-1 text-center md:text-left space-y-6">
            
            {/* Location & Status Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-muted-foreground border border-border">
              <MapPin className="h-3.5 w-3.5" />
              <span>{profile.location}</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
              <span className="text-foreground font-medium">Open to PhD &amp; Research Roles</span>
            </div>

            {/* Name */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              {profile.name}
            </h1>

            {/* Headline */}
            <p className="text-xl sm:text-2xl text-foreground font-serif font-medium leading-snug">
              {profile.headline}
            </p>

            {/* Sub-line */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {profile.subline}
            </p>

            {/* Three Main Action Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <a
                href={profile.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "default" }), "shadow-xs cursor-pointer")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Download CV (PDF)
              </a>

              <a
                href={profile.socialLinks.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer")}
              >
                <GoogleScholarIcon className="h-4 w-4 mr-2" />
                Google Scholar
                <ArrowUpRight className="h-3.5 w-3.5 ml-1 opacity-60" />
              </a>

              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer")}
              >
                <GitHubIcon className="h-4 w-4 mr-2" />
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5 ml-1 opacity-60" />
              </a>
            </div>

            {/* Row of small profile icons */}
            <div className="pt-2 flex items-center justify-center md:justify-start gap-2">
              <span className="text-xs text-muted-foreground mr-1">Profiles:</span>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      href={profile.socialLinks.email}
                      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      aria-label="Email Lamia Islam"
                    />
                  }
                >
                  <Mail className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Email: {profile.email}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      href={profile.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      aria-label="LinkedIn Profile"
                    />
                  }
                >
                  <LinkedInIcon className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>LinkedIn</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      aria-label="GitHub Profile"
                    />
                  }
                >
                  <GitHubIcon className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>GitHub</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      href={profile.socialLinks.scholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      aria-label="Google Scholar Citations"
                    />
                  }
                >
                  <GoogleScholarIcon className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Google Scholar</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      href={profile.socialLinks.researchgate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      aria-label="ResearchGate Profile"
                    />
                  }
                >
                  <ResearchGateIcon className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>ResearchGate</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      href={profile.socialLinks.orcid}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      aria-label="ORCID Profile"
                    />
                  }
                >
                  <OrcidIcon className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>ORCID: 0009-0006-2866-5022</TooltipContent>
              </Tooltip>
            </div>

          </div>

          {/* Right Column: Professional Photo Frame (desktop right, mobile top) */}
          <div className="w-48 sm:w-56 md:w-64 lg:w-72 shrink-0">
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden border border-border bg-neutral-100 dark:bg-neutral-900 shadow-md">
              {!imageError ? (
                <Image
                  src="/images/profile.jpg"
                  alt="Lamia Islam"
                  fill
                  className="object-cover"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : null}

              {/* Graceful academic avatar fallback if photo is not yet provided */}
              {imageError && (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-linear-to-b from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-950">
                  <div className="w-20 h-20 rounded-full border border-border flex items-center justify-center bg-background text-foreground shadow-xs mb-3">
                    <span className="font-serif text-2xl font-bold">LI</span>
                  </div>
                  <h3 className="font-serif font-semibold text-foreground text-sm">
                    Lamia Islam
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    ML &amp; Robotics Researcher
                  </p>
                  <div className="mt-4 px-2 py-1 rounded text-[10px] text-muted-foreground bg-neutral-200/60 dark:bg-neutral-800/80 border border-border/60">
                    PUST &bull; FlyRank AI
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
