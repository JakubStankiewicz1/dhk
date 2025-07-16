import React from 'react';
import './homeJournalElement.css';
import assets from '../../assets/assets';

const HomeJournalElement = () => {
  return (
    <div className="homeJournalElement">
        <div className="homeJournalElementContainer">
            {/* Top Part - Main Visual (Always visible, never moves) */}
            <div className="homeJournalElementContainerTop">
                <div className="homeJournalElementContainerTopContainer">
                    <div className="homeJournalElementContainerTopContainerContent">
                        <img src={assets.HomeJournalElementOne} alt="" className='homeJournalElementContainerTopContainerContentImg' />
                    </div>
                </div>
            </div>

            {/* Bottom Part - Overlay Content (Slides up on hover) */}
            <div className="homeJournalElementContainerBottom">
                <div className="homeJournalElementContainerBottomContainer">
                    <div className="homeJournalElementContainerBottomContainerTop">
                        <div className="homeJournalElementContainerBottomContainerContainer">
                            <div className="homeJournalElementContainerBottomContainerContainerOne">
                                <div className="homeJournalElementContainerBottomContainerContainerOneContainer">
                                    <p className="homeJournalElementContainerBottomContainerContainerOneContainerText">
                                        events
                                    </p>
                                </div>
                            </div>

                            <div className="homeJournalElementContainerBottomContainerContainerTwo">
                                <div className="homeJournalElementContainerBottomContainerContainerTwoContainer">
                                    <p className="homeJournalElementContainerBottomContainerContainerTwoContainerText">
                                        dhk architects to participate in architecture.za
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="homeJournalElementContainerBottomContainerBottom">
                        <div className="homeJournalElementContainerBottomContainerBottomContainer">
                            <p className="homeJournalElementContainerBottomContainerBottomContainerText">
                                Presented since 2010, the AZA2025 urban festival returns to unite international and local architects, cultural producers, thought leaders, academics and students in the built environment to exchange and discover innovative,
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeJournalElement