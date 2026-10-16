import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function HeroSection() {
  const { profile } = PORTFOLIO_DATA;

  return (
    <header className="hero" id="top">
      <div className="wrap">
        <h1>Lamia Islam</h1>
      </div>
      <div className="wrap">
        <div className="band" role="presentation"></div>
        <div className="meta">
          <div>
            <div className="meta-id">
              <strong>{profile.headline}</strong>
              <br />
              {profile.subline}
            </div>
            <ul className="links">
              <li>
                <a href={profile.socialLinks.email}>Email</a>
              </li>
              <li>
                <a
                  href={profile.socialLinks.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Scholar
                </a>
              </li>
              <li>
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={profile.socialLinks.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ORCID
                </a>
              </li>
            </ul>
          </div>
          <a
            className="btn"
            href={profile.cvPath}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
}
