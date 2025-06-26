import React, { useEffect, useRef, useState } from 'react';
import './homeProjectElement.css';

const HomeProjectElement = ({ image, textOne, textTwo }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const elementRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isHovering && cursorFollowerRef.current) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const element = elementRef.current;
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering]);

  return (
    <>
      {/* Cursor Follower */}
      <div 
        ref={cursorFollowerRef}
        className={`homeProjectElementCursorFollower ${isHovering ? 'homeProjectElementCursorFollowerVisible' : ''}`}
        style={{
          left: mousePosition.x + 50,
          top: mousePosition.y - 5,
        }}
      >
        <div className="homeProjectElementCursorFollowerContent">
          [ view project ]
        </div>
      </div>

      <div className='homeProjectElement' ref={elementRef}>
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
    </>
  )
}

export default HomeProjectElement