'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/lib/constants';
import { staggerContainer, fadeUpVariant, clipReveal } from '@/lib/animations';

export default function SelectedWork() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <section id="selected-work" className="section-wrapper" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          <div>
            <motion.div variants={fadeUpVariant} className="section-label text-label mb-4">
              Selected Work
            </motion.div>
            <motion.h2
              variants={fadeUpVariant}
              className="text-h1"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Case Studies,<br />
              <span className="gradient-text">not just projects.</span>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUpVariant}
            className="text-body-lg text-[var(--color-text-muted)] max-w-sm"
          >
            Every engagement is a story of transformation. Here are three that shaped how I think.
          </motion.p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-2">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              id={`project-${project.id}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUpVariant}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Project Row Header */}
              <div
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  transition: 'border-color 0.3s ease',
                }}
                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
              >
                {/* Gradient accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }}
                />

                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Left */}
                    <div className="flex items-start gap-6">
                      {/* Number */}
                      <span
                        className="text-display opacity-10 leading-none"
                        style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(3rem,6vw,5rem)', lineHeight: 1 }}
                      >
                        {project.number}
                      </span>

                      <div>
                        <div className="text-label text-[var(--color-text-subtle)] mb-2">
                          {project.industry} · {project.year}
                        </div>
                        <h3
                          className="text-h3 group-hover:gradient-text transition-all duration-300 mb-2"
                          style={{ fontFamily: 'var(--font-syne)' }}
                        >
                          {project.title}
                        </h3>
                        <p className="text-[var(--color-text-muted)] text-sm max-w-lg">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Tags + Toggle */}
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="tag-pill">{tag}</span>
                        ))}
                      </div>
                      <motion.div
                        animate={{ rotate: activeProject === project.id ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:border-[var(--color-accent)] group-hover:text-white transition-all duration-300 shrink-0"
                      >
                        +
                      </motion.div>
                    </div>
                  </div>

                  {/* Expandable Case Study */}
                  <AnimatePresence>
                    {activeProject === project.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="mt-10 pt-10" style={{ borderTop: '1px solid var(--color-border)' }}>
                          <div className="grid md:grid-cols-2 gap-8">
                            {[
                              { label: 'The Challenge', content: project.challenge, icon: '◎' },
                              { label: 'The Process', content: project.process, icon: '◈' },
                              { label: 'The Solution', content: project.solution, icon: '◆' },
                              { label: 'The Impact', content: project.impact, icon: '✦', highlight: true },
                            ].map((item) => (
                              <div key={item.label} className={`p-6 rounded-xl ${item.highlight ? 'animated-border' : ''}`}
                                style={{
                                  background: item.highlight ? `rgba(${item.highlight ? '99,102,241' : '13,13,20'},0.08)` : 'var(--color-surface-2)',
                                  border: '1px solid var(--color-border)',
                                }}>
                                <div className="flex items-center gap-2 mb-3">
                                  <span style={{ color: project.accentColor }}>{item.icon}</span>
                                  <span className="text-label" style={{ color: project.accentColor }}>
                                    {item.label}
                                  </span>
                                </div>
                                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                                  {item.content}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* All tags */}
                          <div className="flex flex-wrap gap-2 mt-8">
                            {project.tags.map((tag) => (
                              <span key={tag} className="tag-pill">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
