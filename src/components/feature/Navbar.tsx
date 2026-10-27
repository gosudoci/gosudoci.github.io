import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { scrollToTarget } from '@/components/base/smoothScroll';

const navLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'Personal', href: '#gallery' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // 검은 섹션(Experience · Contact) 위에 오면 메뉴바도 검게
      setDark(
        ['experience', 'contact'].some((id) => {
          const rect = document.getElementById(id)?.getBoundingClientRect();
          return !!rect && rect.top <= 40 && rect.bottom > 40;
        })
      );
      // 지금 보고 있는 섹션 메뉴를 진하게
      let current = '';
      navLinks.forEach((link) => {
        const el = document.querySelector(link.href);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = link.href;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollToTarget(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition duration-500 ${
        dark ? 'bg-app-black text-white' : scrolled ? 'bg-white text-app-black' : 'bg-transparent text-app-black'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Name */}
          <Link
            to="/"
            className="text-sm md:text-base font-montserrat font-medium tracking-[0.15em] hover-underline cursor-pointer"
            onClick={() => scrollToTarget(0)}
          >
            DESIGN PORTFOLIO
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`text-sm transition-colors duration-300 hover-underline cursor-pointer ${
                  active === link.href
                    ? 'font-medium opacity-100'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-9 h-9 flex items-center justify-center cursor-pointer"
            aria-label="Toggle menu"
          >
            <i className={`ri-${mobileOpen ? 'close' : 'menu'}-line text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ${
          mobileOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className="bg-white px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="px-3 py-3 text-sm text-app-gray hover:text-app-black transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}