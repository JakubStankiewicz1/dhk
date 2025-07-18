import React, { useEffect, useRef, useState } from 'react';
import './homeNavbar.css';
import { NavLink } from 'react-router';

const HomeNavbar = () => {
  const navbarRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.classList.contains('hero-animating')) {
        return;
      }
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const triggerPoint = 475;

      if (scrollTop >= triggerPoint) {
        if (!isFixed) {
          setIsFixed(true);
          if (navbarRef.current) {
            navbarRef.current.classList.add('fixed');
          }
        }
      } else {
        if (isFixed) {
          setIsFixed(false);
          if (navbarRef.current) {
            navbarRef.current.classList.remove('fixed');
          }
        }
      }
    };

    // Inicjalne sprawdzenie pozycji
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFixed]);

  return (
    <div className='homeNavbar' ref={navbarRef}>
        <div className="homeNavbarContainer">

            {/* Left Part */}
            <div className="homeNavbarContainerLeft">
                <div className="homeNavbarContainerLeftContainer">
                    <div className="homeNavbarContainerLeftContainerDiv">
                        {/* Top */}
                        <div className="homeNavbarContainerLeftContainerTop">
                            <div className="homeNavbarContainerLeftContainerTopContainer">
                                <p className="homeNavbarContainerLeftContainerTopContainerText">
                                    home
                                </p>
                            </div>
                        </div>

                        {/* Bottom */}
                        <div className="homeNavbarContainerLeftContainerBottom">
                            <div className="homeNavbarContainerLeftContainerBottomDiv" />
                        </div>

                        {/* Hover Animation */}
                        <NavLink to="/" className="homeNavbarContainerLeftContainerHover">
                            <div className="homeNavbarContainerLeftContainerHoverCont">
                                <p className="homeNavbarContainerLeftContainerHoverContText">
                                    dhk
                                </p>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* Middle Part */}
            <div className="homeNavbarContainerMiddle">
                <div className="homeNavbarContainerMiddleContainer">

                    {/* One */}
                    <div className="homeNavbarContainerMiddleContainerOne">
                        <NavLink to="/projects" className="homeNavbarContainerMiddleContainerOneContainer">
                            <p className="homeNavbarContainerMiddleContainerOneContainerText">
                                projects,
                            </p>
                        </NavLink>
                    </div>

                    {/* Two */}
                    <div className="homeNavbarContainerMiddleContainerTwo">
                        <NavLink to="/studio" className="homeNavbarContainerMiddleContainerTwoContainer">
                            <p className="homeNavbarContainerMiddleContainerTwoContainerText">
                                studio,
                            </p>
                        </NavLink>
                    </div>

                    {/* Three */}
                    <div className="homeNavbarContainerMiddleContainerThree">
                        <NavLink to="/journal" className="homeNavbarContainerMiddleContainerThreeContainer">
                            <p className="homeNavbarContainerMiddleContainerThreeContainerText">
                                journal
                            </p>
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* Right Part */}
            <div className="homeNavbarContainerRight">
                <div className="homeNavbarContainerRightContainer">

                    {/* One */}
                    <div className="homeNavbarContainerRightContainerOne">
                        <div className="homeNavbarContainerRightContainerOneContainer">

                            {/* One */}
                            <div className="homeNavbarContainerRightContainerOneContainerOne">
                                <div className="homeNavbarContainerRightContainerOneContainerOneContainer">
                                    <p className="homeNavbarContainerRightContainerOneContainerOneContainerText">
                                        dark
                                    </p>
                                </div>
                            </div>

                            {/* Two */}
                            <div className="homeNavbarContainerRightContainerOneContainerTwo">
                                <div className="homeNavbarContainerRightContainerOneContainerTwoContainer">
                                    <p className="homeNavbarContainerRightContainerOneContainerTwoContainerText">
                                        /
                                    </p>
                                </div>
                            </div>

                            {/* Three */}
                            <div className="homeNavbarContainerRightContainerOneContainerThree">
                                <div className="homeNavbarContainerRightContainerOneContainerThreeContainer">
                                    <p className="homeNavbarContainerRightContainerOneContainerThreeContainerText">
                                        light
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Two */}
                    <div className="homeNavbarContainerRightContainerTwo">
                        <NavLink to="/menu" className="homeNavbarContainerRightContainerTwoContainer">
                            <p className="homeNavbarContainerRightContainerTwoContainerText">
                                menu
                            </p>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeNavbar