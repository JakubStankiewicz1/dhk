import React from 'react';
import './studioNavbar.css';

const StudioNavbar = () => {
  return (
    <div className='studioNavbar'>
        <div className="studioNavbarContainer">
            {/* Left Part */}
            <div className="studioNavbarContainerLeft">
                <div className="studioNavbarContainerLeftContainer">
                    <div className="studioNavbarContainerLeftContainerOne">
                        <div className="studioNavbarContainerLeftContainerOneContainer">
                            <p className="studioNavbarContainerLeftContainerOneContainerText">
                                home
                            </p>
                        </div>
                    </div>

                    <div className="studioNavbarContainerLeftContainerTwo">
                        <div className="studioNavbarContainerLeftContainerTwoContainer">
                            <div className="studioNavbarContainerLeftContainerTwoContainerOne">
                                <div className="studioNavbarContainerLeftContainerTwoContainerOneContainer">
                                    projects,
                                </div>
                            </div>

                            <div className="studioNavbarContainerLeftContainerTwoContainerTwo">
                                <div className="studioNavbarContainerLeftContainerTwoContainerTwoContainer">
                                    <div className="studioNavbarContainerLeftContainerTwoContainerTwoContainerOne">
                                        <p className="studioNavbarContainerLeftContainerTwoContainerTwoContainerOneText">
                                            studio,
                                        </p>
                                    </div>

                                    <div className="studioNavbarContainerLeftContainerTwoContainerTwoContainerTwo">
                                        <div className="studioNavbarContainerLeftContainerTwoContainerTwoContainerTwoDiv" />
                                    </div>
                                </div>
                            </div>

                            <div className="studioNavbarContainerLeftContainerTwoContainerThree">
                                <div className="studioNavbarContainerLeftContainerTwoContainerThreeContainer">
                                    <p className="studioNavbarContainerLeftContainerTwoContainerThreeContainerText">
                                        journal
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Part */}
            <div className="studioNavbarContainerRight">
                <div className="studioNavbarContainerRightContainer">
                    <p className="studioNavbarContainerRightContainerText">
                        menu
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StudioNavbar