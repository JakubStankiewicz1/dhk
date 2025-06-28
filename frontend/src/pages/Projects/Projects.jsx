import React, { useEffect } from 'react';
import './projects.css';
import ProjectsNavbar from '../../components/ProjectsNavbar/ProjectsNavbar';
import ProjectsHero from '../../components/ProjectsHero/ProjectsHero';
import ProjectsElements from '../../components/ProjectsElements/ProjectsElements';
import ProjectsFotter from '../../components/ProjectsFotter/ProjectsFotter';

const Projects = () => {
  // Tymczasowo wyłączony dla debugowania animacji elementów
  /*
  useEffect(() => {
    // Ultra smooth scroll implementation
    let isScrolling = false;
    let scrollTimeout;
    
    const smoothScrollHandler = (e) => {
      if (!isScrolling) {
        isScrolling = true;
        
        // Clear any existing timeout
        clearTimeout(scrollTimeout);
        
        // Add momentum and easing to scroll
        const currentScrollY = window.scrollY;
        const targetScrollY = currentScrollY + (e.deltaY * 0.01); // Slow down by 70%
        
        // Smooth scroll animation
        const scrollStep = (timestamp) => {
          const progress = Math.min(timestamp / 1100, 1); // 800ms duration
          const easeOutCubic = 1 - Math.pow(1 - progress, 3);
          
          window.scrollTo({
            top: currentScrollY + (targetScrollY - currentScrollY) * easeOutCubic,
            behavior: 'auto'
          });
          
          if (progress < 1) {
            requestAnimationFrame(scrollStep);
          } else {
            isScrolling = false;
          }
        };
        
        requestAnimationFrame(scrollStep);
        
        // Prevent default scroll
        e.preventDefault();
        
        // Reset scrolling flag after delay
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 10000);
      }
    };
    
    // Add custom scroll listener
    window.addEventListener('wheel', smoothScrollHandler, { passive: false });
    
    // Also add touch scroll for mobile
    let startY = 0;
    const touchStart = (e) => {
      startY = e.touches[0].clientY;
    };
    
    const touchMove = (e) => {
      const currentY = e.touches[0].clientY;
      const deltaY = (startY - currentY) * 0.5; // Slow down touch scroll too
      
      window.scrollBy({
        top: deltaY,
        behavior: 'smooth'
      });
      
      startY = currentY;
      e.preventDefault();
    };
    
    window.addEventListener('touchstart', touchStart, { passive: false });
    window.addEventListener('touchmove', touchMove, { passive: false });
    
    // Cleanup
    return () => {
      window.removeEventListener('wheel', smoothScrollHandler);
      window.removeEventListener('touchstart', touchStart);
      window.removeEventListener('touchmove', touchMove);
      clearTimeout(scrollTimeout);
    };
  }, []);
  */

  return (
    <div className="projects-page">
        <ProjectsNavbar />
        <ProjectsHero />
        <ProjectsElements />
        <ProjectsFotter />
    </div>
  )
}

export default Projects