import React from 'react';
import './projects.css';
import ProjectsNavbar from '../../components/ProjectsNavbar/ProjectsNavbar';
import ProjectsHero from '../../components/ProjectsHero/ProjectsHero';
import ProjectsElements from '../../components/ProjectsElements/ProjectsElements';
import ProjectsFotter from '../../components/ProjectsFotter/ProjectsFotter';

const Projects = () => {
  return (
    <div>
        <ProjectsNavbar />
        <ProjectsHero />
        <ProjectsElements />
        <ProjectsFotter />
    </div>
  )
}

export default Projects