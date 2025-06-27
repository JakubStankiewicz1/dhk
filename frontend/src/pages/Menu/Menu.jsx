import React from 'react';
import './menu.css';
import assets from '../../assets/assets';

const Menu = () => {
  return (
    <div className='menu'>
        <div className="menuContainer">
            {/* Top Part */}
            <div className="menuContainerTop">
                <div className="menuContainerTopContainer">
                    {/* Left Part */}
                    <div className="menuContainerTopContainerLeft">
                        <div className="menuContainerTopContainerLeftContainer">
                            <div className="menuContainerTopContainerLeftContainerOne">
                                <div className="menuContainerTopContainerLeftContainerOneContainer">
                                    <p className="menuContainerTopContainerLeftContainerOneContainerText">
                                        home,
                                    </p>
                                </div>
                            </div>

                            <div className="menuContainerTopContainerLeftContainerTwo">
                                <div className="menuContainerTopContainerLeftContainerTwoContainer">
                                    <p className="menuContainerTopContainerLeftContainerTwoContainerText">
                                        projects,
                                    </p>
                                </div>
                            </div>

                            <div className="menuContainerTopContainerLeftContainerThree">
                                <div className="menuContainerTopContainerLeftContainerThreeContainer">
                                    <p className="menuContainerTopContainerLeftContainerThreeContainerText">
                                        studio,
                                    </p>
                                </div>
                            </div>

                            <div className="menuContainerTopContainerLeftContainerFour">
                                <div className="menuContainerTopContainerLeftContainerFourContainer">
                                    <p className="menuContainerTopContainerLeftContainerFourContainerText">
                                        journal
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Part */}
                    <div className="menuContainerTopContainerRight">
                        <div className="menuContainerTopContainerRightContainer">
                            <div className="menuContainerTopContainerRightContainerOne">
                                <div className="menuContainerTopContainerRightContainerOneContainer">
                                    <p className="menuContainerTopContainerRightContainerOneContainerText">
                                        close
                                    </p>
                                </div>
                            </div>

                            <div className="menuContainerTopContainerRightContainerTwo">
                                <div className="menuContainerTopContainerRightContainerTwoDiv" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>







            {/* Middle Part */}
            <div className="menuContainerMiddle">
                <div className="menuContainerMiddleContainer">
                    {/* Left Part */}
                    <div className="menuContainerMiddleContainerLeft">
                        <div className="menuContainerMiddleContainerLeftContainer">
                            <div className="menuContainerMiddleContainerLeftContainerOne">
                                <div className="menuContainerMiddleContainerLeftContainerOneContainer">
                                    <p className="menuContainerMiddleContainerLeftContainerOneContainerText">
                                        newsletter
                                    </p>
                                </div>
                            </div>

                            <div className="menuContainerMiddleContainerLeftContainerTwo">
                                <div className="menuContainerMiddleContainerLeftContainerTwoContainer">
                                    <input type="text" placeholder='full name' className='menuContainerMiddleContainerLeftContainerTwoContainerInput' />
                                </div>
                            </div>

                            <div className="menuContainerMiddleContainerLeftContainerThree">
                                <div className="menuContainerMiddleContainerLeftContainerThreeContainer">
                                    <input type="text" placeholder='email address' className='menuContainerMiddleContainerLeftContainerThreeContainerInput' />
                                </div>
                            </div>

                            <div className="menuContainerMiddleContainerLeftContainerFour">
                                <div className="menuContainerMiddleContainerLeftContainerFourContainer">
                                    <div className="menuContainerMiddleContainerLeftContainerFourContainerButton">
                                        <div className="menuContainerMiddleContainerLeftContainerFourContainerButtonOne">
                                            <div className="menuContainerMiddleContainerLeftContainerFourContainerButtonOneContainer">
                                                <p className="menuContainerMiddleContainerLeftContainerFourContainerButtonOneContainerText">
                                                    [
                                                </p>
                                            </div>
                                        </div>

                                        <div className="menuContainerMiddleContainerLeftContainerFourContainerButtonTwo">
                                            <div className="menuContainerMiddleContainerLeftContainerFourContainerButtonTwoContainer">
                                                <p className="menuContainerMiddleContainerLeftContainerFourContainerButtonTwoContainerText">
                                                    submit
                                                </p>
                                            </div>
                                        </div>

                                        <div className="menuContainerMiddleContainerLeftContainerFourContainerButtonThree">
                                            <div className="menuContainerMiddleContainerLeftContainerFourContainerButtonThreeContainer">
                                                <p className="menuContainerMiddleContainerLeftContainerFourContainerButtonThreeContainerText">
                                                    ]
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Part */}
                    <div className="menuContainerMiddleContainerMiddle">
                        <div className="menuContainerMiddleContainerMiddleContainer">
                            <div className="menuContainerMiddleContainerMiddleContainerOne">
                                <div className="menuContainerMiddleContainerMiddleContainerOneContainer">
                                    <p className="menuContainerMiddleContainerMiddleContainerOneContainerText">
                                        [
                                    </p>
                                </div>
                            </div>

                            <div className="menuContainerMiddleContainerMiddleContainerTwo">
                                <div className="menuContainerMiddleContainerMiddleContainerTwoContainer">
                                    <p className="menuContainerMiddleContainerMiddleContainerTwoContainerText">
                                        contact us
                                    </p>
                                </div>
                            </div>

                            <div className="menuContainerMiddleContainerMiddleContainerThree">
                                <div className="menuContainerMiddleContainerMiddleContainerThreeContainer">
                                    <p className="menuContainerMiddleContainerMiddleContainerThreeContainerText">
                                        ]
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Part */}
                    <div className="menuContainerMiddleContainerRight">
                        <div className="menuContainerMiddleContainerRightContainer">
                            <div className="menuContainerMiddleContainerRightContainerOne">
                                <div className="menuContainerMiddleContainerRightContainerOneContainer">
                                    <p className="menuContainerMiddleContainerRightContainerOneContainerText">
                                        instagram
                                    </p>
                                </div>
                            </div>

                            <div className="menuContainerMiddleContainerRightContainerTwo">
                                <div className="menuContainerMiddleContainerRightContainerTwoContainer">
                                    <p className="menuContainerMiddleContainerRightContainerTwoContainerText">
                                        linkedin
                                    </p>
                                </div>
                            </div>

                            <div className="menuContainerMiddleContainerRightContainerThree">
                                <div className="menuContainerMiddleContainerRightContainerThreeContainer">
                                    <p className="menuContainerMiddleContainerRightContainerThreeContainerText">
                                        facebook
                                    </p>
                                </div>
                            </div>

                            <div className="menuContainerMiddleContainerRightContainerFour">
                                <div className="menuContainerMiddleContainerRightContainerFourContainer">
                                    <p className="menuContainerMiddleContainerRightContainerFourContainerText">
                                        printerest
                                    </p>
                                </div>
                            </div>

                            <div className="menuContainerMiddleContainerRightContainerFive">
                                <div className="menuContainerMiddleContainerRightContainerFiveContainer">
                                    <p className="menuContainerMiddleContainerRightContainerFiveContainerText">
                                        vimeo
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>







            {/* Bottom Part */}
            <div className="menuContainerBottom">
                <div className="menuContainerBottomContainer">
                    {/* Left Part */}
                    <div className="menuContainerBottomContainerLeft">
                        <div className="menuContainerBottomContainerLeftContainer">
                            <div className="menuContainerBottomContainerLeftContainerOne">
                                <div className="menuContainerBottomContainerLeftContainerOneContainer">
                                    <div className="menuContainerBottomContainerLeftContainerOneContainerImage">
                                        <video src={assets.HomeVideoOne} className='menuContainerBottomContainerLeftContainerOneContainerImageVid'></video>
                                    </div>
                                </div>
                            </div>

                            <div className="menuContainerBottomContainerLeftContainerTwo">
                                <div className="menuContainerBottomContainerLeftContainerTwoContainer">
                                    <div className="menuContainerBottomContainerLeftContainerTwoContainerImage">
                                        <video src={assets.HomeVideoTwo} className='menuContainerBottomContainerLeftContainerTwoContainerImageVid'></video>
                                    </div>
                                </div>
                            </div>

                            <div className="menuContainerBottomContainerLeftContainerThree">
                                <div className="menuContainerBottomContainerLeftContainerThreeContainer">
                                    <div className="menuContainerBottomContainerLeftContainerThreeContainerImage">
                                        <video src={assets.HomeVideoThree} className='menuContainerBottomContainerLeftContainerThreeContainerImageVid'></video>
                                    </div>
                                </div>
                            </div>

                            <div className="menuContainerBottomContainerLeftContainerFour">
                                <div className="menuContainerBottomContainerLeftContainerFourContainer">
                                    <div className="menuContainerBottomContainerLeftContainerFourContainerImage">
                                        <video src={assets.HomeVideoFour} className='menuContainerBottomContainerLeftContainerFourContainerImageVid'></video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Part */}
                    <div className="menuContainerBottomContainerRight">
                        <div className="menuContainerBottomContainerRightContainer">
                            <div className="menuContainerBottomContainerRightContainerImage">
                                <img src={assets.MenuImage} alt="" className='menuContainerBottomContainerRightContainerImageImg' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Menu