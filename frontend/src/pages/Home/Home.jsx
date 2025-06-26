import React from 'react';
import './home.css';
import HomeHero from '../../components/HomeHero/HomeHero';
import HomeNavbar from '../../components/HomeNavbar/HomeNavbar';
import HomePhilosophy from '../../components/HomePhilosophy/HomePhilosophy';
import HomeStory from '../../components/HomeStory/HomeStory';
import HomeFeaturedProjects from '../../components/HomeFeaturedProjects/HomeFeaturedProjects';
import HomeAwards from '../../components/HomeAwards/HomeAwards';

const Home = () => {
  return (
    <div className='home'>
      <HomeHero />
      <HomeNavbar />
      <HomePhilosophy />
      <HomeStory />
      <HomeFeaturedProjects />
      <HomeAwards />
    </div>
  )
}

export default Home