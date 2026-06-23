'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeUpVariant } from '@/lib/animations';

const PANELS = [
  {
    id: 'thinking',
    label: 'How I Think',
    icon: '◎',
    code: `// thinking_framework.ts
const approach = {
  step_1: "Understand the user problem, not the task",
  step_2: "Map constraints before writing code",
  step_3: "Design the API before the implementation",
  step_4: "Question every assumption, twice",
  step_5: "Measure twice. Build once.",
};

// The goal is never the deliverable.
// The goal is the outcome.`,
    bullets: [
      'Start with WHY, not HOW',
      'User journey before component tree',
      'Constraints are features in disguise',
      'Simplicity is the hardest thing to achieve',
    ],
  },
  {
    id: 'solving',
    label: 'How I Solve',
    icon: '◈',
    code: `// problem_solving.ts
async function solve(problem: Problem) {
  const root = await findRootCause(problem);
  const constraints = await mapConstraints(root);
  
  // Never optimize what you haven't measured
  const metrics = await baseline(root);
  
  const solution = design({
    minimumViable: true,
    extensible: true,
    measurable: true,
  });

  return validate(solution, metrics);
}`,
    bullets: [
      'Profile before optimizing — always',
      'Reproduce before fixing',
      'Document decisions, not just code',
      'Treat complexity as technical debt',
    ],
  },
  {
    id: 'clients',
    label: 'How I Collaborate',
    icon: '◆',
    code: `// client_protocol.ts
const collaboration = {
  communication: "Daily async, weekly sync",
  transparency: "Shared Notion workspace",
  feedback: "In-context, not email threads",
  decisions: "Documented with rationale",
  surprises: 0, // always
  updates: "Weekly Loom + live preview",
};

// Great work is a collaborative act.
// My code doesn't matter if you can't use it.`,
    bullets: [
      'You see progress every single week',
      'Every decision documented with reasoning',
      'One point of contact, always responsive',
      'You own everything we build together',
    ],
  },
];

export default function DeveloperOS() {
  const [activePanel, setActivePanel] = useState('thinking');
  const panel = PANELS.find((p) => p.id === activePanel)!;

  return (
    <section
      id="developer-os"
      className="section-wrapper"
      style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.04) 0%, transparent 70%)' }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpVariant} className="section-label justify-center text-label mb-4">
            Developer OS
          </motion.div>
          <motion.h2
            variants={fadeUpVariant}
            className="text-h1 mb-4"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            How the{' '}
            <span className="gradient-text-cyan">machine thinks.</span>
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-body-lg text-[var(--color-text-muted)] max-w-xl mx-auto">
            Behind every pixel is a framework. Behind every framework is a philosophy.
          </motion.p>
        </motion.div>

        {/* macOS Window */}
        <motion.div
          className="glass-card rounded-2xl overflow-hidden max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px var(--color-border)' }}
        >
          {/* Title Bar */}
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{ background: 'var(--color-surface-2)', borderBottom: '1px solid var(--color-border)' }}
          >
            {/* Traffic lights */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 ml-4 flex-1 justify-center">
              {PANELS.map((p) => (
                <button
                  key={p.id}
                  id={`os-tab-${p.id}`}
                  onClick={() => setActivePanel(p.id)}
                  className="relative px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200"
                  style={{
                    color: activePanel === p.id ? 'var(--color-text)' : 'var(--color-text-muted)',
                    background: activePanel === p.id ? 'rgba(99,102,241,0.15)' : 'transparent',
                    border: activePanel === p.id ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                  }}
                >
                  <span className="mr-1.5">{p.icon}</span>
                  {p.label}
                </button>
              ))}
            </div>

            {/* Status badge */}
            <div className="flex items-center gap-1.5 ml-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-green)] pulse-glow" />
              <span className="text-xs text-[var(--color-text-subtle)]">v3.0.0</span>
            </div>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 min-h-80">
            {/* Code pane */}
            <div
              className="p-6"
              style={{
                borderRight: '1px solid var(--color-border)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                lineHeight: 1.8,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activePanel}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  style={{ color: 'var(--color-text-muted)', whiteSpace: 'pre-wrap' }}
                >
                  {/* Syntax highlight lines */}
                  {panel.code.split('\n').map((line, i) => {
                    let color = 'var(--color-text-muted)';
                    if (line.startsWith('//')) color = '#6B7280';
                    else if (line.includes('const') || line.includes('async') || line.includes('return') || line.includes('await')) color = '#818CF8';
                    else if (line.includes('"') || line.includes("'")) color = '#34D399';

                    return (
                      <span key={i} style={{ display: 'block', color }}>
                        {line || ' '}
                      </span>
                    );
                  })}
                  <span className="cursor-blink" style={{ color: 'var(--color-accent)' }}>|</span>
                </motion.pre>
              </AnimatePresence>
            </div>

            {/* Bullets pane */}
            <div className="p-8 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePanel}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="text-label text-[var(--color-accent)] mb-6">
                    {panel.icon} {panel.label}
                  </div>
                  <ul className="space-y-5">
                    {panel.bullets.map((bullet, i) => (
                      <motion.li
                        key={bullet}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-3"
                      >
                        <span
                          className="w-5 h-5 rounded flex items-center justify-center shrink-0 text-xs font-bold mt-0.5"
                          style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--color-accent)' }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[var(--color-text-muted)] text-sm leading-relaxed">{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
