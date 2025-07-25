import React from 'react';
import './studio.css';
import StudioNavbar from '../../components/StudioNavbar/StudioNavbar';
import StudioHero from '../../components/StudioHero/StudioHero';
import StudioHeroTwo from '../../components/StudioHeroTwo/StudioHeroTwo';
import StudioProjects from '../../components/StudioProjects/StudioProjects';
import StudioWhatWeDo from '../../components/StudioWhatWeDo/StudioWhatWeDo_NEW';
import StudioLeadershipTeam from '../../components/StudioLeadershipTeam/StudioLeadershipTeam';
import StudioMeetTheTeam from '../../components/StudioMeetTheTeam/StudioMeetTheTeam';

const Studio = () => {
  return (
    <div className='studio'>
        <StudioNavbar />
        <StudioHero />
        <StudioHeroTwo />
        <StudioProjects />
        <StudioWhatWeDo />
        <StudioLeadershipTeam />
        <StudioMeetTheTeam />
    </div>
  )
}

export default Studio