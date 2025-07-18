import React from 'react';
import './home.css';
import HomeHero from '../../components/HomeHero/HomeHero';
import HomeNavbar from '../../components/HomeNavbar/HomeNavbar';
import HomePhilosophy from '../../components/HomePhilosophy/HomePhilosophy';
import HomeStory from '../../components/HomeStory/HomeStory';
import HomeFeaturedProjects from '../../components/HomeFeaturedProjects/HomeFeaturedProjects';
import HomeAwards from '../../components/HomeAwards/HomeAwards';
import HomeJournal from '../../components/HomeJournal/HomeJournal';
import HomeFotter from '../../components/HomeFotter/HomeFotter';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';

const HomeContent = () => {
  const { theme } = useTheme();

  return (
    <div className={`home ${theme}`}>
      <HomeHero />
      <HomeNavbar />
      <HomePhilosophy />
      <HomeStory />
      <HomeFeaturedProjects />
      <HomeAwards />
      <HomeJournal />
      <HomeFotter />
    </div>
  );
};

const Home = () => {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
};

export default Home