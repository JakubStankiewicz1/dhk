import React from 'react';
import './projectsNavbar.css';
import { RiArrowDownSLine } from "react-icons/ri";

const ProjectsNavbar = () => {
  return (
    <div className='projectsNavbar'>
        <div className="projectsNavbarContainer">
            {/* Left Part */}
            <div className="projectsNavbarContainerLeft">
                <div className="projectsNavbarContainerLeftContainer">
                    <div className="projectsNavbarContainerLeftContainerOne">
                        <div className="projectsNavbarContainerLeftContainerOneContainer">
                            <p className="projectsNavbarContainerLeftContainerOneContainerText">
                                home
                            </p>
                        </div>
                    </div>

                    <div className="projectsNavbarContainerLeftContainerTwo">
                        <div className="projectsNavbarContainerLeftContainerTwoContainer">
                            {/* Left Part */}
                            <div className="projectsNavbarContainerLeftContainerTwoContainerLeft">
                                <div className="projectsNavbarContainerLeftContainerTwoContainerLeftContainer">
                                    <div className="projectsNavbarContainerLeftContainerTwoContainerLeftContainerOne">
                                        <div className="projectsNavbarContainerLeftContainerTwoContainerLeftContainerOneContainer">
                                            <p className="projectsNavbarContainerLeftContainerTwoContainerLeftContainerOneContainerText">
                                                [
                                            </p>
                                        </div>
                                    </div>

                                    <div className="projectsNavbarContainerLeftContainerTwoContainerLeftContainerTwo">
                                        <div className="projectsNavbarContainerLeftContainerTwoContainerLeftContainerTwoContainer">
                                            <RiArrowDownSLine className='projectsNavbarContainerLeftContainerTwoContainerLeftContainerTwoContainerIcon' />
                                        </div>
                                    </div>

                                    <div className="projectsNavbarContainerLeftContainerTwoContainerLeftContainerThree">
                                        <div className="projectsNavbarContainerLeftContainerTwoContainerLeftContainerThreeContainer">
                                            <p className="projectsNavbarContainerLeftContainerTwoContainerLeftContainerThreeContainerText">
                                                ]
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Part */}
                            <div className="projectsNavbarContainerLeftContainerTwoContainerRight">
                                <div className="projectsNavbarContainerLeftContainerTwoContainerRightContainer">
                                    <p className="projectsNavbarContainerLeftContainerTwoContainerRightContainerText">
                                        all projects
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="projectsNavbarContainerLeftContainerThree">
                        <div className="projectsNavbarContainerLeftContainerThreeContainer">
                            <div className="projectsNavbarContainerLeftContainerThreeContainerOne">
                                <div className="projectsNavbarContainerLeftContainerThreeContainerOneContainer">
                                    <div className="projectsNavbarContainerLeftContainerThreeContainerOneContainerOne">
                                        <p className="projectsNavbarContainerLeftContainerThreeContainerOneContainerOneText">
                                            projects,
                                        </p>
                                    </div>

                                    <div className="projectsNavbarContainerLeftContainerThreeContainerOneContainerTwo">
                                        <div className="projectsNavbarContainerLeftContainerThreeContainerOneContainerTwoDiv" />
                                    </div>
                                </div>
                            </div>

                            <div className="projectsNavbarContainerLeftContainerThreeContainerTwo">
                                <div className="projectsNavbarContainerLeftContainerThreeContainerTwoContainer">
                                    <p className="projectsNavbarContainerLeftContainerThreeContainerTwoContainerText">
                                        studio,
                                    </p>
                                </div>
                            </div>
                            
                            <div className="projectsNavbarContainerLeftContainerThreeContainerThree">
                                <div className="projectsNavbarContainerLeftContainerThreeContainerThreeContainer">
                                    <p className="projectsNavbarContainerLeftContainerThreeContainerThreeContainerText">
                                        journal
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Part */}
            <div className="projectsNavbarContainerRight">
                <div className="projectsNavbarContainerRightContainer">
                    <p className="projectsNavbarContainerRightContainerText">
                        menu
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectsNavbar