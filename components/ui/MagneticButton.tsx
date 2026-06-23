'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  id?: string;
  style?: React.CSSProperties;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  onClick,
  href,
  id,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    };

    const handleLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [x, y, strength]);

  const Tag = href ? 'a' : 'button';

  return (
    <div ref={ref} className="inline-block">
      <motion.div style={{ x: springX, y: springY }}>
        <Tag
          id={id}
          href={href}
          onClick={onClick}
          className={className}
          style={{ display: 'inline-flex', ...style }}
        >
          {children}
        </Tag>
      </motion.div>
    </div>
  );
}
