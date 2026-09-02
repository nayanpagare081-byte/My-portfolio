'use client';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';

export default function About({ data }) {
  const { title, subtitle, paragraphs, stats } = data;

  const [scrollDirection, setScrollDirection] = useState('normal');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous) {
      setScrollDirection('normal');
    } else if (latest < previous) {
      setScrollDirection('reverse');
    }
  });

  return (
    <div id="about" className="div-container bg-[#0a0a0a] w-full px-3 lg:px-0 py-20 relative overflow-hidden">
      
      {/* Background Marquee */}
      <div className="absolute -top-6 w-full overflow-hidden whitespace-nowrap pointer-events-none select-none flex z-0">
        <div 
          className="animate-marquee scroller text-primary-white/15 inline-flex items-center text-[64px] md:text-[80px] font-bold shrink-0"
          style={{ animationDirection: scrollDirection }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="mx-4 inline-flex items-center">
              AI/ML Engineer & Innovator
              <span className="mx-8 inline-flex items-center justify-center">
                <svg width="40" height="41" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0.5L10.1607 6.33927L16 8.5L10.1607 10.6607L8 16.5L5.83927 10.6607L0 8.5L5.83927 6.33927L8 0.5Z" fill="rgb(255 255 255 / 0.05)"></path>
                </svg>
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="md:max-w-screen-lg xl:max-w-screen-xl mx-auto px-3 relative z-10">
        <div className="flex flex-col justify-center items-center w-full py-8 mt-4 text-center">
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-primary-green text-sm xl:text-base font-bold w-full uppercase tracking-widest"
          >
            About Me
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-primary-white text-center text-3xl md:text-4xl lg:text-5xl font-bold py-2 mt-2"
          >
            Unveiling the Layers of My Story
          </motion.h2>          <div className="w-full flex lg:flex-row flex-col lg:gap-y-0 gap-y-4 md:gap-x-0 gap-x-0 lg:gap-x-4 justify-between mt-4 lg:mt-12">
            
            {/* Image Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-[32%] flex lg:justify-start lg:items-start justify-center items-center"
            >
              <div className="w-full max-w-[320px] aspect-[4/5] bg-[#111] border border-[#333] rounded-xl flex items-center justify-center overflow-hidden relative">
                <Image 
                  src={(data.photoUrl && (data.photoUrl.startsWith('/') || data.photoUrl.startsWith('http'))) ? data.photoUrl : "/profile.jpg"} 
                  alt="Profile"
                  fill
                  className="object-cover transition-all duration-500"
                />
              </div>
            </motion.div>

            {/* Text & Stats Section */}
            <div className="w-full lg:w-[66%] flex flex-col justify-start items-start">
              {data.bio?.map((p, i) => (
                <motion.p 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-base text-[#a0a0a0] font-medium leading-relaxed text-justify mb-4"
                >
                  {p}
                </motion.p>
              ))}

              <div className="flex flex-wrap gap-8 w-full mt-6">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                    className="flex flex-col"
                  >
                    <p className="text-3xl font-bold text-primary-white">{stat.value}</p>
                    <p className="text-[#a0a0a0] text-sm font-normal mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
