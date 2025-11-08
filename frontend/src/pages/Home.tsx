import SocialLinks from '@/components/common/SocialLinks';
import Footer from '@/components/layout/Footer';
import { Hero } from '@/components/sections';
import Contact from '@/components/sections/Contact';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';

export default function Home() {
  return (
    <div className="bg-bg-dark">
      {/* Hero Section */}
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <SocialLinks />
      <Footer />
    </div>
    
  );
}
