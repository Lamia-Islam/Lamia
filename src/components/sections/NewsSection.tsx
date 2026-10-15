import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function NewsSection() {
  const { news } = PORTFOLIO_DATA;

  return (
    <section className="block" id="news">
      <div className="wrap grid">
        <h2 className="label">News</h2>
        <ul className="news">
          {news.map((item, idx) => (
            <li key={idx}>
              <time dateTime={item.datetime}>{item.date}</time>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
