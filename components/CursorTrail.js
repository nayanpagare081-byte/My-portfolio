'use client';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorTrail() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <motion.div
        className="jelly-blob fixed left-0 top-0 rounded-full z-[999] pointer-events-none border-2 border-primary-green"
        style={{
          width: 50,
          height: 50,
          backdropFilter: 'invert(100%)',
          translateX: '-50%',
          translateY: '-50%',
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-black z-[1000] pointer-events-none"
        style={{
          translateX: '-50%',
          translateY: '-50%',
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
}
