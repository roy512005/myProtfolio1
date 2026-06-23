'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import MagneticButton from '@/components/ui/MagneticButton';

const ParticleField = dynamic(() => import('@/components/three/ParticleField'), {
  ssr: false,
});

const ROLES = [
  'Frontend Architect',
  'React Specialist',
  'Performance Engineer',
  'UI Craftsman',
  'TypeScript Expert',
];

export default function CinematicIntro() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2800);
    return () => { clearTimeout(t); clearInterval(interval); };
  }, []);

  const scrollToWork = () => {
    document.getElementById('selected-work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="cinematic-intro"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 60%)' }}
    >
      {/* Three.js particles */}
      <ParticleField />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(5,5,8,0.85) 100%)',
        }}
      />

      {/* Grid lines background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Main content */}
      <div className="container relative z-10 text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="w-8 h-px bg-[var(--color-accent)]" />
          <span className="text-label text-[var(--color-accent)]">Available for Projects</span>
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent-green)] pulse-glow" />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-display mb-6"
          style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-text)' }}
          initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 60, filter: visible ? 'blur(0px)' : 'blur(8px)' }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span style={{ WebkitTextStroke: '1px rgba(248,248,255,0.15)', color: 'transparent' }} className="block">
            ANIK
          </span>
          <span className="block gradient-text">ROY</span>
        </motion.h1>

        {/* Animated Role */}
        <div className="h-14 overflow-hidden mb-10" style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              className="text-h3 text-[var(--color-text-muted)] absolute inset-x-0"
              style={{ fontFamily: 'var(--font-syne)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {ROLES[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Tagline */}
        <motion.p
          className="text-body-lg text-[var(--color-text-muted)] max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -30 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          I build the interfaces the internet{' '}
          <span className="gradient-text" style={{ fontStyle: 'italic' }}>remembers.</span>
          {' '}Precision-engineered, performance-obsessed, experience-defining.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <MagneticButton
            id="hero-view-work-btn"
            onClick={scrollToWork}
            className="group flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold text-white transition-all duration-300"
            style={{
              background: 'var(--gradient-primary)',
              boxShadow: '0 0 40px rgba(99,102,241,0.3)',
            } as React.CSSProperties}
          >
            View Selected Work
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </MagneticButton>

          <MagneticButton
            id="hero-contact-btn"
            href="#contact"
            className="flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:bg-[rgba(99,102,241,0.06)] transition-all duration-300"
          >
            Start a Conversation
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="text-label text-[var(--color-text-subtle)]">Scroll to explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--color-accent)] to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
