import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Achievements from '@/components/Achievements';
import Education from '@/components/Education';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IntroScreen from '@/components/IntroScreen';
import CursorTrail from '@/components/CursorTrail';
import ParticleCanvas from '@/components/ParticleCanvas';

async function getPortfolioData() {
  const filePath = path.join(process.cwd(), 'data', 'portfolio.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <main>
      <IntroScreen name={data.hero.name.split(' ')[0].toUpperCase()} />
      <CursorTrail />
      <ParticleCanvas />
      <Navbar />
      <Hero data={data.hero} email={data.about?.email} />
      <About data={data.about} />
      <Skills data={data.skills} />
      <Experience data={data.experience} />
      <Projects data={data.projects} />
      <Achievements data={data.achievements} />
      <Education data={data.education} />
      <Certifications data={data.certifications} />
      <Contact data={data.contact} />
      <Footer data={data.hero} />
    </main>
  );
}
