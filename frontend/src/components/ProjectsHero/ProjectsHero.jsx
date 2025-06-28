import React from 'react';
import './projectsHero.css';

const ProjectsHero = () => {
  return (
    <div className='projectsHeroIcon'>
      <div className="projectsHeroIconContainer">
        {/* Left Part */}
        <div className="projectsHeroIconContainerLeft">
          <div className="projectsHeroIconContainerLeftContainer">
            <div className="projectsHeroIconContainerLeftContainerOne">
              <div className="projectsHeroIconContainerLeftContainerOneContainer">
                <p className="projectsHeroIconContainerLeftContainerOneContainerText">
                  grid
                </p>
              </div>
            </div>

            <div className="projectsHeroIconContainerLeftContainerTwo">
              <div className="projectsHeroIconContainerLeftContainerTwoContainer">
                <p className="projectsHeroIconContainerLeftContainerTwoContainerText">
                  /
                </p>
              </div>
            </div>

            <div className="projectsHeroIconContainerLeftContainerThree">
              <div className="projectsHeroIconContainerLeftContainerThreeContainer">
                <p className="projectsHeroIconContainerLeftContainerThreeContainerText">
                  list
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Part */}
        <div className="projectsHeroIconContainerRight">
          <div className="projectsHeroIconContainerRightContainer">
            <p className="projectsHeroIconContainerRightContainerText">
              all projects
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectsHero