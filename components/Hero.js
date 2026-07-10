'use client';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Hero({ data, email }) {
  if (!data) return null;
  const { name, role, shortBio, photoUrl, socialLinks } = data;
  const linkedinUrl = socialLinks?.linkedin || data.linkedinUrl;
  const githubUrl = socialLinks?.github || data.githubUrl;
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState('normal');

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous) {
      setScrollDirection('normal'); // Scrolling down, go left
    } else if (latest < previous) {
      setScrollDirection('reverse'); // Scrolling up, go right
    }
  });

  return (
    <div id="home" className="div-container flex md:flex-row flex-col relative group md:max-w-screen-lg xl:max-w-screen-2xl mx-auto">
      <div className="md:max-w-screen-lg xl:max-w-screen-xl mx-auto px-3">
        <div className="flex md:flex-col lg:flex-row sm:flex-col flex-col w-full items-center justify-center lg:justify-between h-full pt-32 pb-24 lg:px-0 px-3">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-full sm:max-w-full md:max-w-full lg:max-w-[60%] w-full flex flex-col lg:justify-start justify-center lg:text-left text-center md:gap-y-4 ml-[0rem] xl:ml-[-2.5rem]"
          >
            <div className="mx-auto lg:mx-0 w-fit inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-dashed border-primary-green/50 bg-[#0a0a0a]/20">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-green"></span>
              <span className="text-sm sm:text-base font-semibold text-primary-white">Open to work</span>
            </div>
            
            <h2 className="text-lg md:text-2xl font-bold text-[#a0a0a0] mt-4 lg:mt-0">Hi There,</h2>
            <h1 className="sm:text-5xl text-5xl lg:text-7xl xl:text-[80px] font-bold tracking-tight break-words">
              I am <span className="text-primary-green">{name?.split(' ')[0]}</span>
            </h1>
            <h3 className="sm:text-5xl text-5xl lg:text-7xl xl:text-[80px] font-bold tracking-tight break-words mt-1 lg:mt-0">
              {role}
            </h3>
            
            <p className="text-lg lg:text-xl lg:text-left text-center text-justify lg:mx-0 mx-auto max-w-[500px] text-[#a0a0a0] tracking-wide mt-6 font-medium">
              {shortBio}
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 xl:gap-x-6 lg:justify-start justify-center items-center mt-8 z-10"
            >
              <a href="#projects" className="border text-lg font-semibold hover:bg-primary-white hover:text-black transition-all ease-in-out duration-300 border-[#a0a0a0]/30 rounded-xl py-3 px-8 text-primary-white bg-transparent">
                See Work
              </a>
              <a href="/resume.pdf" download>
                <button className="text-[#a0a0a0] text-lg font-semibold hover:text-primary-white ease-in-out duration-300 transition-all px-4">
                  Download CV
                </button>
              </a>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[40%] mt-8 lg:mt-0 lg:ml-0 xl:ml-0 lg:pl-10"
          >
            <div className="w-full max-w-[750px] aspect-square overflow-hidden rounded-xl border border-[#a0a0a0]/20 relative">
               {/* Profile Image */}
               {photoUrl ? (
                 <img src={photoUrl} alt={name} className="w-full h-full object-cover object-top transition-all duration-500" />
               ) : (
                 <div className="w-full h-full bg-[#111] flex items-center justify-center text-[100px] font-bold text-[#222]">
                   {name?.substring(0, 2).toUpperCase()}
                 </div>
               )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Socials */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="fixed top-[50%] -translate-y-1/2 right-4 xl:right-7 xl:block hidden z-40"
      >
        <div className="flex flex-col items-center gap-y-4">
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="bg-[#a0a0a0]/10 hover:bg-primary-white/30 ease-linear duration-200 transition-all rounded-lg text-[#a0a0a0] flex flex-col justify-center items-center p-3">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="28" width="28" xmlns="http://www.w3.org/2000/svg"><path d="M8 19h-3v-10h3v10zm11 0h-3v-5.342c0-1.392-.496-2.085-1.479-2.085-.779 0-1.273.388-1.521 1.165v6.262h-3s.04-9 0-10h2.368l.183 2h.062c.615-1 1.598-1.678 2.946-1.678 1.025 0 1.854.285 2.487 1.001.637.717.954 1.679.954 3.03v5.647z"></path><ellipse cx="6.5" cy="6.5" rx="1.55" ry="1.5"></ellipse></svg>
          </a>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="bg-[#a0a0a0]/10 hover:bg-primary-white/30 ease-linear duration-200 transition-all rounded-lg text-[#a0a0a0] flex flex-col justify-center items-center p-3">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
          </a>
          {email && (
            <a href={email.includes('@') && !email.startsWith('http') && !email.startsWith('mailto:') ? `mailto:${email}` : email} target="_blank" rel="noopener noreferrer" className="bg-[#a0a0a0]/10 hover:bg-primary-white/30 ease-linear duration-200 transition-all rounded-lg text-[#a0a0a0] flex flex-col justify-center items-center p-3">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
