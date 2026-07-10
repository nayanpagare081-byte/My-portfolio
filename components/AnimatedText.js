'use client';
import { motion } from 'framer-motion';

export default function AnimatedText({ text }) {
  return (
    <motion.div
      className="relative block overflow-hidden whitespace-nowrap hover:text-primary-green"
      initial="initial"
      whileHover="hover"
      style={{ lineHeight: '1.5em' }}
    >
      <div>
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              initial: { y: 0 },
              hover: { y: '-100%' }
            }}
            transition={{ duration: 0.25, ease: 'easeInOut', delay: i * 0.02 }}
            style={{ minWidth: char === ' ' ? '0.25em' : 'auto' }}
          >
            {char}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              initial: { y: '100%' },
              hover: { y: 0 }
            }}
            transition={{ duration: 0.25, ease: 'easeInOut', delay: i * 0.02 }}
            style={{ minWidth: char === ' ' ? '0.25em' : 'auto' }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
