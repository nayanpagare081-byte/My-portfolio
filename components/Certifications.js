'use client';
import { motion } from 'framer-motion';

export default function Certifications({ data }) {
  const items = Array.isArray(data) ? data : [];

  if (!items || items.length === 0) return null;

  return (
    <div id="certifications" className="div-container bg-[#0a0a0a] w-full px-3 lg:px-0 py-20">
      <div className="md:max-w-screen-lg xl:max-w-screen-xl mx-auto px-3">
        
        <div className="flex flex-col justify-center items-center w-full py-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-green text-base xl:text-lg font-medium"
          >
            Certifications
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-white text-2xl md:text-4xl lg:text-5xl font-semibold py-2"
          >
            Licenses & Certifications
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full my-8">
          {items.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-primary-white/10 bg-primary-white/5 p-6 hover:bg-primary-white/10 transition-all"
            >
              <h3 className="text-xl font-bold text-primary-white mb-2">{item.name}</h3>
              <h4 className="text-primary-green font-medium mb-2">{item.issuer}</h4>
              <p className="text-[#a0a0a0] text-sm mb-4">Issued: {item.date}</p>
              {item.credentialUrl && (
                <a href={item.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary-white hover:text-primary-green transition-colors inline-flex items-center gap-1">
                  Show Credential
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
