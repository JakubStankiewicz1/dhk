import React from 'react';
import './studioLeadershipTeam.css';
import assets from '../../assets/assets';

const StudioLeadershipTeam = () => {
  const teamMembers = [
    { name: "AJ Scheuble", position: "Senior Associate", image: assets.StudioLeadershipTeamImgOne },
    { name: "Christiaan van Aswegen", position: "Principal", image: assets.StudioLeadershipTeamImgOne },
    { name: "Daniel Hookins", position: "Associate", image: assets.StudioLeadershipTeamImgOne },
    { name: "Daphne Nederstigt", position: "Senior Associate", image: assets.StudioLeadershipTeamImgOne },
    { name: "Derick Henstra", position: "Director", image: assets.StudioLeadershipTeamImgOne },
    { name: "Fahiema Regal", position: "Associate", image: assets.StudioLeadershipTeamImgOne },
    { name: "François Hugo", position: "Principal", image: assets.StudioLeadershipTeamImgOne }
  ];

  return (
    <div className='studioLeadershipTeam'>
      <div className="studioLeadershipTeamContainer">

        {/* Top Part */}
        <div className="studioLeadershipTeamContainerTop">
          <div className="studioLeadershipTeamContainerTopContainer">
            <p className="studioLeadershipTeamContainerTopContainerText">
              leadership team
            </p>
          </div>
        </div>
        

        {/* Bottom Part */}
        <div className="studioLeadershipTeamContainerBottom">
          <div className="studioLeadershipTeamContainerBottomContainer">
            
            {teamMembers.map((member, index) => (
              <div key={index} className="studioLeadershipTeamContainerBottomContainerElement">
                <div className="studioLeadershipTeamContainerBottomContainerElementCont">
                  <div className="studioLeadershipTeamContainerBottomContainerElementContLeft">
                    <div className="studioLeadershipTeamContainerBottomContainerElementContLeftContainer">
                      <img src={member.image} alt={member.name} className='studioLeadershipTeamContainerBottomContainerElementContLeftContainerImage' />
                    </div>

                    <div className="studioLeadershipTeamContainerBottomContainerElementContTwo">
                      <div className="studioLeadershipTeamContainerBottomContainerElementContTwoCont">
                        <div className="studioLeadershipTeamContainerBottomContainerElementContTwoContOne">
                          <p className="studioLeadershipTeamContainerBottomContainerElementContTwoContOneText">
                            [
                          </p>
                        </div>
                        <div className="studioLeadershipTeamContainerBottomContainerElementContTwoContTwo">
                          <p className="studioLeadershipTeamContainerBottomContainerElementContTwoContTwoText">
                            info
                          </p>
                        </div>
                        <div className="studioLeadershipTeamContainerBottomContainerElementContTwoContThree">
                          <p className="studioLeadershipTeamContainerBottomContainerElementContTwoContThreeText">
                            ]
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="studioLeadershipTeamContainerBottomContainerElementContRight">
                    <div className="studioLeadershipTeamContainerBottomContainerElementContRightContainer">
                      <p className="studioLeadershipTeamContainerBottomContainerElementContRightContainerText">
                        {member.name}
                      </p>
                    </div>

                    <div className="studioLeadershipTeamContainerBottomContainerElementContRightTwo">
                      <div className="studioLeadershipTeamContainerBottomContainerElementContTwoContainer">
                        <p className="studioLeadershipTeamContainerBottomContainerElementContTwoContainerText">
                          {member.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  )
}

export default StudioLeadershipTeam