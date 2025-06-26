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
];

const HomeAwards = () => {
  const [hoveredAward, setHoveredAward] = useState(null);

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
            {/* Left Part - Awards List */}
            <div className="homeAwardsContainerRightContainerLeft">
              {awards.map((award, index) => (
                <div 
                  key={index}
                  className="homeAwardsItem"
                  onMouseEnter={() => setHoveredAward(index)}
                  onMouseLeave={() => setHoveredAward(null)}
                >
                  <div className="homeAwardsItemYear">{award.year}</div>
                  <div className="homeAwardsItemText">
                    <div className="homeAwardsItemTextOne">{award.textOne}</div>
                    <div className="homeAwardsItemTextTwo">{award.textTwo}</div>
                  </div>
                  <div className="homeAwardsItemProject">{award.textThree}</div>
                </div>
              ))}
            </div>

            {/* Right Part - Image Display */}
            <div className="homeAwardsContainerRightContainerRight">
              {hoveredAward !== null && (
                <div className="homeAwardsImageContainer">
                  <img 
                    src={awards[hoveredAward].image} 
                    alt={awards[hoveredAward].textThree}
                    className="homeAwardsImage"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Part */}
      <div className="homeAwardsContainerRightContainerBottom">
        <div className="homeAwardsContainerRightContainerBottomContainer">
          <div className="homeAwardsContainerRightContainerBottomContainerButton">
            <div className="homeAwardsContainerRightContainerBottomContainerButtonContainer">
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
    </div>
  );
};

export default HomeAwards;
