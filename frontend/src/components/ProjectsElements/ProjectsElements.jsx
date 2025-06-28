import React from 'react';
import './projectsElements.css';
import ProjectsElementsEle from '../ProjectsElementsEle/ProjectsElementsEle';

const ProjectsElements = () => {
  // Przykładowe dane projektów
  const projects = [
    { id: 1, name: "Al Marjan", year: "2028" },
    { id: 2, name: "Dubai Marina", year: "2027" },
    { id: 3, name: "Palm Jumeirah", year: "2026" },
    { id: 4, name: "Downtown Dubai", year: "2025" },
    { id: 5, name: "Business Bay", year: "2024" },
    { id: 6, name: "DIFC", year: "2023" },
    { id: 7, name: "Jumeirah Beach", year: "2022" },
    { id: 8, name: "City Walk", year: "2021" },
    { id: 9, name: "JBR", year: "2020" },
    { id: 10, name: "Deira", year: "2019" },
    { id: 11, name: "Bur Dubai", year: "2018" }
  ];

  return (
    <div className='projectsElements'>
        <div className="projectsElementsContainer">
            {projects.map((project) => (
                <ProjectsElementsEle 
                    key={project.id} 
                    projectName={project.name}
                    projectYear={project.year}
                />
            ))}
        </div>

        {/* Bottom Part */}
        <div className="projectsElementsBottom">
            <div className="projectsElementsBottomContainer">
                <div className="projectsElementsBottomContainerButton">
                    <div className="projectsElementsBottomContainerButtonContainer">
                        <div className="projectsElementsBottomContainerButtonContainerOne">
                            <div className="projectsElementsBottomContainerButtonContainerOneContainer">
                                <p className="projectsElementsBottomContainerButtonContainerOneContainerText">
                                    [
                                </p>
                            </div>
                        </div>

                        <div className="projectsElementsBottomContainerButtonContainerTwo">
                            <div className="projectsElementsBottomContainerButtonContainerTwoContainer">
                                <p className="projectsElementsBottomContainerButtonContainerTwoContainerText">
                                    back to top
                                </p>
                            </div>
                        </div>

                        <div className="projectsElementsBottomContainerButtonContainerThree">
                            <div className="projectsElementsBottomContainerButtonContainerThreeContainer">
                                <p className="projectsElementsBottomContainerButtonContainerThreeContainerText">
                                    ]
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectsElements