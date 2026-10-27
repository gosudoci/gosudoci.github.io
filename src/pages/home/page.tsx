import { useEffect } from 'react';
import Navbar from '@/components/feature/Navbar';
import Hero from '@/pages/home/components/Hero';
import Experience from '@/pages/home/components/Experience';
import Gallery from '@/pages/home/components/Gallery';
import Skills from '@/pages/home/components/Skills';
import Contact from '@/pages/home/components/Contact';
import { startSmoothScroll } from '@/components/base/smoothScroll';

export default function Home() {
  // 부드러운 관성 스크롤
  useEffect(() => startSmoothScroll(), []);

  // Scroll reveal animation via Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white text-app-black">
      <Navbar />
      <main>
        {/* Hero 는 제자리에 멈춰 있고, 그 위로 검은 Experience 가 올라와 덮음 */}
        <div className="relative">
          <Hero />
          <Experience />
        </div>

        {/* Section 03: Personal Works Gallery */}
        <Gallery />

      </main>

      {/* Skills 는 제자리에 멈춰 있고, 그 위로 Contact 가 올라와 덮음 */}
      <div className="relative">
        <Skills />
        <Contact />
      </div>
    </div>
  );
}