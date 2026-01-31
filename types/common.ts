export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  coverImage: string;
  demoType: 'visualization' | 'interactive' | 'none';
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  stats?: Record<string, string>;
  capabilities?: string[];
  techStack: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  coursework?: string[];
}

export interface Skill {
  category: string;
  skills: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Resume {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  phone?: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  socialLinks: SocialLink[];
  stats: {
    yearsExperience: string;
    projectsCompleted: string;
    openSourceContributions: string;
  };
}
