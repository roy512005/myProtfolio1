'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { COLLABORATORS } from '@/lib/constants';
import { staggerContainer, fadeUpVariant } from '@/lib/animations';
import type { Collaborator } from '@/lib/types';

const TYPE_COLORS: Record<Collaborator['type'], string> = {
  agency: '#F59E0B',
  designer: '#06B6D4',
  freelancer: '#F8F8FF',
  founder: '#EC4899',
};

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const TYPE_LABELS: Record<Collaborator['type'], string> = {
  agency: 'Agency',
  designer: 'Designer',
  freelancer: 'Freelancer',
  founder: 'Founder',
};

interface NodePosition {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function CollaborationNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<Collaborator | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const nodesRef = useRef<NodePosition[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const CX = W / 2;
    const CY = H / 2;

    // Initialize node positions in a rough circle
    nodesRef.current = COLLABORATORS.map((c, i) => {
      const angle = (i / COLLABORATORS.length) * Math.PI * 2;
      const radius = Math.min(W, H) * 0.3 + (Math.random() - 0.5) * 60;
      return {
        id: c.id,
        x: CX + Math.cos(angle) * radius,
        y: CY + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      };
    });

    const getColor = (id: string) => {
      const c = COLLABORATORS.find((col) => col.id === id);
      return c ? TYPE_COLORS[c.type] : '#fff';
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);

      // Update positions (gentle spring toward original positions)
      nodesRef.current.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        // Boundary bounce
        if (node.x < 60 || node.x > W - 60) node.vx *= -1;
        if (node.y < 60 || node.y > H - 60) node.vy *= -1;
        // Friction
        node.vx *= 0.995;
        node.vy *= 0.995;
      });

      // Draw edges
      nodesRef.current.forEach((node) => {
        const col = COLLABORATORS.find((c) => c.id === node.id);
        if (!col) return;

        ctx.beginPath();
        ctx.moveTo(CX, CY);
        ctx.lineTo(node.x, node.y);

        const grad = ctx.createLinearGradient(CX, CY, node.x, node.y);
        grad.addColorStop(0, 'rgba(99,102,241,0.4)');
        grad.addColorStop(1, 'rgba(99,102,241,0)');
        ctx.strokeStyle = grad;

        // Animated dash
        ctx.setLineDash([4, 6]);
        ctx.lineDashOffset = -(t / 30);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw center node (Anik)
      const glow = ctx.createRadialGradient(CX, CY, 0, CX, CY, 30);
      glow.addColorStop(0, 'rgba(99,102,241,0.8)');
      glow.addColorStop(1, 'rgba(99,102,241,0)');
      ctx.beginPath();
      ctx.arc(CX, CY, 30, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(CX, CY, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#6366F1';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 9px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('AR', CX, CY);

      // Draw collaborator nodes
      nodesRef.current.forEach((node) => {
        const color = getColor(node.id);

        // Glow
        const nodeGlow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 20);
        nodeGlow.addColorStop(0, hexToRgba(color, 0.3));
        nodeGlow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = nodeGlow;
        ctx.fill();

        // Node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'var(--color-surface)';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let hit: Collaborator | null = null;
      nodesRef.current.forEach((node) => {
        const dx = mx - node.x;
        const dy = my - node.y;
        if (Math.sqrt(dx * dx + dy * dy) < 16) {
          hit = COLLABORATORS.find((c) => c.id === node.id) || null;
          setTooltipPos({ x: e.clientX, y: e.clientY });
        }
      });
      setHoveredNode(hit);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      id="collaboration-network"
      className="section-wrapper"
      style={{ borderTop: '1px solid var(--color-border)' }}
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
            Collaboration Network
          </motion.div>
          <motion.h2
            variants={fadeUpVariant}
            className="text-h1 mb-4"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            I don&apos;t work alone.{' '}
            <span className="gradient-text-gold">I work within</span>
            <br />an ecosystem.
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-body-lg text-[var(--color-text-muted)] max-w-xl mx-auto">
            Trusted relationships with agencies, designers, founders, and engineers across 4 continents.
          </motion.p>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {Object.entries(TYPE_LABELS).map(([type, label]) => (
            <div key={type} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: TYPE_COLORS[type as Collaborator['type']], boxShadow: `0 0 8px ${TYPE_COLORS[type as Collaborator['type']]}` }}
              />
              <span className="text-label text-[var(--color-text-muted)]">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Canvas */}
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          style={{
            height: '500px',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />

          {/* Center label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div
              className="w-28 h-28 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
              }}
            />
          </div>
        </motion.div>

        {/* Tooltip */}
        {hoveredNode && (
          <div
            className="fixed z-50 pointer-events-none glass-card rounded-xl px-4 py-3 text-sm"
            style={{
              left: tooltipPos.x + 16,
              top: tooltipPos.y - 40,
              border: `1px solid ${TYPE_COLORS[hoveredNode.type]}40`,
              boxShadow: `0 0 20px ${TYPE_COLORS[hoveredNode.type]}20`,
            }}
          >
            <div className="font-semibold text-[var(--color-text)]" style={{ fontFamily: 'var(--font-syne)' }}>
              {hoveredNode.name}
            </div>
            <div className="text-[var(--color-text-muted)] text-xs mt-0.5">{hoveredNode.role}</div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: TYPE_COLORS[hoveredNode.type] }}
              />
              <span style={{ color: TYPE_COLORS[hoveredNode.type], fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {TYPE_LABELS[hoveredNode.type]}
              </span>
              <span className="text-[var(--color-text-subtle)] text-xs ml-1">· {hoveredNode.location}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
