import React, { useState } from 'react';
import './homeFotter.css';

const HomeFotter = () => {
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
    <div className='homeFotter'>
        <div className="homeFotterContainer">
            {/* Left Part */}
            <div className="homeFotterContainerLeft">
                <div className="homeFotterContainerLeftContainer">
                    <div className="homeFotterContainerLeftContainerOne">
                        <div className="homeFotterContainerLeftContainerOneContainer">
                            <p className="homeFotterContainerLeftContainerOneContainerText">
                                all rights reserved.dhk@2025
                            </p>
                        </div>
                    </div>

                    <div className="homeFotterContainerLeftContainerTwo">
                        <div className="homeFotterContainerLeftContainerTwoContainer">
                            <p className="homeFotterContainerLeftContainerTwoContainerText">
                                privacy policy
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Part */}
            <div className="homeFotterContainerRight">
                <div className="homeFotterContainerRightContainer">
                    <div className="homeFotterContainerRightContainerOne">
                        <div className="homeFotterContainerRightContainerOneContainer">
                            <div className="homeFotterContainerRightContainerOneContainerOne">
                                <div className="homeFotterContainerRightContainerOneContainerOneContainer">
                                    <div className="homeFotterContainerRightContainerOneContainerOneContainerOne">
                                        <div className="homeFotterContainerRightContainerOneContainerOneContainerOneDiv" />
                                    </div>

                                    <div className="homeFotterContainerRightContainerOneContainerOneContainerTwo">
                                        <p className="homeFotterContainerRightContainerOneContainerOneContainerTwoText">
                                            home
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="homeFotterContainerRightContainerOneContainerTwo">
                                <div className="homeFotterContainerRightContainerOneContainerTwoContainer">
                                    <p className="homeFotterContainerRightContainerOneContainerTwoContainerText">
                                        projects
                                    </p>
                                </div>
                            </div>

                            <div className="homeFotterContainerRightContainerOneContainerThree">
                                <div className="homeFotterContainerRightContainerOneContainerThreeContainer">
                                    <p className="homeFotterContainerRightContainerOneContainerThreeContainerText">
                                        studio
                                    </p>
                                </div>
                            </div>

                            <div className="homeFotterContainerRightContainerOneContainerFour">
                                <div className="homeFotterContainerRightContainerOneContainerFourContainer">
                                    <p className="homeFotterContainerRightContainerOneContainerFourContainerText">
                                        journal
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="homeFotterContainerRightContainerTwo">
                        <div className="homeFotterContainerRightContainerTwoContainer">
                            <div className="homeFotterContainerRightContainerTwoContainerOne">
                                <div className="homeFotterContainerRightContainerTwoContainerOneContainer">
                                    <p className="homeFotterContainerRightContainerTwoContainerOneContainerText">
                                        instagram
                                    </p>
                                </div>
                            </div>

                            <div className="homeFotterContainerRightContainerTwoContainerTwo">
                                <div className="homeFotterContainerRightContainerTwoContainerTwoContainer">
                                    <p className="homeFotterContainerRightContainerTwoContainerTwoContainerText">
                                        linkedin
                                    </p>
                                </div>
                            </div>

                            <div className="homeFotterContainerRightContainerTwoContainerThree">
                                <div className="homeFotterContainerRightContainerTwoContainerThreeContainer">
                                    <p className="homeFotterContainerRightContainerTwoContainerThreeContainerText">
                                        facebook
                                    </p>
                                </div>
                            </div>

                            <div className="homeFotterContainerRightContainerTwoContainerFour">
                                <div className="homeFotterContainerRightContainerTwoContainerFourContainer">
                                    <p className="homeFotterContainerRightContainerTwoContainerFourContainerText">
                                        pinterest
                                    </p>
                                </div>
                            </div>

                            <div className="homeFotterContainerRightContainerTwoContainerFive">
                                <div className="homeFotterContainerRightContainerTwoContainerFiveContainer">
                                    <p className="homeFotterContainerRightContainerTwoContainerFiveContainerText">
                                        vimeo
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="homeFotterContainerRightContainerThree">
                        <div className="homeFotterContainerRightContainerThreeContainer">
                            <div className="homeFotterContainerRightContainerThreeContainerOne">
                                <div className="homeFotterContainerRightContainerThreeContainerOneContainer">
                                    <p className="homeFotterContainerRightContainerThreeContainerOneContainerText">
                                        newsletter
                                    </p>
                                </div>
                            </div>

                            <div className="homeFotterContainerRightContainerThreeContainerTwo">
                                <div className="homeFotterContainerRightContainerThreeContainerTwoContainer">
                                    <div className="homeFotterContainerRightContainerThreeContainerTwoContainerInputWrapper">
                                        {fullName && (
                                            <div className="homeFotterContainerRightContainerThreeContainerTwoContainerInputIndicator">
                                                <span className="homeFotterContainerRightContainerThreeContainerTwoContainerInputIndicatorText">
                                                    [x]
                                                </span>
                                            </div>
                                        )}
                                        <input 
                                            type="text" 
                                            placeholder='full name' 
                                            className='homeFotterContainerRightContainerThreeContainerTwoContainerInput'
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            onFocus={handleInputFocus}
                                            onClick={handleInputFocus}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="homeFotterContainerRightContainerThreeContainerThree">
                                <div className="homeFotterContainerRightContainerThreeContainerThreeContainer">
                                    <div className="homeFotterContainerRightContainerThreeContainerThreeContainerInputWrapper">
                                        {email && (
                                            <div className="homeFotterContainerRightContainerThreeContainerThreeContainerInputIndicator">
                                                <span className="homeFotterContainerRightContainerThreeContainerThreeContainerInputIndicatorText">
                                                    [x]
                                                </span>
                                            </div>
                                        )}
                                        <input 
                                            type="text" 
                                            placeholder='email address' 
                                            className='homeFotterContainerRightContainerThreeContainerThreeContainerInput'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onFocus={handleInputFocus}
                                            onClick={handleInputFocus}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="homeFotterContainerRightContainerThreeContainerFour">
                                <div className="homeFotterContainerRightContainerThreeContainerFourContainer">
                                    <div className="homeFotterContainerRightContainerThreeContainerFourContainerDiv">
                                        <div className="homeFotterContainerRightContainerThreeContainerFourContainerOne">
                                            <div className="homeFotterContainerRightContainerThreeContainerFourContainerOneContainer">
                                                <p className="homeFotterContainerRightContainerThreeContainerFourContainerOneContainerText">
                                                    [
                                                </p>
                                            </div>
                                        </div>

                                        <div className="homeFotterContainerRightContainerThreeContainerFourContainerTwo">
                                            <div className="homeFotterContainerRightContainerThreeContainerFourContainerTwoContainer">
                                                <p className="homeFotterContainerRightContainerThreeContainerFourContainerTwoContainerText">
                                                    submit
                                                </p>
                                            </div>
                                        </div>

                                        <div className="homeFotterContainerRightContainerThreeContainerFourContainerFour">
                                            <div className="homeFotterContainerRightContainerThreeContainerFourContainerFourContainer">
                                                <p className="homeFotterContainerRightContainerThreeContainerFourContainerFourContainerText">
                                                    ]
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="homeFotterContainerRightContainerFour">
                        <div className="homeFotterContainerRightContainerFourContainer">
                            <div className="homeFotterContainerRightContainerFourContainerButton">
                                <div className="homeFotterContainerRightContainerFourContainerButtonOne">
                                    <div className="homeFotterContainerRightContainerFourContainerButtonOneContainer">
                                        <p className="homeFotterContainerRightContainerFourContainerButtonOneContainerText">
                                            [
                                        </p>
                                    </div>
                                </div>

                                <div className="homeFotterContainerRightContainerFourContainerButtonTwo">
                                    <div className="homeFotterContainerRightContainerFourContainerButtonTwoContainer">
                                        <p className="homeFotterContainerRightContainerFourContainerButtonTwoContainerText">
                                            contact us
                                        </p>
                                    </div>
                                </div>

                                <div className="homeFotterContainerRightContainerFourContainerButtonThree">
                                    <div className="homeFotterContainerRightContainerFourContainerButtonThreeContainer">
                                        <p className="homeFotterContainerRightContainerFourContainerButtonThreeContainerText">
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
  )
}

export default HomeFotter