'use client';
import { motion } from 'framer-motion';
import { FiCalendar, FiEye } from 'react-icons/fi';
import { BsBuilding } from 'react-icons/bs';

export default function Events({ data }) {
  const items = Array.isArray(data) ? data : [];

  if (!items || items.length === 0) return null;

  return (
    <div id="events" className="div-container bg-[#0a0a0a] w-full px-3 lg:px-0 py-20">
      <div className="md:max-w-screen-lg xl:max-w-screen-xl mx-auto px-3">
        
        <div className="flex flex-col justify-center items-center w-full py-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-green text-base xl:text-lg font-medium"
          >
            Events & Conferences
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-white text-2xl md:text-4xl lg:text-5xl font-semibold py-2 max-w-4xl leading-tight mx-auto"
          >
            Participated in 25+ Technical Events & Innovation Platforms
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full my-12">
          {items.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 6) * 0.1 }}
              className="group relative rounded-2xl border border-primary-white/10 bg-primary-white/5 p-6 hover:bg-primary-white/10 hover:border-primary-green/50 transition-all flex flex-col"
            >
              {item.link && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="absolute top-4 right-4 flex items-center gap-1.5 text-primary-green opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium"
                >
                  <FiEye /> View
                </a>
              )}
              
              <div className="flex items-start gap-3 mb-4">
                <div className="text-primary-green mt-1 text-lg">
                  <FiCalendar />
                </div>
                <h3 className="text-lg font-bold text-primary-white leading-tight pr-12">
                  {item.title}
                </h3>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="text-[#a0a0a0] text-sm">
                  <BsBuilding />
                </div>
                <p className="text-[#a0a0a0] text-sm font-medium">
                  {item.organization}
                </p>
              </div>
              
              <div className="mt-auto">
                <span className="inline-block px-3 py-1 rounded-full border border-primary-green/30 text-primary-green text-xs font-semibold">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
