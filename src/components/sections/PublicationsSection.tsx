import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

function formatAuthors(authors: string, boldTarget = "L. Islam") {
  const parts = authors.split(boldTarget);
  if (parts.length === 1) return <span>{authors}</span>;
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {i > 0 && <b>{boldTarget}</b>}
          {part}
        </React.Fragment>
      ))}
    </>
  );
}

export function PublicationsSection() {
  const { publications, profile } = PORTFOLIO_DATA;

  return (
    <section className="block" id="publications">
      <div className="wrap grid">
        <h2 className="label">Publications</h2>
        <div>
          {publications.underReview && publications.underReview.length > 0 && (
            <>
              <h3 className="pubgroup">Under review</h3>
              <ul className="pubs">
                {publications.underReview.map((pub, idx) => (
                  <li key={idx}>
                    {formatAuthors(pub.authors, pub.boldAuthor || "L. Islam")}
                    <span className="t">{pub.title}</span>
                    <span className="venue">{pub.venue}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {publications.published && publications.published.length > 0 && (
            <>
              <h3 className="pubgroup">Published</h3>
              <ul className="pubs">
                {publications.published.map((pub, idx) => (
                  <li key={idx}>
                    {formatAuthors(pub.authors, pub.boldAuthor || "L. Islam")}
                    <span className="t">{pub.title}</span>
                    <span className="venue">{pub.venue}</span>
                    {pub.doiUrl && (
                      <a
                        href={pub.doiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "inline-block", marginTop: "2px" }}
                      >
                        {pub.doiDisplay || pub.doiUrl.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="more">
            <a
              href={profile.socialLinks.scholar}
              target="_blank"
              rel="noopener noreferrer"
            >
              Full list on Google Scholar
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
