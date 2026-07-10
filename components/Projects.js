'use client';
import { motion } from 'framer-motion';

export default function Projects({ data }) {
  const projects = Array.isArray(data) ? data : [];

  if (!projects || projects.length === 0) return null;

  return (
    <div id="projects" className="div-container bg-[#0a0a0a] w-full px-3 lg:px-0">
      <div className="md:max-w-screen-lg xl:max-w-screen-xl mx-auto px-3">
        <div className="h-full w-full flex flex-col md:mt-12 mt-10 lg:mt-12 lg:px-0 md:px-0 px-3">
          
          <div className="flex flex-col justify-center items-center w-full py-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-green text-base xl:text-lg font-medium"
          >
            Projects
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-white text-2xl md:text-4xl lg:text-5xl font-semibold py-2"
          >
            Selected Works
          </motion.h2>
        </div>

          <div className="flex flex-col gap-32 w-full">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  {/* Text Content */}
                  <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-2'}`}>
                    <div className="flex flex-col gap-4">
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-primary-green font-mono text-sm">&lt;</span>
                        <h3 className="text-2xl lg:text-4xl font-bold text-primary-white">{project.title || project.name}</h3>
                        <span className="text-primary-green font-mono text-sm">&gt;</span>
                      </div>
                      
                      <p className="text-primary-green text-lg font-medium italic">{project.subtitle || project.type}</p>
                      
                      <p className="text-secondary-text text-base lg:text-lg leading-relaxed text-[#a0a0a0]">
                        {project.description}
                      </p>
                      
                      <div className="mt-4">
                        <h4 className="text-primary-white font-semibold mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {project.features?.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-start gap-2 text-[#a0a0a0]">
                              <span className="text-primary-green mt-1">+</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tech?.map((tech, tIndex) => (
                          <span key={tIndex} className="px-3 py-1.5 bg-[#1a1a1a] border border-primary-green/30 text-primary-green rounded-full text-sm font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4 mt-6">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <button className="bg-[#1a1a1a] border border-primary-white/20 text-white hover:bg-primary-green hover:border-primary-green hover:scale-105 ease-in-out duration-200 transition-all rounded-lg px-6 py-3 flex items-center gap-2">
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                              <span className="font-medium">GitHub</span>
                            </button>
                          </a>
                        )}
                        {(project.liveUrl || project.demoUrl) && (
                          <a href={project.liveUrl || project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <button className="bg-primary-green border border-primary-green text-black hover:scale-105 ease-in-out duration-200 transition-all rounded-lg px-6 py-3 flex items-center gap-2 font-medium">
                              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                              <span>Live Demo</span>
                            </button>
                          </a>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* Image Grid */}
                  <div className={`lg:col-span-7 ${isEven ? '' : 'lg:order-1'}`}>
                    <div className="relative w-full">
                      <div className="relative bg-gradient-to-br from-primary-green/20 to-primary-gray/20 rounded-3xl p-6 lg:p-8">
                        <div className="bg-[#111] w-full aspect-video rounded-2xl overflow-hidden border border-primary-white/10 shadow-2xl flex items-center justify-center relative">
                          {project.imageUrl ? (
                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[#333] font-bold text-xl">Project Image</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
