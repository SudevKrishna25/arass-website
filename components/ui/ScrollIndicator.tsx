'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function ScrollIndicator({ onClick }: { onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 1 }}
      className="group flex flex-col items-center gap-3 cursor-pointer text-secondary-text hover:text-electric-cyan transition-colors duration-300 focus:outline-none"
      aria-label="Scroll to enter ARASS"
    >
      <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">
        SCROLL TO ENTER ARASS
      </span>
      <div className="relative w-5 h-8 rounded-full border border-ocean-blue group-hover:border-electric-cyan flex items-center justify-center p-1 transition-colors duration-300 shadow-inner-glow">
        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-1 h-2 rounded-full bg-electric-cyan shadow-[0_0_8px_#00D4FF]"
        />
      </div>
      <ChevronDown className="w-4 h-4 text-electric-cyan/60 animate-bounce group-hover:text-electric-cyan transition-colors" />
    </motion.button>
  );
}
