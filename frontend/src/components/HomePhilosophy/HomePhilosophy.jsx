import React, { useEffect } from 'react';
import './homePhilosophy.css';

const HomePhilosophy = () => {

  useEffect(() => {
    // Parallax effect for "we" text
    const handleScroll = () => {
      const weText = document.querySelector('.homePhilosophyContainerTopContainerLeftContainerText');
      const philosophySection = document.querySelector('.homePhilosophy');
      const lastLine = document.querySelector('.homePhilosophyContainerTopContainerRightContainerText:nth-child(4)'); // "design for the future"
      
      if (weText && philosophySection && lastLine) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const sectionTop = philosophySection.offsetTop;
        const sectionHeight = philosophySection.offsetHeight;
        
        // Sprawdzamy czy jesteśmy w obszarze sekcji philosophy
        if (scrollTop >= sectionTop && scrollTop <= sectionTop + sectionHeight) {
          const scrollInSection = scrollTop - sectionTop;
          const startThreshold = 100; // Pierwsze 100px bez ruchu
          
          // Pozycje elementów
          const weRect = weText.getBoundingClientRect();
          const lastLineRect = lastLine.getBoundingClientRect();
          const weTop = weRect.top + window.pageYOffset;
          const lastLineTop = lastLineRect.top + window.pageYOffset;
          
          // Dystans który "we" ma do pokonania żeby dotrzeć do pozycji ostatniej linii
          const totalDistance = lastLineTop - weTop;
          
          if (scrollInSection > startThreshold) {
            // Obliczamy progress po przeminięciu pierwszych 100px
            const activeScrollDistance = scrollInSection - startThreshold;
            const maxActiveScroll = sectionHeight - startThreshold;
            const progress = Math.min(activeScrollDistance / maxActiveScroll, 1);
            
            // "we" przesuwa się w dół z efektem parallax (0.5x szybkości scrolla)
            const parallaxFactor = 0.5;
            const translateY = progress * totalDistance * parallaxFactor;
            
            weText.style.transform = `translateY(${translateY}px) scale(1) rotate(0deg)`;
            weText.style.setProperty('--current-translateY', `${translateY}px`);
          } else {
            // Przed progiem 100px - pozycja początkowa
            weText.style.transform = 'translateY(0px) scale(1) rotate(0deg)';
            weText.style.setProperty('--current-translateY', '0px');
          }
        } else if (scrollTop < sectionTop) {
          // Przed sekcją - pozycja początkowa z animacji CSS
          weText.style.transform = 'translateY(0px) scale(1) rotate(0deg)';
          weText.style.setProperty('--current-translateY', '0px');
        }
      }
    };

    // Dodajemy event listener do window scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className='homePhilosophy'>
        <div className="homePhilosophyContainer">
            {/* Top Part */}
            <div className="homePhilosophyContainerTop">
                <div className="homePhilosophyContainerTopContainer">
                    {/* Left Part */}
                    <div className="homePhilosophyContainerTopContainerLeft">
                        <div className="homePhilosophyContainerTopContainerLeftContainer">
                            <p className="homePhilosophyContainerTopContainerLeftContainerText">
                                we
                            </p>
                        </div>
                    </div>

                    {/* Right Part */}
                    <div className="homePhilosophyContainerTopContainerRight">
                        <div className="homePhilosophyContainerTopContainerRightContainer">
                            <p className="homePhilosophyContainerTopContainerRightContainerText">
                                stay curious, always.
                            </p>

                            <p className="homePhilosophyContainerTopContainerRightContainerText">
                                collaborate.
                            </p>

                            <p className="homePhilosophyContainerTopContainerRightContainerText">
                                nurture talent.
                            </p>

                            <p className="homePhilosophyContainerTopContainerRightContainerText">
                                design for the future.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Part */}
            <div className="homePhilosophyContainerBottom">
                <div className="homePhilosophyContainerBottomContainer">
                    {/* Left Part */}
                    <div className="homePhilosophyContainerBottomContainerLeft">
                        <div className="homePhilosophyContainerBottomContainerLeftContainer">
                            <p className="homePhilosophyContainerBottomContainerLeftContainerText">
                                Philosophy
                            </p>
                        </div>
                    </div>

                    {/* Right Part */}
                    <div className="homePhilosophyContainerBottomContainerRight">
                        <div className="homePhilosophyContainerBottomContainerRightContainer">
                            <p className="homePhilosophyContainerBottomContainerRightContainerText">
                                We’re fueled by curiosity and creativity. We seek to improve the quality of the built environment with subtle, yet confident designs characterised by clean lines and forms linked inextricably with function. Each design is unique, crafted to add commercial, social and aesthetic value while expressing our responsibility to safeguard the planet, nurture our team and enhance the lives of people who use the spaces we create.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePhilosophy