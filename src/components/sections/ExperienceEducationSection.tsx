import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function ExperienceEducationSection() {
  const { experience, education, service } = PORTFOLIO_DATA;

  return (
    <section className="block" id="experience">
      <div className="wrap grid">
        <h2 className="label">Experience and education</h2>
        <div className="cv">
          <div>
            <h3>Experience</h3>
            <dl>
              {experience.map((exp, idx) => (
                <div className="row" key={idx}>
                  <dt>
                    {exp.role}
                    <span>{exp.org}</span>
                  </dt>
                  <dd>{exp.period}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3>Education</h3>
            <dl>
              {education.map((edu, idx) => (
                <div className="row" key={idx}>
                  <dt>
                    {edu.degree}
                    <span>{edu.institution}</span>
                  </dt>
                  <dd>{edu.period}</dd>
                </div>
              ))}
            </dl>
            {service && service.length > 0 && (
              <>
                <h3>Service</h3>
                <dl>
                  {service.map((srv, idx) => (
                    <div className="row" key={idx}>
                      <dt>
                        {srv.role}
                        <span>{srv.venue}</span>
                      </dt>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
