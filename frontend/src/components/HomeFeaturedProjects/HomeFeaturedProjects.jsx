import React from 'react';
import './homeFeaturedProjects.css';
import HomeProjectElement from '../HomeProjectElement/HomeProjectElement';
import assets from '../../assets/assets';
import { useTheme } from '../../contexts/ThemeContext';

const HomeFeaturedProjects = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`homeFeaturedProjects ${theme}`}>
        <div className="homeFeaturedProjectsContainer">
            {/* Top Part */}
            <div className="homeFeaturedProjectsTop">
                <div className="homeFeaturedProjectsTopContainer">
                    <p className="homeFeaturedProjectsTopContainerText">
                        featured projects
                    </p>
                </div>
            </div>

            {/* Bottom Part */}
            <div className="homeFeaturedProjectsContainerBottom">
                <div className="homeFeaturedProjectsContainerBottomContainer">
                    {/* Top Part */}
                    <div className="homeFeaturedProjectsContainerBottomTop">
                        <HomeProjectElement image={assets.HomeFeaturedProjectsImgOne} textOne="Longkloof Prencinct" textTwo="2024" />
                    </div>

                    {/* Middle Part */}
                    <div className="homeFeaturedProjectsContainerBottomContainerMiddle">
                        <div className="homeFeaturedProjectsContainerBottomContainerMiddleContainer">
                            <div className="homeFeaturedProjectsContainerBottomContainerMiddleContainerOne">
                                <HomeProjectElement image={assets.HomeFeaturedProjectsImgTwo} textOne="Olympus Sandton" textTwo="2027" />
                            </div>

                            <div className="homeFeaturedProjectsContainerBottomContainerMiddleContainerTwo">
                                <HomeProjectElement image={assets.HomeFeaturedProjectsImgThree} textOne="Al Marjan" textTwo="2028" />
                            </div>

                            <div className="homeFeaturedProjectsContainerBottomContainerMiddleContainerThree">
                                <div className="homeFeaturedProjectsContainerBottomContainerMiddleContainerThreeContainer">
                                    <div className="homeFeaturedProjectsContainerBottomContainerMiddleContainerThreeContainerButton">

                                        <div className="homeFeaturedProjectsContainerBottomContainerMiddleContainerThreeContainerButtonOne">
                                            <p className="homeFeaturedProjectsContainerBottomContainerMiddleContainerThreeContainerButtonOneText">
                                                [
                                            </p>
                                        </div>

                                        <div className="homeFeaturedProjectsContainerBottomContainerMiddleContainerThreeContainerButtonTwo">
                                            <p className="homeFeaturedProjectsContainerBottomContainerMiddleContainerThreeContainerButtonTwoText">
                                                view all projects
                                            </p>
                                        </div>

                                        <div className="homeFeaturedProjectsContainerBottomContainerMiddleContainerThreeContainerButtonThree">
                                            <p className="homeFeaturedProjectsContainerBottomContainerMiddleContainerThreeContainerButtonThreeText">
                                                ]
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Bottom Part */}
                    <div className="homeFeaturedProjectsContainerBottomContainerBottom">
                        <div className="homeFeaturedProjectsContainerBottomContainerBottomContainer">
                            {/* Left Part */}
                            <div className="homeFeaturedProjectsContainerBottomContainerBottomContainerLeft"></div>

                            {/* Middle Part */}
                            <div className="homeFeaturedProjectsContainerBottomContainerBottomContainerMiddle">
                                <div className="homeFeaturedProjectsContainerBottomContainerBottomContainerMiddleContainer">
                                    <HomeProjectElement image={assets.HomeFeaturedProjectsImgFour} textOne="Ahmed Baba Institute" textTwo="2009" />
                                </div>
                            </div>

                            {/* Right Part */}
                            <div className="homeFeaturedProjectsContainerBottomContainerBottomContainerRight">
                                <div className="homeFeaturedProjectsContainerBottomContainerBottomContainerRightContainer">
                                    <HomeProjectElement image={assets.HomeFeaturedProjectsImgFive} textOne="The Signature" textTwo="2027" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeFeaturedProjects