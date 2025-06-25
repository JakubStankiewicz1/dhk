import React, { useEffect, useRef } from 'react';
import './homeHero.css';
import assets from '../../assets/assets';
import Lenis from 'lenis';

const HomeHero = () => {
  const leftOneRef = useRef(null);
  const middleOneRef = useRef(null);
  const rightOneRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let scrollProgress = 0;
    const maxScroll = 1000;
    let isAnimating = true;
    let hasCompletedAnimation = false;

    const updateAnimations = (progress) => {
      // Animacja dla lewego zdjęcia (0-333px scrollu)
      if (leftOneRef.current) {
        if (progress <= 333) {
          const translateY = (progress / 333) * -100;
          leftOneRef.current.style.transform = `translateY(${translateY}%)`;
        } else {
          leftOneRef.current.style.transform = 'translateY(-100%)';
        }
      }

      // Animacja dla środkowego zdjęcia (333-666px scrollu)
      if (middleOneRef.current) {
        if (progress > 333 && progress <= 666) {
          const translateY = ((progress - 333) / 333) * -100;
          middleOneRef.current.style.transform = `translateY(${translateY}%)`;
        } else if (progress > 666) {
          middleOneRef.current.style.transform = 'translateY(-100%)';
        } else {
          middleOneRef.current.style.transform = 'translateY(0%)';
        }
      }

      // Animacja dla prawego zdjęcia (666-1000px scrollu)
      if (rightOneRef.current) {
        if (progress > 666 && progress <= 1000) {
          const translateY = ((progress - 666) / 334) * -100;
          rightOneRef.current.style.transform = `translateY(${translateY}%)`;
        } else if (progress > 1000) {
          rightOneRef.current.style.transform = 'translateY(-100%)';
        } else {
          rightOneRef.current.style.transform = 'translateY(0%)';
        }
      }
    };

    const handleWheel = (e) => {
      if (isAnimating && !hasCompletedAnimation) {
        e.preventDefault();
        
        const delta = e.deltaY * 0.08;
        
        // Tylko scroll w dół podczas animacji
        if (e.deltaY > 0) {
          scrollProgress += delta;
          scrollProgress = Math.min(maxScroll, scrollProgress);
          
          updateAnimations(scrollProgress);
          
          // Jeśli osiągnęliśmy maksymalny scroll
          if (scrollProgress >= maxScroll) {
            hasCompletedAnimation = true;
            isAnimating = false;
            
            // Usuwamy fixed positioning i przywracamy normalny scroll
            if (containerRef.current) {
              containerRef.current.querySelector('.homeHeroContainer').style.position = 'relative';
              containerRef.current.querySelector('.homeHeroContainer').style.zIndex = '1';
            }
            
            // Resetujemy scroll position i przywracamy normalny scroll
            setTimeout(() => {
              window.scrollTo(0, 0); // Reset scroll position
              document.body.style.overflow = 'auto';
              window.removeEventListener('wheel', handleWheel);
            }, 100);
          }
        } else if (scrollProgress > 0) {
          // Scroll w górę - cofamy animację
          scrollProgress += delta; // delta jest ujemne
          scrollProgress = Math.max(0, scrollProgress);
          updateAnimations(scrollProgress);
        }
        
        return false;
      }
    };

    // Na początku ustawiamy fixed positioning i blokujemy scroll
    if (containerRef.current) {
      containerRef.current.querySelector('.homeHeroContainer').style.position = 'fixed';
      containerRef.current.querySelector('.homeHeroContainer').style.zIndex = '10';
    }
    document.body.style.overflow = 'hidden';
    
    // Dodajemy event listener
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = 'auto';
      // Resetujemy scroll position
      window.scrollTo(0, 0);
      // Przywracamy normalny positioning
      if (containerRef.current && containerRef.current.querySelector('.homeHeroContainer')) {
        containerRef.current.querySelector('.homeHeroContainer').style.position = 'relative';
        containerRef.current.querySelector('.homeHeroContainer').style.zIndex = '1';
      }
    };
  }, []);

  return (
    <div className='homeHero' ref={containerRef}>
        <div className="homeHeroContainer">
            {/* Left Part */}
            <div className="homeHeroContainerLeft">
                <div className="homeHeroContainerLeftContainer">
                    {/* One */}
                    <div className="homeHeroContainerLeftContainerOne" ref={leftOneRef}>
                        <div className="homeHeroContainerLeftContainerOneContainer">
                            <img src={assets.HomeHeroImgOne} alt="" className='homeHeroContainerLeftContainerOneContainerImg' />
                        </div>
                    </div>

                    {/* Two */}
                    <div className="homeHeroContainerLeftContainerTwo">
                        <div className="homeHeroContainerLeftContainerTwoContainer">
                            <img src={assets.HomeHeroImgTwo} alt="" className='homeHeroContainerLeftContainerTwoContainerImg' />
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Part */}
            <div className="homeHeroContainerMiddle">
                <div className="homeHeroContainerMiddleContainer">
                    {/* One */}
                    <div className="homeHeroContainerMiddleContainerOne" ref={middleOneRef}>
                        <div className="homeHeroContainerMiddleContainerOneContainer">
                            <img src={assets.HomeHeroImgThree} alt="" className='homeHeroContainerMiddleContainerOneContainerImg' />
                        </div>
                    </div>

                    {/* Two */}
                    <div className="homeHeroContainerMiddleContainerTwo">
                        <div className="homeHeroContainerMiddleContainerTwoContainer">
                            <img src={assets.HomeHeroImgFour} alt="" className='homeHeroContainerMiddleContainerTwoContainerImg' />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Part */}
            <div className="homeHeroContainerRight">
                <div className="homeHeroContainerRightContainer">
                    {/* One */}
                    <div className="homeHeroContainerRightContainerOne" ref={rightOneRef}>
                        <div className="homeHeroContainerRightContainerOneContainer">
                            <img src={assets.HomeHeroImgFive} alt="" className='homeHeroContainerRightContainerOneContainerImg' />
                        </div>
                    </div>

                    {/* Two */}
                    <div className="homeHeroContainerRightContainerTwo">
                        <div className="homeHeroContainerRightContainerTwoContainer">
                            <img src={assets.HomeHeroImgSix} alt="" className='homeHeroContainerRightContainerTwoContainerImg' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeHero