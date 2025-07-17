import React from 'react';
import './journalNavbar.css';
import { RiArrowDownSLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';

const JournalNavbar = () => {
  return (
    <div className='journalNavbar'>
        <div className="journalNavbarContainer">
            {/* Left Part */}
            <div className="journalNavbarContainerLeft">
                <div className="journalNavbarContainerLeftContainer">
                    <div className="journalNavbarContainerLeftContainerOne">
                        <div className="journalNavbarContainerLeftContainerOneDiv">
                        <div className="journalNavbarContainerLeftContainerOneContainer">
                            <p className="journalNavbarContainerLeftContainerOneContainerText">
                                home
                            </p>
                        </div>

                        <div className="journalNavbarContainerLeftContainerOneHover">
                            <div className="journalNavbarContainerLeftContainerOneHoverCont">
                                <p className="journalNavbarContainerLeftContainerOneHoverContText">
                                    dhk
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="journalNavbarContainerLeftContainerTwo">
                        <div className="journalNavbarContainerLeftContainerTwoContainer">
                            <div className="journalNavbarContainerLeftContainerTwoContainerLeft">
                                <div className="journalNavbarContainerLeftContainerTwoContainerLeftContainer">
                                    <div className="journalNavbarContainerLeftContainerTwoContainerLeftContainerOne">
                                        <p className="journalNavbarContainerLeftContainerTwoContainerLeftContainerOneText">
                                            [
                                        </p>
                                    </div>

                                    <div className="journalNavbarContainerLeftContainerTwoContainerLeftContainerTwo">
                                        <div className="journalNavbarContainerLeftContainerTwoContainerLeftContainerTwoContainer">
                                            <RiArrowDownSLine className='journalNavbarContainerLeftContainerTwoContainerLeftContainerTwoContainerIcon' />
                                        </div>
                                    </div>

                                    <div className="journalNavbarContainerLeftContainerTwoContainerLeftContainerThree">
                                        <p className="journalNavbarContainerLeftContainerTwoContainerLeftContainerThreeText">
                                            ]
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="journalNavbarContainerLeftContainerTwoContainerRight">
                                <div className="journalNavbarContainerLeftContainerTwoContainerRightContainer">
                                    <p className="journalNavbarContainerLeftContainerTwoContainerRightContainerText">
                                        all articles
                                    </p>
                                </div>

                                <div className="journalNavbarContainerLeftContainerTwoContainerRightHover">
                                    <div className="journalNavbarContainerLeftContainerTwoContainerRightHoverCont">
                                        <p className="journalNavbarContainerLeftContainerTwoContainerRightHoverContText">
                                            news
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="journalNavbarContainerLeftContainerThree">
                        <div className="journalNavbarContainerLeftContainerThreeContainer">
                            <div className="journalNavbarContainerLeftContainerThreeContainerOne">
                                <div className="journalNavbarContainerLeftContainerThreeContainerOneContainer">
                                    <p className="journalNavbarContainerLeftContainerThreeContainerOneContainerText">
                                        projects,
                                    </p>
                                </div>

                                <div className="journalNavbarContainerLeftContainerThreeContainerOneHover">
                                    <div className="journalNavbarContainerLeftContainerThreeContainerOneHoverCont">
                                        <p className="journalNavbarContainerLeftContainerThreeContainerOneHoverContText">
                                            portfolio
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="journalNavbarContainerLeftContainerThreeContainerTwo">
                                <div className="journalNavbarContainerLeftContainerThreeContainerTwoContainer">
                                    <p className="journalNavbarContainerLeftContainerThreeContainerTwoContainerText">
                                        studio,
                                    </p>
                                </div>

                                <div className="journalNavbarContainerLeftContainerThreeContainerTwoHover">
                                    <div className="journalNavbarContainerLeftContainerThreeContainerTwoHoverCont">
                                        <p className="journalNavbarContainerLeftContainerThreeContainerTwoHoverContText">
                                            team
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="journalNavbarContainerLeftContainerThreeContainerThree">
                                <div className="journalNavbarContainerLeftContainerThreeContainerThreeContainer">
                                    <div className="journalNavbarContainerLeftContainerThreeContainerThreeContainerOne">
                                        <p className="journalNavbarContainerLeftContainerThreeContainerThreeContainerOneText">
                                            journal
                                        </p>
                                    </div>

                                    <div className="journalNavbarContainerLeftContainerThreeContainerThreeContainerTwo">
                                        <div className="journalNavbarContainerLeftContainerThreeContainerThreeContainerTwoDiv" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Part */}
            <div className="journalNavbarContainerRight">
                <NavLink to="/menu" className="journalNavbarContainerRightContainer">
                    <p className="journalNavbarContainerRightContainerText">
                        menu
                    </p>
                </NavLink>

                {/* <div className="journalNavbarContainerRightHover">
                    <div className="journalNavbarContainerRightHoverCont">
                        <p className="journalNavbarContainerRightHoverContText">
                            nav
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default JournalNavbar