'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'cinematic-intro', label: 'Home' },
  { id: 'selected-work', label: 'Work' },
  { id: 'developer-os', label: 'OS' },
  { id: 'collaboration-network', label: 'Network' },
  { id: 'build-process', label: 'Process' },
  { id: 'technical-excellence', label: 'Stack' },
  { id: 'client-experience', label: 'Experience' },
  { id: 'live-dashboard', label: 'Dashboard' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('cinematic-intro');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 60);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop floating nav */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-3 py-2 rounded-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        style={{
          background: isScrolled ? 'rgba(5,5,8,0.85)' : 'rgba(13,13,20,0.6)',
          border: '1px solid var(--color-border)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Logo dot */}
        <button
          id="nav-logo"
          onClick={() => scrollTo('cinematic-intro')}
          className="w-7 h-7 rounded-full flex items-center justify-center mr-2 font-bold text-xs transition-all duration-200 hover:scale-110"
          style={{ background: 'var(--gradient-primary)', color: '#fff', fontFamily: 'var(--font-syne)' }}
        >
          A
        </button>

        {NAV_ITEMS.slice(1).map((item) => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            onClick={() => scrollTo(item.id)}
            className="relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
            style={{
              color: activeSection === item.id ? '#fff' : 'var(--color-text-muted)',
              background: activeSection === item.id ? 'rgba(99,102,241,0.25)' : 'transparent',
            }}
          >
            {activeSection === item.id && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 rounded-full"
                style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative">{item.label}</span>
          </button>
        ))}

        {/* CTA */}
        <button
          id="nav-cta"
          onClick={() => scrollTo('contact')}
          className="ml-2 px-4 py-1.5 rounded-full text-xs font-semibold text-white transition-all duration-200 hover:scale-105"
          style={{ background: 'var(--gradient-primary)' }}
        >
          Hire Me
        </button>
      </motion.nav>

      {/* Mobile nav */}
      <motion.div
        className="fixed top-4 right-4 z-50 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <button
          id="nav-mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(13,13,20,0.9)',
            border: '1px solid var(--color-border)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="space-y-1.5">
            <motion.div
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
              className="w-4 h-px bg-white"
            />
            <motion.div
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              className="w-4 h-px bg-white"
            />
            <motion.div
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
              className="w-4 h-px bg-white"
            />
          </div>
        </button>
      </motion.div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 md:hidden"
          style={{ background: 'rgba(5,5,8,0.97)', backdropFilter: 'blur(20px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => scrollTo(item.id)}
              className="text-2xl font-bold transition-all duration-200"
              style={{
                fontFamily: 'var(--font-syne)',
                color: activeSection === item.id ? 'var(--color-accent)' : 'var(--color-text-muted)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </>
  );
}
