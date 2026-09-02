'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroScreen({ name = "NAYAN" }) {
  const [show, setShow] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Hide the intro screen after 3.5 seconds to let the animation play
    const timer = setTimeout(() => {
      setShow(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * canvas.height;
    }
    
    let rainStopped = false;
    const rainTimer = setTimeout(() => {
      rainStopped = true;
    }, 2200); // Stop spawning new rain drops after the name finishes illuminating

    const draw = () => {
      // Black background with slight opacity for fading trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Dark green text for the matrix background
      ctx.fillStyle = '#166534'; // A nice dark/emerald green
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          if (!rainStopped) {
            drops[i] = 0;
          }
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 33);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      clearTimeout(rainTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 bg-black flex items-center justify-center z-[9999] overflow-hidden"
        >
          {/* Matrix Background Canvas */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full opacity-60"
          />
          
          <div className="flex relative z-10">
            {name.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ 
                  opacity: 0, 
                  y: -20,
                  color: 'rgba(255, 255, 255, 0)' 
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  color: [
                    'rgba(255, 255, 255, 0.9)', 
                    '#3ccf91', 
                    'rgba(255, 255, 255, 0.9)'
                  ],
                  textShadow: [
                    '0 0 0px rgba(255,255,255,0)',
                    '0 0 20px #3ccf91, 0 0 40px #3ccf91, 0 0 60px #3ccf91',
                    '0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.5)'
                  ]
                }}
                transition={{
                  opacity: { duration: 0.5, delay: i * 0.2 },
                  y: { type: "spring", stiffness: 100, damping: 10, delay: i * 0.2 },
                  color: { duration: 1.5, delay: i * 0.2, times: [0, 0.4, 1], ease: "easeInOut" },
                  textShadow: { duration: 1.5, delay: i * 0.2, times: [0, 0.4, 1], ease: "easeInOut" }
                }}
                className="text-[60px] sm:text-[100px] md:text-[120px] font-bold"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 900,
                  letterSpacing: '0.05em'
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
