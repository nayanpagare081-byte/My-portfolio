'use client';
import { motion } from 'framer-motion';

export default function Achievements({ data }) {
  const items = Array.isArray(data) ? data : [];

  if (!items || items.length === 0) return null;

  return (
    <div id="achievements" className="div-container bg-[#0a0a0a] w-full px-3 lg:px-0 py-20">
      <div className="md:max-w-screen-lg xl:max-w-screen-xl mx-auto px-3">
        
        <div className="flex flex-col justify-center items-center w-full py-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-green text-base xl:text-lg font-medium"
          >
            Achievements
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-white text-2xl md:text-4xl lg:text-5xl font-semibold py-2"
          >
            Honors & Awards
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full my-8">
          {items.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-primary-white/10 bg-primary-white/5 p-6 hover:bg-primary-white/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-primary-white">{item.title}</h3>
                  <span className="text-primary-green text-sm font-mono bg-primary-green/10 px-3 py-1 rounded-full">{item.year}</span>
                </div>
                <h4 className="text-[#a0a0a0] font-medium mb-3">{item.organization}</h4>
                <p className="text-secondary-text text-sm leading-relaxed text-[#a0a0a0]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
