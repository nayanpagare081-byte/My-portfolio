'use client';
import { motion } from 'framer-motion';

export default function Experience({ data }) {
  const professional = data?.professional || [];
  const college = data?.college || [];
  const timeline = [...professional, ...college];

  return (
    <div id="experience" className="div-container bg-[#0a0a0a] w-full px-3 lg:px-0 py-20">
      <div className="md:max-w-screen-lg xl:max-w-screen-xl mx-auto px-3">
        <div className="flex flex-col w-full justify-center items-center text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-green text-lg font-medium"
          >
            My Journey
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-white text-3xl md:text-5xl font-semibold py-3"
          >
            Experience
          </motion.h2>
        </div>

        <div className="w-full relative">
          {/* Vertical Line */}
          <div className="hidden lg:block absolute left-[33.33%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-green via-primary-green/50 to-transparent transform -translate-x-1/2"></div>
          
          <div className="w-full space-y-12">
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative"
              >
                {/* Timeline Dot */}
                <div className="hidden lg:block absolute left-[33.33%] top-2 w-4 h-4 bg-primary-green rounded-full transform -translate-x-[7px]"></div>
                
                {/* Left Side (Date & Company) */}
                <div className="lg:col-span-4 text-left lg:text-right lg:pr-12">
                  <p className="text-primary-white text-base font-medium mb-2">{item.dateRange}</p>
                  <h3 className="text-xl font-bold text-primary-white mb-2">{item.organization}</h3>
                  <p className="text-[#a0a0a0] text-sm mb-1">{item.location}</p>
                  
                  {index === 0 && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-primary-green rounded-full mt-2 lg:mt-0 lg:ml-auto lg:mr-0 mr-auto w-fit">
                      <span className="w-2 h-2 bg-primary-green rounded-full animate-pulse"></span>
                      <span className="text-primary-green text-sm font-medium">working</span>
                    </div>
                  )}
                </div>
                
                {/* Right Side (Role & Description) */}
                <div className="lg:col-span-8 lg:pl-8">
                  <h2 className="text-2xl font-bold text-primary-white mb-4">{item.role}</h2>
                  <div className="space-y-3 mb-4">
                    {item.responsibilities?.map((resp, i) => (
                      <p key={i} className="text-[#a0a0a0] text-base leading-relaxed text-justify">
                        {resp}
                      </p>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.skills?.map((tech, i) => (
                      <span key={i} className="px-4 py-2 border border-primary-green/30 text-primary-green rounded-full text-sm font-medium hover:bg-primary-green/10 transition-all duration-200">
                        {tech}
                      </span>
                    ))}
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
