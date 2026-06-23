'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { DASHBOARD_STATS } from '@/lib/constants';
import { staggerContainer, fadeUpVariant } from '@/lib/animations';

// Generate a deterministic fake GitHub-style heatmap to avoid hydration errors
function generateHeatmap() {
  const weeks = 52;
  const days = 7;
  const cells = [];
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < days; d++) {
      // Deterministic pseudo-randomness
      const rand = ((w * 7 + d) * 23) % 100 / 100;
      let level = 0;
      if (rand > 0.6) level = 1;
      if (rand > 0.75) level = 2;
      if (rand > 0.87) level = 3;
      if (rand > 0.94) level = 4;
      week.push(level);
    }
    cells.push(week);
  }
  return cells;
}

const HEATMAP = generateHeatmap();
const HEATMAP_COLORS = [
  'rgba(99,102,241,0.06)',
  'rgba(99,102,241,0.25)',
  'rgba(99,102,241,0.5)',
  'rgba(99,102,241,0.75)',
  'rgba(99,102,241,1)',
];

function CounterDisplay({ stat, delay }: { stat: typeof DASHBOARD_STATS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="relative p-7 rounded-2xl group overflow-hidden"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ borderColor: stat.color + '60', transition: { duration: 0.2 } }}
    >
      {/* Glow bg */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse 60% 60% at 30% 50%, ${stat.color}08, transparent)` }}
      />

      {/* Color accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: stat.color, opacity: 0.4 }}
      />

      <div className="relative">
        {/* Number */}
        <motion.div
          className="font-black mb-1"
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: stat.color,
            lineHeight: 1,
          }}
        >
          {inView ? stat.value : '0'}{stat.suffix}
        </motion.div>

        {/* Label */}
        <div className="font-semibold text-[var(--color-text)] mb-1" style={{ fontFamily: 'var(--font-syne)' }}>
          {stat.label}
        </div>
        <div className="text-xs text-[var(--color-text-muted)]">{stat.description}</div>
      </div>
    </motion.div>
  );
}

export default function LiveDashboard() {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setTimeStr(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="live-dashboard"
      className="section-wrapper"
      style={{
        background: 'radial-gradient(ellipse 70% 60% at 100% 0%, rgba(99,102,241,0.05) 0%, transparent 60%)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          <div>
            <motion.div variants={fadeUpVariant} className="section-label text-label mb-4">
              Live Dashboard
            </motion.div>
            <motion.h2
              variants={fadeUpVariant}
              className="text-h1"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              By the{' '}
              <span className="gradient-text">numbers.</span>
            </motion.h2>
          </div>
          <motion.div
            variants={fadeUpVariant}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm"
            style={{
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.25)',
              color: 'var(--color-accent-green)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-green)] pulse-glow" />
            Currently available · IST {timeStr || '--:--'}
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {DASHBOARD_STATS.map((stat, i) => (
            <CounterDisplay key={stat.id} stat={stat} delay={i * 0.08} />
          ))}
        </div>

        {/* GitHub Heatmap */}
        <motion.div
          className="p-6 md:p-8 rounded-2xl"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="font-semibold text-[var(--color-text)] mb-1" style={{ fontFamily: 'var(--font-syne)' }}>
                Development Activity
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">365-day contribution graph</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--color-text-subtle)]">Less</span>
              {HEATMAP_COLORS.map((c, i) => (
                <div key={i} className="heatmap-cell" style={{ background: c }} />
              ))}
              <span className="text-xs text-[var(--color-text-subtle)]">More</span>
            </div>
          </div>

          {/* Heatmap grid */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1 min-w-max">
              {HEATMAP.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1">
                  {week.map((level, di) => (
                    <motion.div
                      key={di}
                      className="heatmap-cell"
                      style={{ background: HEATMAP_COLORS[level] }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (wi * 7 + di) * 0.0015, duration: 0.2 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Currently working badge */}
        <motion.div
          className="mt-6 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="shimmer h-px flex-1 max-w-24 rounded" />
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-subtle)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
            Currently building design systems and high-performance SaaS platforms
          </div>
          <div className="shimmer h-px flex-1 max-w-24 rounded" />
        </motion.div>
      </div>
    </section>
  );
}
