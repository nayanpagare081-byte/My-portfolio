'use client';
import { useEffect } from 'react';
import ParticleCanvas from '@/components/ParticleCanvas';
import CursorTrail from '@/components/CursorTrail';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Achievements from '@/components/Achievements';
import Education from '@/components/Education';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function ClientPage({ data }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ParticleCanvas />
      <CursorTrail />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero data={data.hero} />
        <About data={data.about} />
        <Projects data={data.projects} />
        <Experience data={data.experience} />
        <Skills data={data.skills} />
        <Achievements data={data.achievements} />
        <Education data={data.education} />
        <Certifications data={data.certifications} />
        <Contact data={data.contact} />
      </main>
      <Footer data={data.contact} />
    </>
  );
}
