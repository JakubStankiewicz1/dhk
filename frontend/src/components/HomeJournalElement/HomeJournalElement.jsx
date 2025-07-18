import React, { useState, useRef } from 'react';
import './homeJournalElement.css';

const HomeJournalElement = ({ image, category, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  const handleMouseMove = (e) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left + 10,
        y: e.clientY - rect.top - 10
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="homeJournalElement"
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
        {/* Hover Text Element */}
        <div 
          className={`homeJournalElementHoverText ${isHovered ? 'visible' : ''}`}
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`
          }}
        >
            [ view article ]
        </div>
        
        <div className="homeJournalElementContainer">
            {/* Top Part - Main Visual (Always visible, never moves) */}
            <div className="homeJournalElementContainerTop">
                <div className="homeJournalElementContainerTopContainer">
                    <div className="homeJournalElementContainerTopContainerContent">
                        <img src={image} alt="" className='homeJournalElementContainerTopContainerContentImg' />
                    </div>
                </div>
            </div>

            {/* Bottom Part - Overlay Content (Slides up on hover) */}
            <div className="homeJournalElementContainerBottom">
                <div className="homeJournalElementContainerBottomContainer">
                    <div className="homeJournalElementContainerBottomContainerTop">
                        <div className="homeJournalElementContainerBottomContainerContainer">
                            <div className="homeJournalElementContainerBottomContainerContainerOne">
                                <div className="homeJournalElementContainerBottomContainerContainerOneContainer">
                                    <p className="homeJournalElementContainerBottomContainerContainerOneContainerText">
                                        {category}
                                    </p>
                                </div>
                            </div>

                            <div className="homeJournalElementContainerBottomContainerContainerTwo">
                                <div className="homeJournalElementContainerBottomContainerContainerTwoContainer">
                                    <p className="homeJournalElementContainerBottomContainerContainerTwoContainerText">
                                        {title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="homeJournalElementContainerBottomContainerBottom">
                        <div className="homeJournalElementContainerBottomContainerBottomContainer">
                            <p className="homeJournalElementContainerBottomContainerBottomContainerText">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeJournalElement