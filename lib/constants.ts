import type { Project, Collaborator, TimelinePhase, DashboardStat, ClientJourneyStep } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'nexus-platform',
    number: '01',
    title: 'Nexus Analytics Platform',
    subtitle: 'Rebuilding the future of B2B data visualization',
    industry: 'SaaS / Analytics',
    tags: ['React', 'TypeScript', 'D3.js', 'WebSockets', 'Next.js'],
    challenge: 'A fast-growing B2B SaaS company was losing enterprise clients due to a dashboard that took 8+ seconds to load and couldn\'t handle real-time data feeds. The existing codebase was a tangled jQuery monolith from 2018.',
    process: 'Started with a 2-week technical audit — profiling render bottlenecks, mapping data dependencies, and interviewing the core power users. Designed a new component architecture around virtualization and incremental data loading before writing a single line.',
    solution: 'Rebuilt the entire platform in React + TypeScript with a custom virtualized grid engine, WebSocket-driven live updates, and a micro-frontend architecture that let teams ship independently. Introduced a shared design system across 6 product teams.',
    impact: 'Load time dropped from 8.2s to 0.9s. Dashboard engagement increased 340%. The redesigned platform was directly cited in a $12M Series B announcement.',
    accentColor: '#6366F1',
    year: '2024',
  },
  {
    id: 'aurora-commerce',
    number: '02',
    title: 'Aurora Commerce Experience',
    subtitle: 'Performance engineering for a luxury retail brand',
    industry: 'E-Commerce / Luxury Retail',
    tags: ['Next.js', 'Shopify', 'Framer Motion', 'Edge Runtime', 'TypeScript'],
    challenge: 'A luxury fashion brand had a beautiful design but a Lighthouse score of 34. Every 100ms of latency was costing them an estimated $180K/year in abandoned carts. Their CMS was blocking critical rendering paths.',
    process: 'Mapped the entire critical render path. Identified 14 render-blocking resources, 3 waterfall API chains, and layout shift sources. Proposed a hybrid SSG/ISR architecture with edge-cached product data and progressive image loading.',
    solution: 'Migrated to Next.js with full ISR, built a custom image optimization pipeline, implemented predictive prefetching based on scroll velocity, and created a streamlined checkout flow with 40% fewer steps.',
    impact: 'Lighthouse score: 34 → 97. Core Web Vitals: all green. Revenue per session increased 28% in the first month post-launch.',
    accentColor: '#F59E0B',
    year: '2024',
  },
  {
    id: 'meridian-design-system',
    number: '03',
    title: 'Meridian Design System',
    subtitle: 'A unified design language across 9 product teams',
    industry: 'Design Systems / FinTech',
    tags: ['React', 'TypeScript', 'Storybook', 'Radix UI', 'CSS-in-JS'],
    challenge: 'A FinTech scale-up had 9 product teams, 3 different component libraries, and zero design consistency. New engineers took 6 weeks to become productive. The accessibility audit found 240 critical violations.',
    process: 'Ran a comprehensive component audit across all 9 products. Mapped 47 unique button variants down to a principled system of 6. Built a token architecture that could simultaneously support light/dark modes and 3 brand themes.',
    solution: 'Architected Meridian — a fully accessible, token-driven component library with 80+ components, automated visual regression testing, and a living documentation site. Built the internal CLI for scaffolding new components.',
    impact: 'Engineer onboarding time cut from 6 weeks to 8 days. Zero accessibility violations on audit. 3 teams shipped major features in the first sprint using Meridian alone.',
    accentColor: '#06B6D4',
    year: '2023',
  },
];

export const COLLABORATORS: Collaborator[] = [
  { id: '1', name: 'Studio Luminary', role: 'Product Design Agency', type: 'agency', location: 'Berlin' },
  { id: '2', name: 'Priya Mehta', role: 'Brand & Visual Designer', type: 'designer', location: 'Mumbai' },
  { id: '3', name: 'Vertex Labs', role: 'Full-Stack Development Studio', type: 'agency', location: 'London' },
  { id: '4', name: 'Marcus Chen', role: 'Motion Designer', type: 'designer', location: 'Singapore' },
  { id: '5', name: 'Aria Kowalski', role: 'UX Researcher', type: 'freelancer', location: 'Warsaw' },
  { id: '6', name: 'Zara Okafor', role: 'Startup Founder, HealthTech', type: 'founder', location: 'Lagos' },
  { id: '7', name: 'Pulse Creative', role: 'Digital Marketing Studio', type: 'agency', location: 'NYC' },
  { id: '8', name: 'James Nakamura', role: 'iOS Developer', type: 'freelancer', location: 'Tokyo' },
  { id: '9', name: 'Elena Vasquez', role: 'Startup Founder, EdTech', type: 'founder', location: 'Barcelona' },
  { id: '10', name: 'Sam Oduola', role: 'Backend Engineer', type: 'freelancer', location: 'Nairobi' },
];

export const TIMELINE_PHASES: TimelinePhase[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Discovery',
    description: 'Deep-dive into your users, business goals, and technical landscape. No assumptions.',
    tools: ['Figma', 'Notion', 'Loom', 'Miro'],
    icon: '🔍',
  },
  {
    id: 'design',
    number: '02',
    title: 'Design',
    description: 'From wireframes to high-fidelity prototypes. Every decision is justified, every pixel is intentional.',
    tools: ['Figma', 'Framer', 'Storybook'],
    icon: '✦',
  },
  {
    id: 'development',
    number: '03',
    title: 'Development',
    description: 'Clean architecture, rigorous TypeScript, and obsessive attention to performance from day one.',
    tools: ['Next.js', 'React', 'TypeScript', 'Vitest'],
    icon: '⌨',
  },
  {
    id: 'optimization',
    number: '04',
    title: 'Optimization',
    description: 'Performance profiling, accessibility audit, SEO engineering. Ship only when it\'s exceptional.',
    tools: ['Lighthouse', 'WebPageTest', 'axe'],
    icon: '⚡',
  },
  {
    id: 'launch',
    number: '05',
    title: 'Launch',
    description: 'Zero-downtime deployment, real-time monitoring, and knowledge transfer. You own what we build.',
    tools: ['Vercel', 'GitHub Actions', 'Sentry', 'Datadog'],
    icon: '🚀',
  },
];

export const DASHBOARD_STATS: DashboardStat[] = [
  { id: 'projects', value: '47', suffix: '+', label: 'Projects Delivered', description: 'Across SaaS, e-commerce, FinTech & more', color: '#6366F1' },
  { id: 'technologies', value: '18', suffix: '+', label: 'Technologies Mastered', description: 'From React to WebAssembly', color: '#06B6D4' },
  { id: 'lighthouse', value: '97', suffix: '', label: 'Avg Lighthouse Score', description: 'Performance benchmark', color: '#10B981' },
  { id: 'loadtime', value: '1.2', suffix: 's', label: 'Avg Page Load Time', description: 'p75 on real-world 4G', color: '#F59E0B' },
  { id: 'experience', value: '5', suffix: '+', label: 'Years of Mastery', description: 'Building at the frontier', color: '#EC4899' },
  { id: 'clients', value: '98', suffix: '%', label: 'Client Satisfaction', description: 'Based on project retrospectives', color: '#8B5CF6' },
];

export const CLIENT_JOURNEY: ClientJourneyStep[] = [
  {
    id: 'inquiry',
    stage: '01',
    title: 'You Reach Out',
    description: 'Send a message with your project brief.',
    detail: 'I respond to every inquiry within 4 hours during business days. No automated replies — you get a thoughtful, personal response.',
    icon: '✉',
    timeframe: '< 4 hours',
  },
  {
    id: 'call',
    stage: '02',
    title: 'Discovery Call',
    description: 'A focused 30-minute conversation.',
    detail: 'No pitch deck, no upselling. I ask sharp questions to understand your problem deeply. You\'ll leave with clarity, regardless of whether we work together.',
    icon: '◎',
    timeframe: '30 minutes',
  },
  {
    id: 'proposal',
    stage: '03',
    title: 'Scoped Proposal',
    description: 'A detailed, transparent project scope.',
    detail: 'Fixed-price or retainer — your choice. No surprise invoices. Every milestone is defined before we start. You know exactly what you\'re getting.',
    icon: '◈',
    timeframe: '48 hours',
  },
  {
    id: 'kickoff',
    stage: '04',
    title: 'Kickoff',
    description: 'Shared workspace, clear roadmap.',
    detail: 'You get access to a dedicated Notion workspace with milestones, decisions log, and live preview links. You\'re never in the dark.',
    icon: '◆',
    timeframe: 'Day 1',
  },
  {
    id: 'delivery',
    stage: '05',
    title: 'Weekly Delivery',
    description: 'Consistent progress, zero surprises.',
    detail: 'Weekly Loom update + live preview link. You see real progress every Friday. Feedback happens in context, not in email threads.',
    icon: '◉',
    timeframe: 'Weekly',
  },
  {
    id: 'launch',
    stage: '06',
    title: 'Launch & Beyond',
    description: '30-day post-launch support included.',
    detail: 'I stay on after go-live. If anything breaks or needs tuning, I\'m there. Complete code walkthrough and documentation before handoff.',
    icon: '✦',
    timeframe: '30 days post-launch',
  },
];

export const SKILLS_CORE = [
  { name: 'React.js', level: 'Expert', years: 5 },
  { name: 'Next.js', level: 'Expert', years: 4 },
  { name: 'TypeScript', level: 'Expert', years: 4 },
  { name: 'JavaScript', level: 'Expert', years: 6 },
];

export const SKILLS_STYLING = [
  { name: 'Tailwind CSS', level: 'Expert', years: 3 },
  { name: 'Framer Motion', level: 'Expert', years: 3 },
  { name: 'GSAP', level: 'Advanced', years: 2 },
  { name: 'CSS / SCSS', level: 'Expert', years: 5 },
  { name: 'Three.js', level: 'Advanced', years: 2 },
];

export const SKILLS_BACKEND = [
  { name: 'Node.js', level: 'Advanced', years: 4 },
  { name: 'PostgreSQL', level: 'Intermediate', years: 3 },
  { name: 'GraphQL', level: 'Advanced', years: 3 },
  { name: 'REST APIs', level: 'Expert', years: 5 },
];

export const SKILLS_INFRA = [
  { name: 'Vercel', level: 'Expert', years: 3 },
  { name: 'AWS', level: 'Intermediate', years: 2 },
  { name: 'Docker', level: 'Advanced', years: 3 },
  { name: 'GitHub Actions', level: 'Advanced', years: 3 },
];
