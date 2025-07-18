import React, { useEffect } from 'react';
import './homePhilosophy.css';
import { useTheme } from '../../contexts/ThemeContext';

const HomePhilosophy = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Poczekaj aż animacja CSS się skończy (1.1s)
    setTimeout(() => {
      const weText = document.querySelector('.homePhilosophyContainerTopContainerLeftContainerText');
      const philosophySection = document.querySelector('.homePhilosophy');
      
      if (weText && philosophySection) {
        // Dodaj klasę żeby usunąć animację CSS
        weText.classList.add('parallax-ready');
        
        // Bardzo prosty i niezawodny efekt parallax z progiem i limitem
        const handleScroll = () => {
          const scrollTop = window.pageYOffset;
          const sectionTop = philosophySection.offsetTop;
          
          // Sprawdź czy jesteśmy w sekcji i przescrollowaliśmy co najmniej próg
          const scrollIntoSection = scrollTop - sectionTop;
          const threshold = 0; // Próg
          
          if (scrollIntoSection >= threshold) {
            // Zaczynamy parallax dopiero po przekroczeniu progu
            const adjustedScroll = scrollIntoSection - threshold;
            const parallaxSpeed = 0.5; // Szybkość parallax
            let translateY = adjustedScroll * parallaxSpeed;
            
            // Maksymalna wartość translateY - zatrzymaj na wysokości "design for the future"
            const maxTranslateY = 210; // Maksymalne przesunięcie w pikselach
            translateY = Math.min(translateY, maxTranslateY);
            
            // Zastosuj transform bezpośrednio z !important żeby przebić animację CSS
            weText.style.setProperty('transform', `translateY(${translateY}px)`, 'important');
            weText.style.setProperty('--current-translateY', `${translateY}px`);
            
            // Debug
            console.log('ScrollIntoSection:', scrollIntoSection, 'AdjustedScroll:', adjustedScroll, 'TranslateY:', translateY, 'MaxTranslateY:', maxTranslateY);
          } else {
            // Przed progiem - pozycja początkowa
            weText.style.setProperty('transform', `translateY(0px)`, 'important');
            weText.style.setProperty('--current-translateY', '0px');
            
            // Debug
            console.log('Before threshold. ScrollIntoSection:', scrollIntoSection, 'Threshold:', threshold);
          }
        };

        // Dodaj event listener
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Wywołaj raz na początku
        handleScroll();

        // Cleanup function
        window.parallaxCleanup = () => {
          window.removeEventListener('scroll', handleScroll);
        };
      } else {
        console.log('Elements not found:', { weText: !!weText, philosophySection: !!philosophySection });
      }
    }, 100); // Poczekaj 100ms aż animacja się skończy

    // Cleanup
    return () => {
      if (window.parallaxCleanup) {
        window.parallaxCleanup();
      }
    };
  }, []);
  return (
    <div className={`homePhilosophy ${theme}`}>
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