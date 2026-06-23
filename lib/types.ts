export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  industry: string;
  tags: string[];
  challenge: string;
  process: string;
  solution: string;
  impact: string;
  accentColor: string;
  year: string;
}

export interface Collaborator {
  id: string;
  name: string;
  role: string;
  type: 'agency' | 'designer' | 'freelancer' | 'founder';
  location: string;
}

export interface TimelinePhase {
  id: string;
  number: string;
  title: string;
  description: string;
  tools: string[];
  icon: string;
}

export interface Skill {
  name: string;
  category: 'core' | 'framework' | 'styling' | 'backend' | 'infra';
  orbit: number;
  angle: number;
}

export interface DashboardStat {
  id: string;
  value: string;
  suffix: string;
  label: string;
  description: string;
  color: string;
}

export interface ClientJourneyStep {
  id: string;
  stage: string;
  title: string;
  description: string;
  detail: string;
  icon: string;
  timeframe: string;
}
