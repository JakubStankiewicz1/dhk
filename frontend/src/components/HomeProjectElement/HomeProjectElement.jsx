import React, { useState, useRef } from 'react';
import './homeProjectElement.css';

const HomeProjectElement = ({ image, textOne, textTwo }) => {
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
      className='homeProjectElement' 
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hover Text Element */}
      <div 
        className={`homeProjectElementHoverText ${isHovered ? 'visible' : ''}`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      >
        [ view project ]
      </div>

      <div className="homeProjectElementContainer">
            {/* Image Container */}
            <div className="homeProjectElementContainerImage">
                <div className="homeProjectElementContainerImageContainer">
                    <img src={image} alt="" className='homeProjectElementContainerImageContainerImg' />
                </div>
            </div>

            {/* Text Container */}
            <div className="homeProjectElementContainerText">
                <div className="homeProjectElementContainerTextContainer">
                    {/* Left Part */}
                    <div className="homeProjectElementContainerTextContainerLeft">
                        <div className="homeProjectElementContainerTextContainerLeftContainer">
                            <p className="homeProjectElementContainerTextContainerLeftContainerText">
                                {textOne}
                            </p>
                        </div>
                    </div>

                    {/* Right Part */}
                    <div className="homeProjectElementContainerTextContainerRight">
                        <div className="homeProjectElementContainerTextContainerRightContainer">
                            <p className="homeProjectElementContainerTextContainerRightContainerText">
                                {textTwo}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeProjectElement