"use client";

import React, { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`} id="nav" aria-label="Main">
      <div className="wrap">
        <a className="mono" href="#top" aria-label="Lamia Islam, back to top">
          LI
        </a>
        <div className="nav-right">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#publications">Publications</a></li>
            <li><a href="/Lamia_Islam_CV.pdf" target="_blank" rel="noopener noreferrer">CV</a></li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
