import React from 'react';
import './studioProjects.css';

const StudioProjects = () => {
  return (
    <div className='studioProjects'>
        <div className="studioProjectsContainer">
            {/* Left Part */}
            <div className="studioProjectsContainerleftLeft">
                <div className="studioProjectsContainerleftLeftContainer">
                    <div className="studioProjectsContainerleftLeftContainerOne">
                        <div className="studioProjectsContainerleftLeftContainerOneContainer">
                            <div className="studioProjectsContainerleftLeftContainerOneContainerImage"></div>
                        </div>
                    </div>

                    <div className="studioProjectsContainerleftLeftContainerTwo">
                        <div className="studioProjectsContainerleftLeftContainerTwoContainer">
                            <div className="studioProjectsContainerleftLeftContainerTwoContainerImage"></div>
                        </div>
                    </div>

                    <div className="studioProjectsContainerleftLeftContainerText">
                        <div className="studioProjectsContainerleftLeftContainerTextContainer">
                            <p className="studioProjectsContainerleftLeftContainerTextContainerText">
                                Design dna
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Part */}
            <div className="studioProjectsContainerRight">
                <div className="studioProjectsContainerRightContainer">
                    <div className="studioProjectsContainerRightContainerImage">
                        <div className="studioProjectsContainerRightContainerImageContainer">
                            <div className="studioProjectsContainerRightContainerImageContainerImage"></div>
                        </div>
                    </div>

                    <div className="studioProjectsContainerRightContainerText">
                        <div className="studioProjectsContainerRightContainerTextContainer">
                            <div className="studioProjectsContainerRightContainerTextContainerOne">
                                <div className="studioProjectsContainerRightContainerTextContainerOneContainer">
                                    <div className="studioProjectsContainerRightContainerTextContainerOneContainerOne">
                                        <p className="studioProjectsContainerRightContainerTextContainerOneContainerOneText">
                                            [
                                        </p>
                                    </div>

                                    <div className="studioProjectsContainerRightContainerTextContainerOneContainerTwo">
                                        <p className="studioProjectsContainerRightContainerTextContainerOneContainerTwoText">
                                            our projects
                                        </p>
                                    </div>

                                    <div className="studioProjectsContainerRightContainerTextContainerOneContainerThree">
                                        <p className="studioProjectsContainerRightContainerTextContainerOneContainerThreeText">
                                            ]
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="studioProjectsContainerRightContainerTextContainerTwo">
                                <div className="studioProjectsContainerRightContainerTextContainerTwoContainer">
                                    <p className="studioProjectsContainerRightContainerTextContainerTwoContainerText">
                                        Our strength as a design-led studio arises from a unique blend of creative talent, technical capability, implementation expertise and commercial strategy. We have a collaborative mindset and a global outlook. We’re always exploring new possibilities in advanced technologies, materials and design forms. We’re committed to being involved from first sketch to final construction, adding value at every stage. Each design is intentionally integrated into its unique social, environmental, cultural and functional context with quiet confidence and understated flair.
                                    </p>
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

export default StudioProjects