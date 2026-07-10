'use client';
import { motion } from 'framer-motion';

export default function Education({ data }) {
  const items = Array.isArray(data) ? data : [];

  if (!items || items.length === 0) return null;

  return (
    <div id="education" className="div-container bg-[#0a0a0a] w-full px-3 lg:px-0 py-20">
      <div className="md:max-w-screen-lg xl:max-w-screen-xl mx-auto px-3">
        
        <div className="flex flex-col justify-center items-center w-full py-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-green text-base xl:text-lg font-medium"
          >
            Education
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-white text-2xl md:text-4xl lg:text-5xl font-semibold py-2"
          >
            Academic Background
          </motion.h2>
        </div>

        <div className="w-full relative mt-8">
          <div className="hidden lg:block absolute left-[33.33%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-green via-primary-green/50 to-transparent transform -translate-x-1/2"></div>
          
          <div className="w-full space-y-12">
            {items.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative"
              >
                <div className="hidden lg:block absolute left-[33.33%] top-2 w-4 h-4 bg-primary-green rounded-full transform -translate-x-[7px]"></div>
                
                <div className="lg:col-span-4 text-left lg:text-right lg:pr-12">
                  <p className="text-primary-white text-base font-medium mb-2">{item.period}</p>
                  <h3 className="text-xl font-bold text-primary-white mb-2">{item.institution}</h3>
                </div>
                
                <div className="lg:col-span-8 lg:pl-8">
                  <h2 className="text-2xl font-bold text-primary-white mb-2">{item.degree}</h2>
                  <p className="text-[#a0a0a0] text-sm mb-4">Grade: {item.score}</p>
                  <div className="space-y-3">
                    <p className="text-[#a0a0a0] text-base leading-relaxed text-justify">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
