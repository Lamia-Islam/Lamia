"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  FileText,
  ExternalLink,
  MapPin,
  Send,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
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

export function ContactSection() {
  const { profile } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactLinks = [
    {
      label: "Google Scholar",
      sublabel: "Full citations and bibliometrics",
      url: profile.socialLinks.scholar,
      icon: GoogleScholarIcon,
    },
    {
      label: "GitHub",
      sublabel: "@Lamia-Islam",
      url: profile.socialLinks.github,
      icon: GitHubIcon,
    },
    {
      label: "LinkedIn",
      sublabel: "Lamia Islam",
      url: profile.socialLinks.linkedin,
      icon: LinkedInIcon,
    },
    {
      label: "ResearchGate",
      sublabel: "Lamia-Islam-13",
      url: profile.socialLinks.researchgate,
      icon: ResearchGateIcon,
    },
    {
      label: "ORCID",
      sublabel: "0009-0006-2866-5022",
      url: profile.socialLinks.orcid,
      icon: OrcidIcon,
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Get in Touch
          </h2>
          <div className="w-12 h-0.5 bg-neutral-900 dark:bg-neutral-100 mx-auto" />
          <p className="text-base sm:text-lg text-foreground font-serif max-w-xl mx-auto leading-relaxed">
            {profile.contactNote}
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>Based in {profile.location} &bull; Remote collaborator worldwide</span>
          </div>
        </div>

        {/* Primary Email Card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-neutral-50 dark:bg-neutral-900/50 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
              Direct Inquiries
            </span>
            <div className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              <a
                href={`mailto:${profile.email}`}
                className="academic-link text-lg sm:text-2xl"
              >
                {profile.email}
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Email is the fastest way to get in touch regarding PhD opportunities and collaborations.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyEmail}
              className="border-border text-xs"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Copy Email
                </>
              )}
            </Button>

            <a
              href={`mailto:${profile.email}`}
              className={cn(
                buttonVariants({ size: "sm" }),
                "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 inline-flex items-center cursor-pointer"
              )}
            >
              <Send className="h-3.5 w-3.5 mr-1" />
              Compose
            </a>
          </div>
        </div>

        {/* Academic Profiles & Social Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {contactLinks.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-border bg-card hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg border border-border flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-foreground group-hover:border-neutral-400 dark:group-hover:border-neutral-600 transition-colors">
                    <IconComp className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-serif font-bold text-foreground">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-muted-foreground truncate max-w-[150px]">
                      {item.sublabel}
                    </div>
                  </div>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </a>
            );
          })}

          {/* Download CV Card */}
          <a
            href={profile.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-border bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-95 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg border border-neutral-700 dark:border-neutral-300 flex items-center justify-center bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-serif font-bold">
                  Curriculum Vitae
                </div>
                <div className="text-[11px] opacity-80">
                  Download PDF
                </div>
              </div>
            </div>
            <ExternalLink className="h-3.5 w-3.5 opacity-80" />
          </a>
        </div>

      </div>
    </section>
  );
}
