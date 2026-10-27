import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Forces every route navigation to start at the top of the page.
 * Uses an instant jump so it doesn't fight the global smooth-scroll CSS.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Temporarily disable smooth scrolling so navigation snaps to top.
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  }, [pathname]);

  return null;
}