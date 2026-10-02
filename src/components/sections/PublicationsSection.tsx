"use client";

import React, { useState } from "react";
import { BookOpen, ExternalLink } from "lucide-react";
import { GoogleScholarIcon } from "@/components/ui/academic-icons";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PORTFOLIO_DATA, PublicationItem } from "@/data/portfolio-data";
import { cn } from "cn";

/**
 * Highlights "Lamia Islam" and "Islam, L." in bold within an author string.
 */
function FormattedAuthors({ authors }: { authors: string }) {
  // Regex to match "Lamia Islam" or "Islam, L." with or without commas
  const parts = authors.split(/(Lamia Islam|Islam, L\.)/g);

  return (
    <span className="text-muted-foreground text-sm leading-relaxed">
      {parts.map((part, index) => {
        if (part === "Lamia Islam" || part === "Islam, L.") {
          return (
            <strong key={index} className="font-bold text-foreground underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2">
              {part}
            </strong>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}

export function PublicationsSection() {
  const { publications, profile } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Journal",
    "Conference",
    "Submitted",
    "Preprint",
    "Presentation",
  ];

  const filteredPublications =
    selectedCategory === "All"
      ? publications
      : publications.filter((p) => p.category === selectedCategory);

  // Grouped items for default view
  const journals = publications.filter((p) => p.category === "Journal");
  const conferences = publications.filter((p) => p.category === "Conference");
  const submitted = publications.filter((p) => p.category === "Submitted");
  const preprints = publications.filter((p) => p.category === "Preprint");
  const presentations = publications.filter((p) => p.category === "Presentation");

  const renderPubItem = (pub: PublicationItem) => (
    <li
      key={pub.id}
      className="p-4 sm:p-5 rounded-xl border border-border/80 bg-card/60 hover:bg-card hover:border-neutral-400 dark:hover:border-neutral-700 transition-all space-y-2 list-none"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-serif font-bold text-base sm:text-lg text-foreground leading-snug">
          {pub.title}
        </h4>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-muted-foreground shrink-0 border border-border/60">
          {pub.dateOrYear}
        </span>
      </div>

      <div>
        <FormattedAuthors authors={pub.authors} />
      </div>

      <div className="text-xs italic text-foreground/80 font-medium">
        {pub.venue}
      </div>

      <div className="pt-1 flex flex-wrap items-center gap-3">
        {pub.doi && (
          <a
            href={pub.url || `https://doi.org/${pub.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="academic-link inline-flex items-center gap-1 text-xs"
          >
            <span>DOI: {pub.doi}</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
        )}

        {pub.url && !pub.doi && (
          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="academic-link inline-flex items-center gap-1 text-xs"
          >
            <span>Preprint / Article Link</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
        )}

        {pub.note && (
          <Badge variant="outline" className="text-[10px] text-muted-foreground">
            {pub.note}
          </Badge>
        )}
      </div>
    </li>
  );

  return (
    <section id="publications" className="py-16 sm:py-20 border-b border-border/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Scholarly Output</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Publications
          </h2>
          <div className="w-12 h-0.5 bg-neutral-900 dark:bg-neutral-100 mt-2 mx-auto sm:mx-0" />
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
            Authorship highlighted in bold (<strong className="font-bold text-foreground">Lamia Islam</strong>). Includes peer-reviewed conference proceedings, journal submissions, preprints, and symposium presentations.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "bg-neutral-100 dark:bg-neutral-800 text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat === "Journal" ? "Journal Under Review" : cat}
              {cat === "All" && ` (${publications.length})`}
            </button>
          ))}
        </div>

        {/* Publications Content */}
        {selectedCategory === "All" ? (
          <div className="space-y-10">
            {/* Journal Manuscripts Under Review */}
            <div className="space-y-4">
              <h3 className="font-serif text-base font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                Journal Manuscripts Under Review ({journals.length})
              </h3>
              <ul className="space-y-3">
                {journals.map((pub) => renderPubItem(pub))}
              </ul>
            </div>

            {/* Conference Papers */}
            <div className="space-y-4">
              <h3 className="font-serif text-base font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                Conference Papers ({conferences.length})
              </h3>
              <ul className="space-y-3">
                {conferences.map((pub) => renderPubItem(pub))}
              </ul>
            </div>

            {/* Submitted */}
            {submitted.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-serif text-base font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                  Submitted ({submitted.length})
                </h3>
                <ul className="space-y-3">
                  {submitted.map((pub) => renderPubItem(pub))}
                </ul>
              </div>
            )}

            {/* Preprints */}
            <div className="space-y-4">
              <h3 className="font-serif text-base font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                Preprints ({preprints.length})
              </h3>
              <ul className="space-y-3">
                {preprints.map((pub) => renderPubItem(pub))}
              </ul>
            </div>

            {/* Presentations */}
            <div className="space-y-4">
              <h3 className="font-serif text-base font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                Presentations ({presentations.length})
              </h3>
              <ul className="space-y-3">
                {presentations.map((pub) => renderPubItem(pub))}
              </ul>
            </div>
          </div>
        ) : (
          <ul className="space-y-3">
            {filteredPublications.map((pub) => renderPubItem(pub))}
          </ul>
        )}

        {/* Scholar Outbound Link under the list */}
        <div className="mt-12 p-6 rounded-2xl border border-border bg-neutral-50/70 dark:bg-neutral-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif font-bold text-foreground text-base">
              Google Scholar Profile
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Track citation counts, bibtex entries, co-authors, and full publication index.
            </p>
          </div>
          <a
            href={profile.socialLinks.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 inline-flex items-center gap-2 cursor-pointer"
            )}
          >
            <GoogleScholarIcon className="h-4 w-4" />
            <span>Full list on Google Scholar</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </a>
        </div>

      </div>
    </section>
  );
}
