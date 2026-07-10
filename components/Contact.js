'use client';
import { motion } from 'framer-motion';

export default function Contact({ data }) {
  const { title, subtitle, text, email, location } = data;

  return (
    <div id="contact" className="div-container bg-[#0a0a0a] w-full px-3 lg:px-0 py-20 pb-32">
      <div className="md:max-w-screen-lg xl:max-w-screen-xl mx-auto px-3">
        
        <div className="flex flex-col justify-center items-center w-full py-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-green text-base xl:text-lg font-medium"
          >
            {title || "Contact Me"}
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-white text-3xl md:text-5xl lg:text-6xl font-semibold py-4 max-w-3xl leading-tight"
          >
            {subtitle || "Let's create something amazing together!"}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#a0a0a0] text-lg max-w-2xl mt-4 mb-10"
          >
            {text}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 items-center justify-center"
          >
            <a href={`mailto:${email}`} className="px-8 py-4 bg-primary-green text-black font-bold rounded-xl hover:scale-105 transition-transform">
              Say Hello
            </a>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="flex flex-wrap gap-8 justify-center mt-16 text-[#a0a0a0]"
          >
             <div className="flex flex-col items-center gap-2">
                <span className="font-semibold text-primary-white">Email</span>
                <a href={`mailto:${email}`} className="hover:text-primary-green transition-colors">{email}</a>
             </div>
             <div className="flex flex-col items-center gap-2">
                <span className="font-semibold text-primary-white">Location</span>
                <span>{location}</span>
             </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
