import React from "react";
import { Users, Award, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function ServiceHonorsSection() {
  const { academicService, honorsAndCertifications } = PORTFOLIO_DATA;

  return (
    <section className="py-16 sm:py-20 border-b border-border/60 bg-neutral-50/40 dark:bg-neutral-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14">
          
          {/* Academic Service & Leadership */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-foreground" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Academic Service &amp; Leadership
                </h3>
              </div>
              <div className="w-10 h-0.5 bg-neutral-900 dark:bg-neutral-100" />
            </div>

            <div className="space-y-3">
              {academicService.map((service, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-border bg-card/70 hover:bg-card transition-colors flex items-start gap-3"
                >
                  <CheckCircle2 className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-serif font-semibold text-sm sm:text-base text-foreground leading-snug">
                      {service.role} &bull; <span className="text-muted-foreground font-sans font-normal text-xs">{service.organization}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Honors, Training & Certifications */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-foreground" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Honors, Training &amp; Certifications
                </h3>
              </div>
              <div className="w-10 h-0.5 bg-neutral-900 dark:bg-neutral-100" />
            </div>

            <div className="space-y-3">
              {honorsAndCertifications.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-border bg-card/70 hover:bg-card transition-colors flex items-start gap-3"
                >
                  <Award className="h-4 w-4 text-neutral-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-serif font-semibold text-sm sm:text-base text-foreground leading-snug">
                      {item.title}
                    </div>
                    <div className="text-xs font-medium text-foreground/80">
                      {item.issuer}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
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
