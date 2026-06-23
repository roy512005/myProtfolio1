'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_PHASES } from '@/lib/constants';
import { staggerContainer, fadeUpVariant } from '@/lib/animations';

export default function BuildProcess() {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section
      id="build-process"
      className="section-wrapper"
      style={{
        background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(6,182,212,0.04) 0%, transparent 60%)',
        borderTop: '1px solid var(--color-border)',
      }}
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
            Build Process
          </motion.div>
          <motion.h2
            variants={fadeUpVariant}
            className="text-h1 mb-4"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            From idea to{' '}
            <span className="gradient-text-cyan">impact.</span>
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-body-lg text-[var(--color-text-muted)] max-w-xl mx-auto">
            A proven 5-phase process that eliminates guesswork and delivers precision.
          </motion.p>
        </motion.div>

        {/* Timeline nav */}
        <motion.div
          className="relative mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Progress track */}
          <div
            className="absolute top-5 left-0 right-0 h-px mx-16 md:mx-0"
            style={{ background: 'var(--color-border)' }}
          />
          <motion.div
            className="absolute top-5 left-0 h-px"
            style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-cyan))' }}
            animate={{ width: `${((activePhase + 1) / TIMELINE_PHASES.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          {/* Phase tabs */}
          <div className="relative flex justify-between">
            {TIMELINE_PHASES.map((phase, idx) => (
              <button
                key={phase.id}
                id={`build-phase-${phase.id}`}
                onClick={() => setActivePhase(idx)}
                className="flex flex-col items-center gap-3 group"
              >
                {/* Dot */}
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 relative z-10"
                  animate={{
                    background: idx <= activePhase ? '#6366F1' : 'var(--color-surface)',
                    boxShadow: idx === activePhase ? '0 0 20px rgba(99,102,241,0.5)' : 'none',
                    borderColor: idx <= activePhase ? '#6366F1' : 'var(--color-border)',
                  }}
                  style={{
                    border: '2px solid',
                    color: idx <= activePhase ? '#fff' : 'var(--color-text-muted)',
                  }}
                >
                  {phase.number}
                </motion.div>

                {/* Label (desktop only) */}
                <span
                  className="hidden md:block text-xs font-medium transition-colors duration-300"
                  style={{
                    color: idx === activePhase ? 'var(--color-text)' : 'var(--color-text-subtle)',
                    fontFamily: 'var(--font-syne)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {phase.title}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Active Phase Card */}
        <motion.div
          key={activePhase}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="glass-card rounded-2xl p-10 md:p-14"
          style={{ border: '1px solid rgba(99,102,241,0.2)', boxShadow: '0 0 60px rgba(99,102,241,0.06)' }}
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{TIMELINE_PHASES[activePhase].icon}</span>
                <div>
                  <span className="text-label text-[var(--color-accent)]">
                    Phase {TIMELINE_PHASES[activePhase].number}
                  </span>
                  <h3
                    className="text-h2"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {TIMELINE_PHASES[activePhase].title}
                  </h3>
                </div>
              </div>
              <p className="text-body-lg text-[var(--color-text-muted)] leading-relaxed mb-8">
                {TIMELINE_PHASES[activePhase].description}
              </p>

              {/* Navigation arrows */}
              <div className="flex gap-3">
                <button
                  id="build-prev-btn"
                  onClick={() => setActivePhase(Math.max(0, activePhase - 1))}
                  disabled={activePhase === 0}
                  className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                >
                  ←
                </button>
                <button
                  id="build-next-btn"
                  onClick={() => setActivePhase(Math.min(TIMELINE_PHASES.length - 1, activePhase + 1))}
                  disabled={activePhase === TIMELINE_PHASES.length - 1}
                  className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-30 hover:border-[var(--color-accent)] hover:text-white"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                >
                  →
                </button>
              </div>
            </div>

            {/* Right: Tools */}
            <div>
              <div className="text-label text-[var(--color-text-subtle)] mb-5">Tools & Methods</div>
              <div className="flex flex-wrap gap-3">
                {TIMELINE_PHASES[activePhase].tools.map((tool, i) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07, type: 'spring', stiffness: 300, damping: 25 }}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium"
                    style={{
                      background: 'var(--color-surface-2)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                  >
                    {tool}
                  </motion.div>
                ))}
              </div>

              {/* Decorative number */}
              <div
                className="mt-8 text-right"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: 'clamp(5rem, 12vw, 10rem)',
                  fontWeight: 800,
                  lineHeight: 1,
                  color: 'rgba(99,102,241,0.06)',
                }}
              >
                {TIMELINE_PHASES[activePhase].number}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
