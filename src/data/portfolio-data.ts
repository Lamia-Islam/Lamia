import portfolioDataJson from "./portfolio-data.json";

export interface ProjectDetail {
  num?: string;
  slug: string;
  title: string;
  shortTitle?: string;
  sub?: string;
  year?: string;
  summary?: string;
  problem?: string;
  body?: string;
  result?: string;
  whatBuilt?: string[];
  keyResults?: string[];
  thesisDetails?: {
    title: string;
    defended: string;
    supervisor: string;
  };
  papers?: {
    status: string;
    title: string;
    venue: string;
    doiUrl?: string;
  }[];
  links?: {
    label: string;
    url: string;
    type?: string;
  }[];
  status?: string;
  figureCaption?: string;
  techTags?: string[];
}

export interface NewsItem {
  date: string;
  datetime: string;
  text: string;
}

export interface PublicationItem {
  id?: string;
  authors: string;
  boldAuthor?: string;
  title: string;
  venue: string;
  doiUrl?: string;
  doiDisplay?: string;
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface ServiceItem {
  role: string;
  venue: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    headline: string;
    subline: string;
    location: string;
    email: string;
    cvPath: string;
    contactNote: string;
    socialLinks: {
      email: string;
      scholar: string;
      github: string;
      linkedin: string;
      orcid: string;
    };
  };
  about: {
    lede: string;
    paragraphs: string[];
    openingQuestion?: string;
  };
  news?: NewsItem[];
  featuredProjects: ProjectDetail[];
  publications: {
    underReview: PublicationItem[];
    published: PublicationItem[];
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  service: ServiceItem[];
  stats?: { value: string; label: string; highlight: string }[];
  researchInterests?: { title: string; summary: string; tags: string[] }[];
  skills?: { category: string; skills: string[] }[];
  academicService?: { role: string; organization: string; description: string }[];
  honorsAndCertifications?: { title: string; issuer: string; description: string }[];
  smallerProjects?: { title: string; description: string; tags: string[]; publication?: string; doi?: string }[];
}

export const PORTFOLIO_DATA: PortfolioData = portfolioDataJson as unknown as PortfolioData;
