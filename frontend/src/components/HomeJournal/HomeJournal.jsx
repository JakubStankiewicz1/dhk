import React from 'react';
import './homeJournal.css';
import HomeJournalElement from '../HomeJournalElement/HomeJournalElement';

const HomeJournal = () => {
  return (
    <div className='homeJournal'>
        <div className="homeJournalContainer">
            {/* Top Part */}
            <div className="homeJournalContainerTop">
                <div className="homeJournalContainerTopContainer">
                    <p className="homeJournalContainerTopContainerText">
                        journal
                    </p>
                </div>
            </div>

            {/* Bottom Part */}
            <div className="homeJournalContainerBottom">
                <div className="homeJournalContainerBottomContainer">
                    {/* Top Part */}
                    <div className="homeJournalContainerBottomContainerTop">
                        <div className="homeJournalContainerBottomContainerTopContainer">
                            <div className="homeJournalContainerBottomContainerTopContainerOne">
                                <div className="homeJournalContainerBottomContainerTopContainerOneContainer">
                                    <HomeJournalElement />
                                </div>
                            </div>

                            <div className="homeJournalContainerBottomContainerTopContainerTwo">
                                <div className="homeJournalContainerBottomContainerTopContainerTwoContainer">
                                    <HomeJournalElement />
                                </div>
                            </div>

                            <div className="homeJournalContainerBottomContainerTopContainerThree">
                                <div className="homeJournalContainerBottomContainerTopContainerThreeContainer">
                                    <HomeJournalElement />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="homeJournalContainerBottomContainerBottom">
                        <div className="homeJournalContainerBottomContainerBottomContainer">
                            <div className="homeJournalContainerBottomContainerBottomContainerOne">
                                <div className="homeJournalContainerBottomContainerBottomContainerOneContainer">
                                    <HomeJournalElement />
                                </div>
                            </div>

                            <div className="homeJournalContainerBottomContainerBottomContainerTwo">
                                <div className="homeJournalContainerBottomContainerBottomContainerTwoContainer">
                                    <HomeJournalElement />
                                </div>
                            </div>

                            <div className="homeJournalContainerBottomContainerBottomContainerThree">
                                <div className="homeJournalContainerBottomContainerBottomContainerThreeContainer">
                                    <div className="homeJournalContainerBottomContainerBottomContainerThreeContainerButton">

                                        <div className="homeJournalContainerBottomContainerBottomContainerThreeContainerButtonContainer">
                                            <div className="homeJournalContainerBottomContainerBottomContainerThreeContainerButtonContainerDiv">    
                                            <div className="homeJournalContainerBottomContainerBottomContainerThreeContainerButtonContainerOne">
                                                <div className="homeJournalContainerBottomContainerBottomContainerThreeContainerButtonContainerOneContainer">
                                                    <p className="homeJournalContainerBottomContainerBottomContainerThreeContainerButtonContainerOneContainerText">
                                                        [
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="homeJournalContainerBottomContainerBottomContainerThreeContainerButtonContainerTwo">
                                                <div className="homeJournalContainerBottomContainerBottomContainerThreeContainerButtonContainerTwoContainer">
                                                    <p className="homeJournalContainerBottomContainerBottomContainerThreeContainerButtonContainerTwoContainerText">
                                                        view more
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="homeJournalContainerBottomContainerBottomContainerThreeContainerButtonContainerThree">
                                                <div className="homeJournalContainerBottomContainerBottomContainerThreeContainerButtonContainerThreeContainer">
                                                    <p className="homeJournalContainerBottomContainerBottomContainerThreeContainerButtonContainerThreeContainerText">
                                                        ]
                                                    </p>
                                                </div>
                                            </div>

                                            </div>




                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeJournal