import React, { useEffect, useRef } from 'react';
import './projectsElements.css';
import ProjectsElementsEle from '../ProjectsElementsEle/ProjectsElementsEle';

const ProjectsElements = () => {
  const containerRef = useRef(null);

  // Przykładowe dane projektów
  const projects = [
    { id: 1, name: "Al Marjan", year: "2028" },
    { id: 2, name: "Dubai Marina", year: "2027" },
    { id: 3, name: "Palm Jumeirah", year: "2026" },
    { id: 4, name: "Downtown Dubai", year: "2025" },
    { id: 5, name: "Business Bay", year: "2024" },
    { id: 6, name: "DIFC", year: "2023" },
    { id: 7, name: "Jumeirah Beach", year: "2022" },
    { id: 8, name: "City Walk", year: "2021" },
    { id: 9, name: "JBR", year: "2020" },
    { id: 10, name: "Deira", year: "2019" },
    { id: 11, name: "Bur Dubai", year: "2018" }
  ];

  useEffect(() => {
    let currentElementIndex = 0; // Który element obecnie się rozwija
    let scrollProgress = 0; // Postęp scroll dla aktualnego elementu (0-1)
    let isTransitioning = false; // Czy aktualnie trwa przejście między elementami
    
    const handleWheelScroll = (e) => {
      const elements = containerRef.current?.children;
      if (!elements) return;

      // Ultra-smooth scroll z bardzo małą prędkością
      const scrollDelta = e.deltaY;
      const scrollSpeed = 0.0008; // Bardzo powolne i płynne

      // Smooth progress update z easing
      const targetProgress = scrollProgress + (scrollDelta * scrollSpeed);
      const clampedProgress = Math.max(0, Math.min(1, targetProgress));
      
      // Płynne przejście do nowego progress
      scrollProgress += (clampedProgress - scrollProgress) * 0.1; // Smooth interpolation

      // Bardzo płynne przejście do następnego elementu
      if (scrollProgress >= 0.98 && currentElementIndex < elements.length - 1 && !isTransitioning) {
        isTransitioning = true;
        
        // Smooth transition do następnego elementu
        setTimeout(() => {
          currentElementIndex++;
          scrollProgress = 0;
          isTransitioning = false;
        }, 200); // Krótkie opóźnienie dla płynności
      }
      
      // Płynny powrót do poprzedniego elementu
      if (scrollProgress <= 0.02 && currentElementIndex > 0 && !isTransitioning) {
        isTransitioning = true;
        
        setTimeout(() => {
          currentElementIndex--;
          scrollProgress = 0.98;
          isTransitioning = false;
        }, 200);
      }

      console.log(`Element: ${currentElementIndex}, Progress: ${scrollProgress.toFixed(4)}`);

      // Ultra-smooth wysokości z advanced easing
      const minHeight = 60;
      const initialHeight = 140;
      const maxHeight = window.innerHeight;

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        let height;
        let targetHeight;
        
        if (i < currentElementIndex) {
          // Elementy przed aktualnym - pełna wysokość
          targetHeight = maxHeight;
        } else if (i === currentElementIndex) {
          // Aktualny element z mega-smooth easing
          const startHeight = i === 0 ? initialHeight : minHeight;
          
          // Advanced easing function dla ultra-smooth feel
          const easedProgress = 1 - Math.pow(1 - scrollProgress, 4); // Quartic ease-out
          targetHeight = startHeight + (maxHeight - startHeight) * easedProgress;
        } else {
          // Elementy po aktualnym - podstawowa wysokość
          targetHeight = i === 0 ? initialHeight : minHeight;
        }

        // Smooth interpolation do target height
        const currentHeight = parseFloat(element.style.height) || (i === 0 ? initialHeight : minHeight);
        height = currentHeight + (targetHeight - currentHeight) * 0.15; // Very smooth interpolation

        element.style.height = `${height}px`;
      }
      
      // Blokuj normalne scrollowanie
      e.preventDefault();
    };

    // Dodaj wheel listener
    window.addEventListener('wheel', handleWheelScroll, { passive: false });
    
    // Ustaw stan początkowy z smooth heights
    const elements = containerRef.current?.children;
    if (elements) {
      const minHeight = 60;
      const initialHeight = 140;
      
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.style.height = `${i === 0 ? initialHeight : minHeight}px`;
      }
    }

    return () => {
      window.removeEventListener('wheel', handleWheelScroll);
    };
  }, []);

  return (
    <div className='projectsElements'>
        <div className="projectsElementsContainer" ref={containerRef}>
            {projects.map((project) => (
                <ProjectsElementsEle 
                    key={project.id} 
                    projectName={project.name}
                    projectYear={project.year}
                />
            ))}
        </div>

        {/* Bottom Part */}
        <div className="projectsElementsBottom">
            <div className="projectsElementsBottomContainer">
                <div className="projectsElementsBottomContainerButton">
                    <div className="projectsElementsBottomContainerButtonContainer">
                        <div className="projectsElementsBottomContainerButtonContainerOne">
                            <div className="projectsElementsBottomContainerButtonContainerOneContainer">
                                <p className="projectsElementsBottomContainerButtonContainerOneContainerText">
                                    [
                                </p>
                            </div>
                        </div>

                        <div className="projectsElementsBottomContainerButtonContainerTwo">
                            <div className="projectsElementsBottomContainerButtonContainerTwoContainer">
                                <p className="projectsElementsBottomContainerButtonContainerTwoContainerText">
                                    back to top
                                </p>
                            </div>
                        </div>

                        <div className="projectsElementsBottomContainerButtonContainerThree">
                            <div className="projectsElementsBottomContainerButtonContainerThreeContainer">
                                <p className="projectsElementsBottomContainerButtonContainerThreeContainerText">
                                    ]
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectsElements