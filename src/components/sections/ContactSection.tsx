import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import {
  GitHubIcon,
  GoogleScholarIcon,
  LinkedInIcon,
  MailIcon,
  OrcidIcon,
} from "@/components/ui/academic-icons";

export function ContactSection() {
  const { profile } = PORTFOLIO_DATA;
  const { socialLinks } = profile;

  const icons = [
    { label: "Email", href: socialLinks.email, Icon: MailIcon, external: false },
    { label: "Google Scholar", href: socialLinks.scholar, Icon: GoogleScholarIcon, external: true },
    { label: "ORCID", href: socialLinks.orcid, Icon: OrcidIcon, external: true },
    { label: "LinkedIn", href: socialLinks.linkedin, Icon: LinkedInIcon, external: true },
    { label: "GitHub", href: socialLinks.github, Icon: GitHubIcon, external: true },
  ];

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <h2 className="label" style={{ marginBottom: "20px" }}>
          Contact
        </h2>
        <p>{profile.contactNote}</p>
        <a className="mail" href={socialLinks.email}>
          {profile.email}
        </a>
        <ul className="social-icons">
          {icons.map(({ label, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                title={label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <Icon className="social-icon" />
              </a>
            </li>
          ))}
        </ul>
        <a
          className="btn contact-cv"
          href={profile.cvPath}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download CV
        </a>
      </div>
    </section>
  );
}
