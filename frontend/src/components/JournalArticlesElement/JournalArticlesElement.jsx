import React from 'react';
import './journalArticlesElement.css';
import assets from '../../assets/assets';

const JournalArticlesElement = ({ textOne, textTwo, textThree, image }) => {
  return (
    <div className='journalArticlesElement'>
        <div className="journalArticlesElementContainer">
            {/* Left Part */}
            <div className="journalArticlesElementContainerLeft">
                <div className="journalArticlesElementContainerLeftContainer">
                    <div className="journalArticlesElementContainerLeftContainerButton">
                        <div className="journalArticlesElementContainerLeftContainerButtonContainer">
                            <p className="journalArticlesElementContainerLeftContainerButtonContainerText">
                                {textOne}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Part */}
            <div className="journalArticlesElementContainerMiddle">
                <div className="journalArticlesElementContainerMiddleContainer">
                    <div className="journalArticlesElementContainerMiddleContainerTop">
                        <div className="journalArticlesElementContainerMiddleContainerTopContainer">
                            <p className="journalArticlesElementContainerMiddleContainerTopContainerText">
                                {textTwo}
                            </p>
                        </div>
                    </div>

                    <div className="journalArticlesElementContainerMiddleContainerBottom">
                        <div className="journalArticlesElementContainerMiddleContainerBottomContainer">
                            <p className="journalArticlesElementContainerMiddleContainerBottomContainerText">
                                {textThree}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Part */}
            <div className="journalArticlesElementContainerRight">
                <div className="journalArticlesElementContainerRightContainer">
                    {/* Image */}
                    <div className="journalArticlesElementContainerRightContainerImage">
                        <div className="journalArticlesElementContainerRightContainerImageContainer">
                            <img src={image} alt="" className='journalArticlesElementContainerRightContainerImageContainerImg' />
                        </div>
                    </div>

                    {/* Overlay */}
                    <div className="journalArticlesElementContainerRightContainerOverlay"></div>

                    {/* Text */}
                    <div className="journalArticlesElementContainerRightContainerText">

                        <div className="journalArticlesElementContainerRightContainerTextContainer">
                            <div className="journalArticlesElementContainerRightContainerTextContainerOne">
                                <p className="journalArticlesElementContainerRightContainerTextContainerOneText">
                                    [
                                </p>
                            </div>

                            <div className="journalArticlesElementContainerRightContainerTextContainerTwo">
                                <p className="journalArticlesElementContainerRightContainerTextContainerTwoText">
                                    read article
                                </p>
                            </div>

                            <div className="journalArticlesElementContainerRightContainerTextContainerThree">
                                <p className="journalArticlesElementContainerRightContainerTextContainerThreeText">
                                    ]
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default JournalArticlesElement