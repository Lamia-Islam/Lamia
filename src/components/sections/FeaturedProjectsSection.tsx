import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import {
  ThesisGateDiagram,
  MultiRobotBeliefDiagram,
  WoundBenchmarkDiagram,
} from "@/components/projects/ProjectDiagrams";

export function FeaturedProjectsSection() {
  const { featuredProjects } = PORTFOLIO_DATA;

  const renderDiagram = (slug: string) => {
    switch (slug) {
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
    <section className="block" id="work">
      <div className="wrap">
        <h2 className="label" style={{ marginBottom: "24px" }}>
          Selected work
        </h2>

        {featuredProjects.map((project) => (
          <article className="project" key={project.slug}>
            <figure className="fig">
              {renderDiagram(project.slug)}
              <figcaption>{project.figureCaption}</figcaption>
            </figure>
            <div>
              <p className="num">{project.num}</p>
              <h3>{project.title}</h3>
              <p className="sub">{project.sub}</p>
              <p className="body">{project.body}</p>
              {project.result && (
                <p className="result">
                  <b>Result:</b> {project.result.replace(/^Result:\s*/i, "")}
                </p>
              )}
              {project.links && project.links.length > 0 && (
                <ul className="plinks">
                  {project.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {project.status && <p className="status">{project.status}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
