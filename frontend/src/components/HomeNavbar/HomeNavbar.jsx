import React, { useEffect, useRef, useState } from 'react';
import './homeNavbar.css';

const HomeNavbar = () => {
  const navbarRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.classList.contains('hero-animating')) {
        return;
      }
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop >= 475) {
        if (navbarRef.current) {
          navbarRef.current.style.position = 'fixed';
          navbarRef.current.style.top = '0px';
          navbarRef.current.style.zIndex = '15';
        }
    } else {
        if (navbarRef.current) {
          navbarRef.current.style.position = 'absolute';
          navbarRef.current.style.top = '475px';
          navbarRef.current.style.zIndex = '5';
        }
    }
      
    };

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
                </div>
            </div>

            {/* Middle Part */}
            <div className="homeNavbarContainerMiddle">
                <div className="homeNavbarContainerMiddleContainer">

                    {/* One */}
                    <div className="homeNavbarContainerMiddleContainerOne">
                        <div className="homeNavbarContainerMiddleContainerOneContainer">
                            <p className="homeNavbarContainerMiddleContainerOneContainerText">
                                projects,
                            </p>
                        </div>
                    </div>

                    {/* Two */}
                    <div className="homeNavbarContainerMiddleContainerTwo">
                        <div className="homeNavbarContainerMiddleContainerTwoContainer">
                            <p className="homeNavbarContainerMiddleContainerTwoContainerText">
                                studio,
                            </p>
                        </div>
                    </div>

                    {/* Three */}
                    <div className="homeNavbarContainerMiddleContainerThree">
                        <div className="homeNavbarContainerMiddleContainerThreeContainer">
                            <p className="homeNavbarContainerMiddleContainerThreeContainerText">
                                journal
                            </p>
                        </div>
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
                        <div className="homeNavbarContainerRightContainerTwoContainer">
                            <p className="homeNavbarContainerRightContainerTwoContainerText">
                                menu
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeNavbar