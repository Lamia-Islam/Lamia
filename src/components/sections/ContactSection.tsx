import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function ContactSection() {
  const { profile } = PORTFOLIO_DATA;

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <h2 className="label" style={{ marginBottom: "20px" }}>
          Contact
        </h2>
        <p>{profile.contactNote}</p>
        <a className="mail" href={profile.socialLinks.email}>
          {profile.email}
        </a>
      </div>
    </section>
  );
}
