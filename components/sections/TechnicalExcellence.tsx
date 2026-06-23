'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUpVariant } from '@/lib/animations';
import {
  SKILLS_CORE,
  SKILLS_STYLING,
  SKILLS_BACKEND,
  SKILLS_INFRA,
} from '@/lib/constants';

const CATEGORIES = [
  { id: 'core', label: 'Core', color: '#6366F1', items: SKILLS_CORE },
  { id: 'styling', label: 'UI & Motion', color: '#EC4899', items: SKILLS_STYLING },
  { id: 'backend', label: 'Backend', color: '#06B6D4', items: SKILLS_BACKEND },
  { id: 'infra', label: 'Infra & DevOps', color: '#F59E0B', items: SKILLS_INFRA },
];

const LEVEL_COLORS: Record<string, string> = {
  Expert: '#10B981',
  Advanced: '#6366F1',
  Intermediate: '#F59E0B',
};

export default function TechnicalExcellence() {
  const [activeCategory, setActiveCategory] = useState('core');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const cat = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <section
      id="technical-excellence"
      className="section-wrapper"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.div variants={fadeUpVariant} className="section-label text-label mb-4">
                Technical Excellence
              </motion.div>
              <motion.h2
                variants={fadeUpVariant}
                className="text-h1"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                The stack that<br />
                <span className="gradient-text">ships outcomes.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUpVariant}
              className="text-body-lg text-[var(--color-text-muted)] max-w-sm"
            >
              No progress bars. Just the honest truth about what I build with and how deeply I know it.
            </motion.p>
          </div>

          {/* Category Tabs */}
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-wrap gap-2 mt-10"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`skill-cat-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: activeCategory === cat.id ? cat.color : 'var(--color-surface)',
                  border: `1px solid ${activeCategory === cat.id ? cat.color : 'var(--color-border)'}`,
                  color: activeCategory === cat.id ? '#fff' : 'var(--color-text-muted)',
                  boxShadow: activeCategory === cat.id ? `0 0 20px ${cat.color}40` : 'none',
                }}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          className="grid md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {cat.items.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="group relative p-6 rounded-xl cursor-default overflow-hidden"
              style={{
                background: 'var(--color-surface)',
                border: `1px solid ${hoveredSkill === skill.name ? cat.color + '60' : 'var(--color-border)'}`,
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                boxShadow: hoveredSkill === skill.name ? `0 0 30px ${cat.color}15` : 'none',
              }}
            >
              {/* Bg glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${cat.color}06, transparent)` }}
              />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Level indicator dot */}
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{
                      background: LEVEL_COLORS[skill.level],
                      boxShadow: `0 0 8px ${LEVEL_COLORS[skill.level]}`,
                    }}
                  />

                  <div>
                    <div
                      className="font-semibold text-[var(--color-text)] mb-0.5"
                      style={{ fontFamily: 'var(--font-syne)', fontSize: '1rem' }}
                    >
                      {skill.name}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {skill.years}+ years · {skill.level}
                    </div>
                  </div>
                </div>

                {/* Level badge */}
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{
                    background: `${LEVEL_COLORS[skill.level]}15`,
                    color: LEVEL_COLORS[skill.level],
                    border: `1px solid ${LEVEL_COLORS[skill.level]}30`,
                  }}
                >
                  {skill.level}
                </span>
              </div>

              {/* Animated experience bar */}
              <div className="mt-4 h-0.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: cat.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '75%' : '55%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.07 + 0.2, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {[
            { label: 'Expert Level', count: 8, color: '#10B981' },
            { label: 'Advanced', count: 7, color: '#6366F1' },
            { label: 'Total Technologies', count: 18, color: '#06B6D4' },
            { label: 'Years of Depth', count: '5+', color: '#F59E0B' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-xl text-center"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="font-bold mb-1"
                style={{ fontFamily: 'var(--font-syne)', fontSize: '2rem', color: stat.color }}
              >
                {stat.count}
              </div>
              <div className="text-label text-[var(--color-text-subtle)]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
