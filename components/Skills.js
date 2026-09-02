'use client';
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { FaPython, FaJava, FaReact, FaHtml5, FaCss3Alt, FaNodeJs } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiCplusplus, SiC, SiNextdotjs, SiTailwindcss, SiExpress, SiGraphql, SiMongodb, SiMysql, SiPostgresql, SiFirebase, SiGit, SiDocker, SiLinux } from 'react-icons/si';

const iconMap = {
  'JavaScript': <SiJavascript className="w-16 h-16 text-[#f7df1e]" />,
  'Python': <FaPython className="w-16 h-16 text-[#3776ab]" />,
  'Java': <FaJava className="w-16 h-16 text-[#007396]" />,
  'C++': <SiCplusplus className="w-16 h-16 text-[#00599c]" />,
  'C': <SiC className="w-16 h-16 text-[#a8b9cc]" />,
  'TypeScript': <SiTypescript className="w-16 h-16 text-[#3178c6]" />,
  'React': <FaReact className="w-16 h-16 text-[#61dafb]" />,
  'Next.js': <SiNextdotjs className="w-16 h-16 text-white" />,
  'HTML5': <FaHtml5 className="w-16 h-16 text-[#e34f26]" />,
  'CSS3': <FaCss3Alt className="w-16 h-16 text-[#1572b6]" />,
  'Tailwind CSS': <SiTailwindcss className="w-16 h-16 text-[#06b6d4]" />,
  'Node.js': <FaNodeJs className="w-16 h-16 text-[#339933]" />,
  'Express.js': <SiExpress className="w-16 h-16 text-white" />,
  'REST APIs': <div className="w-16 h-16 flex items-center justify-center font-bold text-xl text-white">API</div>,
  'GraphQL': <SiGraphql className="w-16 h-16 text-[#e10098]" />,
  'MongoDB': <SiMongodb className="w-16 h-16 text-[#47a248]" />,
  'MySQL': <SiMysql className="w-16 h-16 text-[#4479a1]" />,
  'PostgreSQL': <SiPostgresql className="w-16 h-16 text-[#336791]" />,
  'Firebase': <SiFirebase className="w-16 h-16 text-[#ffca28]" />,
  'Git': <SiGit className="w-16 h-16 text-[#f05032]" />,
  'Docker': <SiDocker className="w-16 h-16 text-[#2496ed]" />,
  'Linux': <SiLinux className="w-16 h-16 text-[#fcc624]" />
};

export default function Skills({ data }) {
  const categories = data?.categories || [];
  const [activeCategory, setActiveCategory] = useState(categories[0]?.name || '');
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState('normal');

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous) {
      setScrollDirection('normal');
    } else if (latest < previous) {
      setScrollDirection('reverse');
    }
  });

  const activeSkills = categories.find(c => c.name === activeCategory)?.skills || [];
  const allSkills = categories.flatMap(cat => cat.skills.map(s => s.name));

  return (
    <div id="skill" className="div-container bg-[#0a0a0a] w-full px-3 lg:px-0 py-20 relative overflow-hidden">
      
      {/* Background Marquee */}
      <div className="absolute top-0 w-full overflow-hidden whitespace-nowrap pointer-events-none select-none flex z-0">
        <div 
          className="animate-marquee scroller text-primary-white/15 inline-flex items-center text-[64px] md:text-[80px] font-bold shrink-0"
          style={{ animationDirection: scrollDirection }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center">
              Tech Stack & Expertise
              <span className="mx-8 flex items-center justify-center">
                <svg width="40" height="41" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0.5L10.1607 6.33927L16 8.5L10.1607 10.6607L8 16.5L5.83927 10.6607L0 8.5L5.83927 6.33927L8 0.5Z" fill="rgb(255 255 255 / 0.05)"></path>
                </svg>
              </span>
              Tech Stack & Expertise
              <span className="mx-8 flex items-center justify-center">
                <svg width="40" height="41" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0.5L10.1607 6.33927L16 8.5L10.1607 10.6607L8 16.5L5.83927 10.6607L0 8.5L5.83927 6.33927L8 0.5Z" fill="rgb(255 255 255 / 0.05)"></path>
                </svg>
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="md:max-w-screen-lg xl:max-w-screen-xl mx-auto px-3 relative z-10">
        
        <div className="flex flex-col justify-center items-center w-full py-8 text-center mt-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-green text-sm xl:text-base font-bold uppercase tracking-widest"
          >
            My Skills
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-white text-3xl md:text-4xl lg:text-5xl font-bold py-2 mt-2"
          >
            Technologies & Tools
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-1 bg-primary-green mt-2 rounded-full"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#a0a0a0] text-base md:text-lg mt-6 max-w-2xl"
          >
            I work with modern technologies and tools to build scalable, performant applications.
          </motion.p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveCategory(category.name)}
              className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all ${
                activeCategory === category.name 
                  ? 'bg-primary-green text-black' 
                  : 'bg-transparent border border-primary-white/10 text-primary-white hover:border-primary-white/30'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {activeSkills.map((item, index) => (
              <motion.div 
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-primary-white/10 bg-[#111] p-6 md:p-8 flex flex-col items-center justify-center gap-6 hover:bg-[#1a1a1a] transition-all group"
              >
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {iconMap[item.name] || (
                    <div className="w-16 h-16 bg-[#222] rounded-xl flex items-center justify-center text-primary-green font-bold text-2xl">
                      {item.icon || item.name.substring(0, 1)}
                    </div>
                  )}
                </div>
                <p className="text-primary-white font-bold text-base md:text-lg text-center">
                  {item.name}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-4 mt-12 w-full overflow-hidden">
        {/* Marquee 1 */}
        <div className="relative flex overflow-x-hidden group">
          <div className="py-2 animate-marquee whitespace-nowrap flex gap-4">
            {[...allSkills, ...allSkills].map((skill, index) => (
              <span key={index} className="px-6 py-3 rounded-full border border-primary-white/10 bg-[#111] text-primary-white/80 font-medium whitespace-nowrap">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        {/* Marquee 2 - Reverse */}
        <div className="relative flex overflow-x-hidden group">
          <div className="py-2 animate-marquee-reverse whitespace-nowrap flex gap-4">
            {[...allSkills, ...allSkills].reverse().map((skill, index) => (
              <span key={index} className="px-6 py-3 rounded-full border border-primary-white/10 bg-[#111] text-primary-white/80 font-medium whitespace-nowrap">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
