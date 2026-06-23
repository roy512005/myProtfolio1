'use client';

import { motion } from 'framer-motion';
import { CLIENT_JOURNEY } from '@/lib/constants';
import { staggerContainer, fadeUpVariant } from '@/lib/animations';

export default function ClientExperience() {
  return (
    <section
      id="client-experience"
      className="section-wrapper"
      style={{
        background: 'radial-gradient(ellipse 70% 50% at 0% 50%, rgba(236,72,153,0.04) 0%, transparent 60%)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpVariant} className="section-label justify-center text-label mb-4">
            Client Experience
          </motion.div>
          <motion.h2
            variants={fadeUpVariant}
            className="text-h1 mb-4"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            What it feels like to{' '}
            <span className="gradient-text">work with me.</span>
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-body-lg text-[var(--color-text-muted)] max-w-xl mx-auto">
            No guesswork. No scope creep surprises. Just clarity, momentum, and exceptional results.
          </motion.p>
        </motion.div>

        {/* Journey */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical spine */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, var(--color-accent), var(--color-border) 80%, transparent)' }}
          />

          <div className="space-y-8 md:space-y-0">
            {CLIENT_JOURNEY.map((step, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-6 md:gap-0 md:mb-10`}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Card */}
                  <div className={`w-full md:w-[calc(50%-3rem)] ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <div
                      className="group p-6 rounded-2xl transition-all duration-300"
                      style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {/* Stage badge */}
                      <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--color-accent)' }}
                        >
                          Stage {step.stage}
                        </span>
                        <span className="text-label text-[var(--color-text-subtle)]">{step.timeframe}</span>
                      </div>

                      <h3
                        className="font-semibold text-[var(--color-text)] mb-1"
                        style={{ fontFamily: 'var(--font-syne)', fontSize: '1.1rem' }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-[var(--color-text-muted)] text-sm mb-3">{step.description}</p>
                      <p className="text-[var(--color-text-subtle)] text-xs leading-relaxed">{step.detail}</p>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 items-center justify-center">
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg z-10"
                      style={{
                        background: 'var(--color-bg)',
                        border: '2px solid var(--color-accent)',
                        boxShadow: '0 0 20px rgba(99,102,241,0.3)',
                      }}
                      whileInView={{
                        boxShadow: ['0 0 20px rgba(99,102,241,0.3)', '0 0 40px rgba(99,102,241,0.5)', '0 0 20px rgba(99,102,241,0.3)'],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* Mobile: icon on left */}
                  <div
                    className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-accent)',
                    }}
                  >
                    {step.icon}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-body-lg text-[var(--color-text-muted)] mb-6">
            Ready to experience this yourself?
          </p>
          <a
            id="client-exp-start-btn"
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: 'var(--gradient-primary)',
              boxShadow: '0 0 40px rgba(99,102,241,0.25)',
            }}
          >
            Start the Process →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
