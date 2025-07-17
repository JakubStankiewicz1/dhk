import React from 'react';
import './studioLeadershipTeam.css';
import assets from '../../assets/assets';

const StudioLeadershipTeam = () => {
  const teamMembers = [
    { name: "AJ Scheuble", position: "Senior Associate", image: assets.StudioLeadershipTeamImgOne },
    { name: "Christiaan van Aswegen", position: "Associate | Professional Architect", image: assets.StudioLeadershipTeamImgTwo },
    { name: "Daniel Hookins", position: "Senior Associate", image: assets.StudioLeadershipTeamImgThree },
    { name: "Daphne Nederstigt", position: "Senior Associate", image: assets.StudioLeadershipTeamImgFour },
    { name: "Derick Henstra", position: "Fouding Partner | Executive Chairman", image: assets.StudioLeadershipTeamImgFive },
    { name: "Fahiema Regal", position: "Associate", image: assets.StudioLeadershipTeamImgSix },
    { name: "Francois Hugo", position: "Associate", image: assets.StudioLeadershipTeamImgSeven  }
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