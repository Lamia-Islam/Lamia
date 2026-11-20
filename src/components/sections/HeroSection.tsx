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
