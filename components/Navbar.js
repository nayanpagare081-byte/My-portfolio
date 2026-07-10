'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="flex flex-col justify-center items-center ease-linear w-full h-[80px] md:h-[80px] transition-all duration-300 fixed top-0 z-50"
      style={{
        backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="flex justify-between md:max-w-screen-lg xl:max-w-screen-xl items-center w-full mx-auto px-3">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="#home">
              <div className="text-xl font-[700] normal-case text-white tracking-wide">
                <AnimatedText text="Nayan Pagare" />
              </div>
            </a>
          </motion.div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:block">
          <nav className="space-x-8 flex justify-between gap-x-6 text-white">
            {['Home', 'About', 'Projects', 'Experience', 'Skills', 'Activities', 'Contact'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <a href={`#${item === 'Activities' ? 'achievements' : item.toLowerCase()}`}>
                  <div className="text-[14px] font-[600] uppercase text-white tracking-wider">
                    <AnimatedText text={item} />
                  </div>
                </a>
              </motion.div>
            ))}
          </nav>
        </div>
        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center z-50">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white focus:outline-none p-2"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col justify-center items-start pl-8 space-y-8 h-screen w-full"
        >
          {['Home', 'About', 'Projects', 'Experience', 'Skills', 'Activities', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item === 'Activities' ? 'achievements' : item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-4xl font-extrabold uppercase tracking-wide hover:text-primary-green transition-colors"
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
