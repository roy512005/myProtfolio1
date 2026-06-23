'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-12 mt-0"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex items-center gap-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'var(--gradient-primary)', color: '#fff', fontFamily: 'var(--font-syne)' }}
            >
              A
            </div>
            <div>
              <div className="font-bold text-sm" style={{ fontFamily: 'var(--font-syne)' }}>Anik Roy</div>
              <div className="text-xs text-[var(--color-text-muted)]">Frontend Architect</div>
            </div>
          </div>

          {/* Center */}
          <div className="text-xs text-[var(--color-text-subtle)] text-center">
            © {year} Anik Roy · Built with Next.js, Three.js & Framer Motion
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-[var(--color-text-muted)]">Available for work · IST</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
