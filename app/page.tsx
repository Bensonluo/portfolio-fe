import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
