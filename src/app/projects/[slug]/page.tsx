import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  UserCheck,
  CheckCircle,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import {
  ThesisGateDiagram,
  MultiRobotBeliefDiagram,
  WoundBenchmarkDiagram,
} from "@/components/projects/ProjectDiagrams";

export function generateStaticParams() {
  return PORTFOLIO_DATA.featuredProjects.map((p) => ({
    slug: p.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PORTFOLIO_DATA.featuredProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const renderDiagram = () => {
    switch (project.slug) {
      case "ndpai-driver-state-monitoring":
        return <ThesisGateDiagram />;
      case "multi-robot-search-and-rescue":
        return <MultiRobotBeliefDiagram />;
      case "synthetic-wound-segmentation-benchmarks":
        return <WoundBenchmarkDiagram />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />

      <main className="wrap" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
        {/* Navigation Breadcrumb / Back Link */}
        <div style={{ marginBottom: "28px" }}>
          <Link
            href="/#work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: 500,
              fontSize: "15px",
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to selected work</span>
          </Link>
        </div>

        {/* Project Header */}
        <header style={{ marginBottom: "36px", borderBottom: "1px solid var(--rule)", paddingBottom: "28px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "12px" }}>
            {project.num && <span className="num">{project.num}</span>}
            {project.sub && <span className="sub" style={{ margin: 0 }}>{project.sub}</span>}
          </div>

          <h1
            style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              margin: '0 0 16px',
            }}
          >
            {project.title}
          </h1>

          {project.body && (
            <p className="body" style={{ fontSize: '18px', maxWidth: '68ch', color: 'var(--ink-2)' }}>
              {project.body}
            </p>
          )}

          {project.thesisDetails && (
            <div
              style={{
                marginTop: "16px",
                padding: "16px",
                border: "1px solid var(--rule)",
                background: "rgba(128, 128, 128, 0.05)",
                fontSize: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600 }}>
                <UserCheck className="h-4 w-4" />
                <span>Supervisor: {project.thesisDetails.supervisor}</span>
              </div>
              <p style={{ margin: "6px 0 0", color: "var(--ink-3)" }}>
                Formal Thesis Title: &ldquo;{project.thesisDetails.title}&rdquo; &bull; Defended{" "}
                {project.thesisDetails.defended}
              </p>
            </div>
          )}

          {/* External Action Links */}
          {project.links && project.links.length > 0 && (
            <ul className="plinks" style={{ marginTop: "18px" }}>
              {project.links.map((link) => (
                <li key={link.label}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </header>

        {/* Architectural / Conceptual Diagram */}
        <section style={{ marginBottom: "44px" }}>
          <figure className="fig" style={{ maxWidth: "600px" }}>
            {renderDiagram()}
            <figcaption>{project.figureCaption}</figcaption>
          </figure>
        </section>

        {/* Results */}
        {project.result && (
          <section style={{ marginBottom: "36px" }}>
            <p className="result" style={{ fontSize: "16px", maxWidth: "68ch" }}>
              <b>Result:</b> {project.result.replace(/^Result:\s*/i, "")}
            </p>
          </section>
        )}

        {/* What Built */}
        {project.whatBuilt && project.whatBuilt.length > 0 && (
          <section style={{ marginBottom: "36px" }}>
            <h2 className="label" style={{ marginBottom: "14px" }}>
              What I Built &amp; Implemented
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {project.whatBuilt.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: "12px 0",
                    borderBottom: "1px solid var(--rule)",
                    color: "var(--ink-2)",
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontWeight: 600, color: "var(--ink-3)" }}>0{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Key Results */}
        {project.keyResults && project.keyResults.length > 0 && (
          <section style={{ marginBottom: "36px" }}>
            <h2 className="label" style={{ marginBottom: "14px" }}>
              Key Results
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {project.keyResults.map((result, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: "12px 0",
                    borderBottom: "1px solid var(--rule)",
                    color: "var(--ink)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Technologies Used */}
        {project.techTags && project.techTags.length > 0 && (
          <section style={{ borderTop: "1px solid var(--rule)", paddingTop: "24px" }}>
            <h2 className="label" style={{ marginBottom: "12px" }}>
              Technologies &amp; Frameworks
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {project.techTags.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: "4px 10px",
                    fontSize: "13px",
                    background: "rgba(128, 128, 128, 0.08)",
                    border: "1px solid var(--rule)",
                    color: "var(--ink-2)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Back Button */}
        <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid var(--ink)" }}>
          <Link href="/#work" style={{ fontWeight: 500, fontSize: "15px" }}>
            &larr; Back to selected work
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
