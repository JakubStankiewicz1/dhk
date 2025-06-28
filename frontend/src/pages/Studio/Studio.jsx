import React from 'react';
import './studio.css';
import StudioNavbar from '../../components/StudioNavbar/StudioNavbar';
import StudioHero from '../../components/StudioHero/StudioHero';
import StudioHeroTwo from '../../components/StudioHeroTwo/StudioHeroTwo';

const Studio = () => {
  return (
    <div className='studio'>
        <StudioNavbar />
        <StudioHero />
        <StudioHeroTwo />
    </div>
  )
}

export default Studio