import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function AboutSection() {
  const { about } = PORTFOLIO_DATA;

  return (
    <section className="block" id="about">
      <div className="wrap grid">
        <h2 className="label">About</h2>
        <div className="prose">
          <p className="lede">{about.lede}</p>
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
