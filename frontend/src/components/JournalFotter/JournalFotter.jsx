import React, { useState } from 'react';
import './journalFotter.css';

const JournalFotter = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  // Funkcja do ustawienia kursora na początku inputu
  const handleInputFocus = (event) => {
    // Małe opóźnienie żeby React zaktualizował DOM
    setTimeout(() => {
      event.target.setSelectionRange(0, 0);
    }, 0);
  };
  return (
    <div className='journalFotter'>
        <div className="journalFotterContainer">
            {/* Left Part */}
            <div className="journalFotterContainerLeft">
                <div className="journalFotterContainerLeftContainer">
                    <div className="journalFotterContainerLeftContainerOne">
                        <div className="journalFotterContainerLeftContainerOneContainer">
                            <p className="journalFotterContainerLeftContainerOneContainerText">
                                all rights reserved.dhk@2025
                            </p>
                        </div>
                    </div>

                    <div className="journalFotterContainerLeftContainerTwo">
                        <div className="journalFotterContainerLeftContainerTwoContainer">
                            <p className="journalFotterContainerLeftContainerTwoContainerText">
                                privacy policy
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Part */}
            <div className="journalFotterContainerRight">
                <div className="journalFotterContainerRightContainer">
                    <div className="journalFotterContainerRightContainerOne">
                        <div className="journalFotterContainerRightContainerOneContaine">
                            <div className="journalFotterContainerRightContainerOneContaineOne">
                                <div className="journalFotterContainerRightContainerOneContaineOneContainer">
                                    <p className="journalFotterContainerRightContainerOneContaineOneContainerText">
                                        home
                                    </p>
                                </div>
                            </div>

                            <div className="journalFotterContainerRightContainerOneContaineTwo">
                                <div className="journalFotterContainerRightContainerOneContaineTwoContainer">
                                    <p className="journalFotterContainerRightContainerOneContaineTwoContainerText">
                                        projects
                                    </p>
                                </div>
                            </div>

                            <div className="journalFotterContainerRightContainerOneContaineThree">
                                <div className="journalFotterContainerRightContainerOneContaineThreeContainer">
                                    <p className="journalFotterContainerRightContainerOneContaineThreeContainerText">
                                        studio
                                    </p>
                                </div>
                            </div>

                            <div className="journalFotterContainerRightContainerOneContaineFour">
                                <div className="journalFotterContainerRightContainerOneContaineFourContainer">
                                    <div className="journalFotterContainerRightContainerOneContaineFourContainerLeft">
                                        <div className="journalFotterContainerRightContainerOneContaineFourContainerLeftDiv" />
                                    </div>

                                    <div className="journalFotterContainerRightContainerOneContaineFourContainerRight">
                                        <p className="journalFotterContainerRightContainerOneContaineFourContainerRightText">
                                            journal
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="journalFotterContainerRightContainerTwo">
                        <div className="journalFotterContainerRightContainerTwoContainer">
                            <div className="journalFotterContainerRightContainerTwoContainerOne">
                                <div className="journalFotterContainerRightContainerTwoContainerOneContainer">
                                    <p className="journalFotterContainerRightContainerTwoContainerOneContainerText">
                                        instagram
                                    </p>
                                </div>
                            </div>

                            <div className="journalFotterContainerRightContainerTwoContainerTwo">
                                <div className="journalFotterContainerRightContainerTwoContainerTwoContainer">
                                    <p className="journalFotterContainerRightContainerTwoContainerTwoContainerText">
                                        linkedin
                                    </p>
                                </div>
                            </div>

                            <div className="journalFotterContainerRightContainerTwoContainerThree">
                                <div className="journalFotterContainerRightContainerTwoContainerThreeContainer">
                                    <p className="journalFotterContainerRightContainerTwoContainerThreeContainerText">
                                        facebook
                                    </p>
                                </div>
                            </div>

                            <div className="journalFotterContainerRightContainerTwoContainerFour">
                                <div className="journalFotterContainerRightContainerTwoContainerFourContainer">
                                    <p className="journalFotterContainerRightContainerTwoContainerFourContainerText">
                                        pinterest
                                    </p>
                                </div>
                            </div>

                            <div className="journalFotterContainerRightContainerTwoContainerFive">
                                <div className="journalFotterContainerRightContainerTwoContainerFiveContainer">
                                    <p className="journalFotterContainerRightContainerTwoContainerFiveContainerText">
                                        vimeo
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="journalFotterContainerRightContainerThree">
                        <div className="journalFotterContainerRightContainerThreeContainer">
                            <div className="journalFotterContainerRightContainerThreeContainerOne">
                                <div className="journalFotterContainerRightContainerThreeContainerOneContainer">
                                    <p className="journalFotterContainerRightContainerThreeContainerOneContainerText">
                                        newsletter
                                    </p>
                                </div>
                            </div>

                            <div className="journalFotterContainerRightContainerThreeContainerTwo">
                                <div className="journalFotterContainerRightContainerThreeContainerTwoContainer">
                                    <div className="journalFotterContainerRightContainerThreeContainerTwoContainerInputWrapper">
                                        {fullName && (
                                            <div className="journalFotterContainerRightContainerThreeContainerTwoContainerInputIndicator">
                                                <span className="journalFotterContainerRightContainerThreeContainerTwoContainerInputIndicatorText">
                                                    [x]
                                                </span>
                                            </div>
                                        )}
                                        <input 
                                            type="text" 
                                            placeholder='full name' 
                                            className='journalFotterContainerRightContainerThreeContainerTwoContainerInput'
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            onFocus={handleInputFocus}
                                            onClick={handleInputFocus}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="journalFotterContainerRightContainerThreeContainerThree">
                                <div className="journalFotterContainerRightContainerThreeContainerThreeContainer">
                                    <div className="journalFotterContainerRightContainerThreeContainerThreeContainerInputWrapper">
                                        {email && (
                                            <div className="journalFotterContainerRightContainerThreeContainerThreeContainerInputIndicator">
                                                <span className="journalFotterContainerRightContainerThreeContainerThreeContainerInputIndicatorText">
                                                    [x]
                                                </span>
                                            </div>
                                        )}
                                        <input 
                                            type="text" 
                                            placeholder='email address' 
                                            className='journalFotterContainerRightContainerThreeContainerThreeContainerInput'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onFocus={handleInputFocus}
                                            onClick={handleInputFocus}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="journalFotterContainerRightContainerThreeContainerFour">
                                <div className="journalFotterContainerRightContainerThreeContainerFourContainer">
                                    <div className="journalFotterContainerRightContainerThreeContainerFourContainerDiv">
                                    <div className="journalFotterContainerRightContainerThreeContainerFourContainerOne">
                                        <div className="journalFotterContainerRightContainerThreeContainerFourContainerOneContainer">
                                            <p className="journalFotterContainerRightContainerThreeContainerFourContainerOneContainerText">
                                                [
                                            </p>
                                        </div>
                                    </div>

                                    <div className="journalFotterContainerRightContainerThreeContainerFourContainerTwo">
                                        <div className="journalFotterContainerRightContainerThreeContainerFourContainerTwoContainer">
                                            <p className="journalFotterContainerRightContainerThreeContainerFourContainerTwoContainerText">
                                                submit
                                            </p>
                                        </div>
                                    </div>

                                    <div className="journalFotterContainerRightContainerThreeContainerFourContainerThree">
                                        <div className="journalFotterContainerRightContainerThreeContainerFourContainerThreeContainer">
                                            <p className="journalFotterContainerRightContainerThreeContainerFourContainerThreeContainerText">
                                                ]
                                            </p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="journalFotterContainerRightContainerFour">
                        <div className="journalFotterContainerRightContainerFourContainer">
                            <div className="journalFotterContainerRightContainerFourContainerOne">
                                <div className="journalFotterContainerRightContainerFourContainerOneContainer">
                                    <p className="journalFotterContainerRightContainerFourContainerOneContainerText">
                                        [
                                    </p>
                                </div>
                            </div>

                            <div className="journalFotterContainerRightContainerFourContainerTwo">
                                <div className="journalFotterContainerRightContainerFourContainerTwoContainer">
                                    <p className="journalFotterContainerRightContainerFourContainerTwoContainerText">
                                        contact us
                                    </p>
                                </div>
                            </div>

                            <div className="journalFotterContainerRightContainerFourContainerThree">
                                <div className="journalFotterContainerRightContainerFourContainerThreeContainer">
                                    <p className="journalFotterContainerRightContainerFourContainerThreeContainerText">
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
  )
}

export default JournalFotter