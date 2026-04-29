"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AnimatedFilament({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg
      className={className}
      viewBox="0 0 1200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="filamentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
          <stop offset="35%" stopColor="#22d3ee" stopOpacity="1" />
          <stop offset="65%" stopColor="#4ade80" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fb923c" stopOpacity="0.35" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.path
        d="M-40 120 C 120 40, 280 180, 440 100 S 720 20, 900 90 S 1080 140, 1280 80"
        stroke="url(#filamentGrad)"
        strokeWidth={reduce ? 1.5 : 2.5}
        strokeLinecap="round"
        filter={reduce ? undefined : "url(#glow)"}
        fill="none"
        initial={{ pathLength: 0, opacity: 0.5 }}
        animate={
          reduce
            ? { pathLength: 1, opacity: 0.7 }
            : {
                pathLength: [0, 1, 1],
                opacity: [0.4, 1, 0.6],
              }
        }
        transition={
          reduce
            ? { duration: 0.6 }
            : {
                pathLength: {
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                opacity: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              }
        }
      />
      {!reduce && (
        <circle r="6" fill="#22d3ee" filter="url(#glow)">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M-40 120 C 120 40, 280 180, 440 100 S 720 20, 900 90 S 1080 140, 1280 80"
          />
        </circle>
      )}
    </svg>
  );
}
