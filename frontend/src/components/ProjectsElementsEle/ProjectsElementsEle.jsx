import React from 'react';
import './projectsElementsEle.css';
import assets from '../../assets/assets';

const ProjectsElementsEle = ({ projectName = "Al Marjan", projectYear = "2028" }) => {
  return (
    <div className='projectsElementsEle'>
        <div className="projectsElementsEleContainer">
            {/* Left Part */}
            <div className="projectsElementsEleContainerLeft">
                <div className="projectsElementsEleContainerLeftContainer">
                    <div className="projectsElementsEleContainerLeftContainerOne">
                        <div className="projectsElementsEleContainerLeftContainerOneContainer">
                            <p className="projectsElementsEleContainerLeftContainerOneContainerText">
                                {projectName}
                            </p>
                        </div>
                    </div>

                    <div className="projectsElementsEleContainerLeftContainerTwo">
                        <div className="projectsElementsEleContainerLeftContainerTwoContainer">
                            <p className="projectsElementsEleContainerLeftContainerTwoContainerText">
                                {projectYear}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Part */}
            <div className="projectsElementsEleContainerRight">
                <div className="projectsElementsEleContainerRightContainer">
                    <div className="projectsElementsEleContainerRightContainerImage">
                        <img src={assets.ProjectsImgOne} alt="" className='projectsElementsEleContainerRightContainerImageImg' />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectsElementsEle