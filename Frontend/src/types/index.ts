export interface AnalysisResult {
  topics: TopicSuggestion[];
  projectAnalysis: ProjectAnalysis[];
  experienceAnalysis: ExperienceAnalysis[];
  certificateAnalysis: CertificateAnalysis[];
  overallSummary: string;
}

export interface TopicSuggestion {
  topic: string;
  subtopics: SubTopic[];
  importance: number; // 1-10 scale
  reason: string;
}

export interface SubTopic {
  name: string;
  importance: number; // 1-10 scale
  description: string;
}

export interface ProjectAnalysis {
  name: string;
  technologies: Technology[];
  strengths: string[];
  weaknesses: string[];
  interviewFocus: string[];
}

export interface ExperienceAnalysis {
  role: string;
  company: string;
  technologies: Technology[];
  skills: Skill[];
  interviewFocus: string[];
}

export interface CertificateAnalysis {
  name: string;
  issuer: string;
  relevantSkills: string[];
  interviewFocus: string[];
}

export interface Technology {
  name: string;
  category: string;
  proficiency: number; // 1-10 scale
}

export interface Skill {
  name: string;
  category: string;
  proficiency: number; // 1-10 scale
}

export type FileType = 'pdf' | 'docx' | 'unknown';