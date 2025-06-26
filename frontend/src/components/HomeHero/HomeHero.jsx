import React, { useEffect, useRef } from 'react';
import './homeHero.css';
import assets from '../../assets/assets';

const HomeHero = () => {
  const leftOneRef = useRef(null);
  const middleOneRef = useRef(null);
  const rightOneRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let scrollProgress = 0;
    const maxScroll = 400;
    let isAnimating = true;
    let hasCompletedAnimation = false;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = '0';
    document.body.style.left = '0';
    document.body.style.right = '0';
    
    document.body.classList.add('hero-animating');

    const updateAnimations = (progress) => {
      if (leftOneRef.current) {
        if (progress <= 200) {
          const translateY = (progress / 200) * -100;
          leftOneRef.current.style.transform = `translateY(${translateY}%)`;
        } else {
          leftOneRef.current.style.transform = 'translateY(-100%)';
        }
      }

      if (middleOneRef.current) {
        if (progress > 100 && progress <= 300) {
          const translateY = ((progress - 100) / 200) * -100;
          middleOneRef.current.style.transform = `translateY(${translateY}%)`;
        } else if (progress > 300) {
          middleOneRef.current.style.transform = 'translateY(-100%)';
        } else {
          middleOneRef.current.style.transform = 'translateY(0%)';
        }
      }

      if (rightOneRef.current) {
        if (progress > 200 && progress <= 400) {
          const translateY = ((progress - 200) / 200) * -100;
          rightOneRef.current.style.transform = `translateY(${translateY}%)`;
        } else if (progress > 400) {
          rightOneRef.current.style.transform = 'translateY(-100%)';
        } else {
          rightOneRef.current.style.transform = 'translateY(0%)';
        }
      }
    };

    const handleWheel = (e) => {
      if (isAnimating && !hasCompletedAnimation) {
        e.preventDefault();
        e.stopPropagation();
        
        const delta = e.deltaY * 0.12;
        
        if (e.deltaY > 0) {
          scrollProgress += delta;
          scrollProgress = Math.min(maxScroll, scrollProgress);
          
          updateAnimations(scrollProgress);
          
          if (scrollProgress >= maxScroll) {
            hasCompletedAnimation = true;
            isAnimating = false;
            
            setTimeout(() => {
              document.body.classList.remove('hero-animating');
              
              document.body.style.transition = 'all 0.3s ease';
              document.body.style.overflow = '';
              document.body.style.position = '';
              document.body.style.top = '';
              document.body.style.left = '';
              document.body.style.right = '';
              
              setTimeout(() => {
                document.body.style.transition = '';
                window.scrollTo({
                  top: 60,
                  behavior: 'smooth'
                });
              }, 300);
              
              window.removeEventListener('wheel', handleWheel);
              window.removeEventListener('touchmove', handleTouchMove);
            }, 200);
          }
        } else if (scrollProgress > 0) {
          scrollProgress += delta;
          scrollProgress = Math.max(0, scrollProgress);
          updateAnimations(scrollProgress);
        }
        
        return false;
      }
    };

    const handleTouchMove = (e) => {
      if (isAnimating && !hasCompletedAnimation) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleKeyDown = (e) => {
      if (isAnimating && !hasCompletedAnimation) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'PageDown' || e.key === 'PageUp' || e.key === 'Home' || e.key === 'End' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      
      document.body.classList.remove('hero-animating');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
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