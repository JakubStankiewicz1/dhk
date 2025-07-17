import React, { useState } from "react";
import "./homeAwards.css";
import assets from "../../assets/assets";

const awards = [
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "API Awards Finalist",
    textTwo: "Best high-end Residential",
    textThree: "The Rubik",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "API Awards Finalist",
    textTwo: "Best category",
    textThree: "Eclipse Waterfall",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  },
  {
    image: assets.HomeAwardsImgOne,
    year: "2024",
    textOne: "Scape Awards Finalist",
    textTwo: "Modern Design",
    textThree: "Grand Hotel",
  }

];

const HomeAwards = () => {
  const [hoveredAward, setHoveredAward] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10); // Domyślnie pokazuj 10 elementów

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 10); // Dodaj kolejne 10
  };

  const visibleAwards = awards.slice(0, visibleCount); // Pokaż tylko określoną liczbę nagród
  const hasMoreAwards = visibleCount < awards.length; // Sprawdź czy są jeszcze nagrody do załadowania

  return (
    <div className="homeAwards">
      <div className="homeAwardsContainer">
        {/* Left Part */}
        <div className="homeAwardsContainerLeft">
          <div className="homeAwardsContainerLeftContainer">
            <p className="homeAwardsContainerLeftContainerText">awards</p>
          </div>
        </div>




        {/* Right Part */}
        <div className="homeAwardsContainerRight">
          <div className="homeAwardsContainerRightContainer">


            {/* Right Part - Image Display */}
            <div className="homeAwardsContainerRightContainerRight">
              {hoveredAward !== null && (
                <div 
                  className={`homeAwardsImageContainer visible`}
                  style={{
                    transform: `translateY(${hoveredAward * 28}px)`,
                    transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  }}
                >
                  <img 
                    src={awards[hoveredAward].image} 
                    alt={awards[hoveredAward].textThree}
                    className="homeAwardsImage"
                  />
                </div>
              )}
            </div>


            {/* Left Part - Awards List */}
            <div className="homeAwardsContainerRightContainerLeft">
              {visibleAwards.map((award, index) => (
                <div 
                  key={index}
                  className="homeAwardsItem"
                  onMouseEnter={() => setHoveredAward(index)}
                  onMouseLeave={() => setHoveredAward(null)}
                >

                  <div className="homeAwardsItemOne">
                    <div className="homeAwardsItemYear">{award.year}</div>
                    <div className="homeAwardsItemText">
                      <div className="homeAwardsItemTextOne">{award.textOne}</div>
                      <div className="homeAwardsItemTextTwo">{award.textTwo}</div>
                    </div>
                  </div>

                  <div className="homeAwardsItemProject">{award.textThree}</div>
                </div>
              ))}
            </div>

            



          </div>
        </div>




      </div>

      {/* Bottom Part */}
      {hasMoreAwards && (
        <div className="homeAwardsContainerRightContainerBottom">
          <div className="homeAwardsContainerRightContainerBottomContainer">
            <div className="homeAwardsContainerRightContainerBottomContainerButton">
              <div 
                className="homeAwardsContainerRightContainerBottomContainerButtonContainer"
                onClick={loadMore}
                style={{ cursor: 'pointer' }}
              >
                <div className="homeAwardsContainerRightContainerBottomContainerButtonContainerOne">
                  <p className="homeAwardsContainerRightContainerBottomContainerButtonContainerOneText">[</p>
                </div>

                <div className="homeAwardsContainerRightContainerBottomContainerButtonContainerTwo">
                  <p className="homeAwardsContainerRightContainerBottomContainerButtonContainerTwoText">load more</p>
                </div>

                <div className="homeAwardsContainerRightContainerBottomContainerButtonContainerThree">
                  <p className="homeAwardsContainerRightContainerBottomContainerButtonContainerThreeText">]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeAwards;
