import React from 'react';
import './homeJournal.css';
import HomeJournalElement from '../HomeJournalElement/HomeJournalElement';
import assets from '../../assets/assets';

const HomeJournal = () => {
  // Dane dla każdego elementu journal
  const journalData = [
    {
      image: assets.HomeJournalElementOne,
      category: 'events',
      title: 'dhk architects to participate in architecture.za',
      description: 'Presented since 2010, the AZA2025 urban festival returns to unite international and local architects, cultural producers, thought leaders, academics and students in the built environment to exchange and discover innovative,'
    },
    {
      image: assets.HomeJournalElementTwo,
      category: 'people',
      title: 'dhk welcomes Norman Foster Institute students and faculty members',
      description: 'dhk Architects welcomed seven students and three faculty members from the Norman Foster Instiute to its Cape Town studio to engage and share insights into architecture and urban design.'
    },
    {
      image: assets.HomeJournalElementThree,
      category: 'people',
      title: 'East Africa: Positioning for Opportunity',
      description: 'IN May, dhk Architects sttended the 12th annual East Africa Property Investment (EAPI) Summit held in Nairobi, Kenya. dhk Partner Peter Stokes and Senior Interior Designer Khalalelo Mosime from our sister comany dhk Interior Design'
    },
    {
      image: assets.HomeJournalElementFour,
      category: 'career',
      title: 'current vacancies at dhk',
      description: 'We have various roles open at dhk Architects. Architests, technologists, interior designes and urban designers. Apply now.'
    },
    {
      image: assets.HomeJournalElementFive,
      category: 'career',
      title: 'meet christiaan van aswegen, one of our newly promoted associates',
      description: 'Between January and April this year, dhk Architects announced ten promotions, stregthening the senior leadership team and reflecting our strategy of expansion within the studio. Professional Architect Christiaan'
    }
  ];

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
                                    <HomeJournalElement 
                                        image={journalData[0].image}
                                        category={journalData[0].category}
                                        title={journalData[0].title}
                                        description={journalData[0].description}
                                    />
                                </div>
                            </div>

                            <div className="homeJournalContainerBottomContainerTopContainerTwo">
                                <div className="homeJournalContainerBottomContainerTopContainerTwoContainer">
                                    <HomeJournalElement 
                                        image={journalData[1].image}
                                        category={journalData[1].category}
                                        title={journalData[1].title}
                                        description={journalData[1].description}
                                    />
                                </div>
                            </div>

                            <div className="homeJournalContainerBottomContainerTopContainerThree">
                                <div className="homeJournalContainerBottomContainerTopContainerThreeContainer">
                                    <HomeJournalElement 
                                        image={journalData[2].image}
                                        category={journalData[2].category}
                                        title={journalData[2].title}
                                        description={journalData[2].description}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="homeJournalContainerBottomContainerBottom">
                        <div className="homeJournalContainerBottomContainerBottomContainer">
                            <div className="homeJournalContainerBottomContainerBottomContainerOne">
                                <div className="homeJournalContainerBottomContainerBottomContainerOneContainer">
                                    <HomeJournalElement 
                                        image={journalData[3].image}
                                        category={journalData[3].category}
                                        title={journalData[3].title}
                                        description={journalData[3].description}
                                    />
                                </div>
                            </div>

                            <div className="homeJournalContainerBottomContainerBottomContainerTwo">
                                <div className="homeJournalContainerBottomContainerBottomContainerTwoContainer">
                                    <HomeJournalElement 
                                        image={journalData[4].image}
                                        category={journalData[4].category}
                                        title={journalData[4].title}
                                        description={journalData[4].description}
                                    />
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