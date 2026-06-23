'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeUpVariant } from '@/lib/animations';

const STEPS = [
  {
    id: 'type',
    title: 'What do you need?',
    subtitle: 'Select the type of engagement you\'re looking for.',
  },
  {
    id: 'brief',
    title: 'Tell me about it.',
    subtitle: 'The more context, the better my response.',
  },
  {
    id: 'timeline',
    title: 'What\'s your timeline?',
    subtitle: 'This helps me understand urgency and scope.',
  },
  {
    id: 'details',
    title: 'Your details.',
    subtitle: 'Minimal information, maximum respect for your time.',
  },
];

const PROJECT_TYPES = [
  { id: 'new-project', label: 'New Project', icon: '◆', description: 'Build something from scratch' },
  { id: 'consulting', label: 'Consulting', icon: '◎', description: 'Technical review or strategy' },
  { id: 'partnership', label: 'Partnership', icon: '◈', description: 'Ongoing collaboration' },
  { id: 'exploring', label: 'Just Exploring', icon: '✦', description: 'Getting to know each other' },
];

const TIMELINES = [
  { id: 'asap', label: 'ASAP', icon: '⚡' },
  { id: '1-3months', label: '1–3 Months', icon: '◎' },
  { id: '3-6months', label: '3–6 Months', icon: '◈' },
  { id: 'flexible', label: 'Flexible', icon: '∞' },
];

export default function ContactExperience() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    type: '',
    brief: '',
    timeline: '',
    name: '',
    email: '',
    company: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const progress = ((step + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else setSubmitted(true);
  };

  const canProceed = () => {
    if (step === 0) return !!form.type;
    if (step === 1) return form.brief.length > 10;
    if (step === 2) return !!form.timeline;
    if (step === 3) return form.name && form.email;
    return false;
  };

  return (
    <section
      id="contact"
      className="section-wrapper"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(99,102,241,0.08) 0%, transparent 60%)',
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
            Contact
          </motion.div>
          <motion.h2
            variants={fadeUpVariant}
            className="text-h1 mb-4"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Let&apos;s build something{' '}
            <span className="gradient-text">extraordinary.</span>
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-body-lg text-[var(--color-text-muted)] max-w-xl mx-auto">
            Not a form. A conversation starter. Takes 60 seconds.
          </motion.p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {!submitted ? (
            <motion.div
              className="glass-card rounded-3xl overflow-hidden"
              style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.4), 0 0 0 1px var(--color-border)' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Progress bar */}
              <div className="h-1 w-full" style={{ background: 'var(--color-border)' }}>
                <motion.div
                  className="h-full"
                  style={{ background: 'var(--gradient-primary)' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>

              <div className="p-8 md:p-12">
                {/* Step indicators */}
                <div className="flex items-center gap-2 mb-8">
                  {STEPS.map((s, i) => (
                    <div key={s.id} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{
                          background: i <= step ? 'var(--color-accent)' : 'var(--color-border)',
                          boxShadow: i === step ? '0 0 8px var(--color-accent)' : 'none',
                        }}
                      />
                      {i < STEPS.length - 1 && (
                        <div
                          className="h-px flex-1 w-8"
                          style={{ background: i < step ? 'var(--color-accent)' : 'var(--color-border)' }}
                        />
                      )}
                    </div>
                  ))}
                  <span className="ml-auto text-xs text-[var(--color-text-muted)]">
                    {step + 1} / {STEPS.length}
                  </span>
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3
                      className="text-h3 mb-1"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {STEPS[step].title}
                    </h3>
                    <p className="text-[var(--color-text-muted)] text-sm mb-8">
                      {STEPS[step].subtitle}
                    </p>

                    {/* Step 0: Project Type */}
                    {step === 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {PROJECT_TYPES.map((type) => (
                          <button
                            key={type.id}
                            id={`contact-type-${type.id}`}
                            onClick={() => setForm({ ...form, type: type.id })}
                            className="text-left p-5 rounded-xl transition-all duration-200"
                            style={{
                              background: form.type === type.id ? 'rgba(99,102,241,0.12)' : 'var(--color-surface-2)',
                              border: `1px solid ${form.type === type.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
                              boxShadow: form.type === type.id ? '0 0 20px rgba(99,102,241,0.2)' : 'none',
                            }}
                          >
                            <div className="text-lg mb-2">{type.icon}</div>
                            <div className="font-semibold text-[var(--color-text)] text-sm" style={{ fontFamily: 'var(--font-syne)' }}>
                              {type.label}
                            </div>
                            <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{type.description}</div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Step 1: Brief */}
                    {step === 1 && (
                      <textarea
                        id="contact-brief"
                        value={form.brief}
                        onChange={(e) => setForm({ ...form, brief: e.target.value })}
                        placeholder="Describe your project, goal, or challenge..."
                        className="w-full h-36 rounded-xl p-4 text-sm resize-none outline-none transition-all duration-200"
                        style={{
                          background: 'var(--color-surface-2)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-text)',
                          fontFamily: 'var(--font-inter)',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'var(--color-accent)';
                          e.target.style.boxShadow = '0 0 20px rgba(99,102,241,0.15)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'var(--color-border)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    )}

                    {/* Step 2: Timeline */}
                    {step === 2 && (
                      <div className="grid grid-cols-2 gap-3">
                        {TIMELINES.map((t) => (
                          <button
                            key={t.id}
                            id={`contact-timeline-${t.id}`}
                            onClick={() => setForm({ ...form, timeline: t.id })}
                            className="flex items-center gap-3 p-5 rounded-xl transition-all duration-200"
                            style={{
                              background: form.timeline === t.id ? 'rgba(99,102,241,0.12)' : 'var(--color-surface-2)',
                              border: `1px solid ${form.timeline === t.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
                              color: 'var(--color-text)',
                            }}
                          >
                            <span className="text-xl">{t.icon}</span>
                            <span className="font-medium text-sm" style={{ fontFamily: 'var(--font-syne)' }}>{t.label}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Step 3: Details */}
                    {step === 3 && (
                      <div className="space-y-4">
                        {[
                          { key: 'name', placeholder: 'Your name *', id: 'contact-name' },
                          { key: 'email', placeholder: 'Email address *', id: 'contact-email', type: 'email' },
                          { key: 'company', placeholder: 'Company / Project (optional)', id: 'contact-company' },
                        ].map((field) => (
                          <input
                            key={field.key}
                            id={field.id}
                            type={field.type || 'text'}
                            placeholder={field.placeholder}
                            value={form[field.key as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                            className="w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200"
                            style={{
                              background: 'var(--color-surface-2)',
                              border: '1px solid var(--color-border)',
                              color: 'var(--color-text)',
                              fontFamily: 'var(--font-inter)',
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = 'var(--color-accent)';
                              e.target.style.boxShadow = '0 0 20px rgba(99,102,241,0.15)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'var(--color-border)';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-10">
                  <button
                    id="contact-back-btn"
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors disabled:opacity-30 flex items-center gap-2"
                  >
                    ← Back
                  </button>

                  <button
                    id="contact-next-btn"
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: canProceed() ? 'var(--gradient-primary)' : 'var(--color-surface-2)',
                      border: canProceed() ? 'none' : '1px solid var(--color-border)',
                      color: canProceed() ? '#fff' : 'var(--color-text-muted)',
                      boxShadow: canProceed() ? '0 0 30px rgba(99,102,241,0.3)' : 'none',
                    }}
                  >
                    {step === STEPS.length - 1 ? 'Send Message' : 'Continue'}
                    <span>{step === STEPS.length - 1 ? '✦' : '→'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Success State */
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
            >
              <motion.div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-8"
                style={{
                  background: 'rgba(99,102,241,0.15)',
                  border: '1px solid rgba(99,102,241,0.4)',
                  boxShadow: '0 0 60px rgba(99,102,241,0.3)',
                }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                ✦
              </motion.div>
              <h3 className="text-h2 mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
                Message received, {form.name.split(' ')[0]}!
              </h3>
              <p className="text-[var(--color-text-muted)] mb-8 max-w-md mx-auto">
                I&apos;ll get back to you at {form.email} within 4 hours. Looking forward to learning about your project.
              </p>
              <div className="flex items-center justify-center gap-3 text-sm text-[var(--color-text-muted)]">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent-green)] pulse-glow" />
                Response within 4 hours · Mon–Fri · IST
              </div>
            </motion.div>
          )}

          {/* Direct contact */}
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-[var(--color-text-subtle)] mb-4">Prefer direct contact?</p>
            <a
              id="contact-email-link"
              href="mailto:anupamroy.tech@gmail.com"
              className="inline-block text-h3 font-bold transition-all duration-300 hover:opacity-70"
              style={{
                fontFamily: 'var(--font-syne)',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              anupamroy.tech@gmail.com
            </a>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 mt-8">
              {[
                { label: 'GitHub', href: 'https://github.com/anupamroy', icon: 'GH' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/anupamroy', icon: 'LI' },
                { label: 'Twitter', href: 'https://twitter.com/anupamroy', icon: 'X' },
              ].map((social) => (
                <a
                  key={social.label}
                  id={`contact-social-${social.label.toLowerCase()}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-muted)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-accent)';
                    (e.currentTarget as HTMLElement).style.color = 'white';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(99,102,241,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
