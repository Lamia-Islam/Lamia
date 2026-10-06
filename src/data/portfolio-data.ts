import portfolioDataJson from "./portfolio-data.json";

export interface ProjectDetail {
  slug: string;
  title: string;
  shortTitle: string;
  year: string;
  summary: string;
  problem: string;
  whatBuilt: string[];
  keyResults: string[];
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
  techTags: string[];
  links: {
    label: string;
    url: string;
    type: 'paper' | 'preprint' | 'code' | 'external';
  }[];
  figureCaption: string;
}

export interface SmallerProject {
  title: string;
  description: string;
  tags: string[];
  publication?: string;
  doi?: string;
}

export interface PublicationItem {
  id: string;
  category: 'Journal' | 'Conference' | 'Submitted' | 'Preprint' | 'Presentation';
  authors: string;
  title: string;
  venue: string;
  dateOrYear: string;
  doi?: string;
  url?: string;
  note?: string;
}

export interface ExperienceItem {
  title: string;
  organization: string;
  location: string;
  period: string;
  supervisorOrMentor?: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade: string;
  details?: string;
  thesis?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ResearchInterest {
  title: string;
  summary: string;
  tags: string[];
}

export interface AcademicServiceItem {
  role: string;
  organization: string;
  description: string;
}

export interface HonorCertificationItem {
  title: string;
  issuer: string;
  description: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    headline: string;
    subline: string;
    location: string;
    email: string;
    cvPath: string;
    socialLinks: {
      email: string;
      github: string;
      linkedin: string;
      scholar: string;
      researchgate: string;
      orcid: string;
    };
    contactNote: string;
  };
  stats: {
    value: string;
    label: string;
    highlight: string;
  }[];
  about: {
    openingQuestion: string;
    paragraphs: string[];
  };
  researchInterests: ResearchInterest[];
  featuredProjects: ProjectDetail[];
  smallerProjects: SmallerProject[];
  publications: PublicationItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  academicService: AcademicServiceItem[];
  honorsAndCertifications: HonorCertificationItem[];
}

// Export the statically imported JSON data with strong typing
export const PORTFOLIO_DATA: PortfolioData = portfolioDataJson as PortfolioData;
