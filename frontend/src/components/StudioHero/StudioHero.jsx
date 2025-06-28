import React, { useEffect } from 'react';
import './studioHero.css';
import assets from '../../assets/assets';

const StudioHero = () => {
  useEffect(() => {
    // Parallax effect for absolutely positioned StudioHero text
    const handleScroll = () => {
      const studioHeroText = document.querySelector('.studioHeroTextParallax');
      const imageContainer = document.querySelector('.studioHeroContainerImageContainerImage');
      if (studioHeroText && imageContainer) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const imageTop = imageContainer.getBoundingClientRect().top + window.scrollY;
        const imageHeight = imageContainer.offsetHeight;
        // Calculate progress only while the image is in view
        if (scrollTop >= imageTop && scrollTop <= imageTop + imageHeight) {
          const progress = (scrollTop - imageTop) / imageHeight;
          const maxTranslate = imageHeight * 0.5; // 50% of image height
          const translateY = progress * maxTranslate;
          studioHeroText.style.transform = `translateY(${translateY}px)`;
        } else if (scrollTop < imageTop) {
          studioHeroText.style.transform = 'translateY(0px)';
        } else {
          const maxTranslate = imageHeight * 0.5;
          studioHeroText.style.transform = `translateY(${maxTranslate}px)`;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='studioHero'>
      <div className="studioHeroContainer">
        {/* Image */}
        <div className="studioHeroContainerImage">
          <div className="studioHeroContainerImageContainer">
            <div className="studioHeroContainerImageContainerImage">
              <img src={assets.StudioHeroImage} alt="" className='studioHeroContainerImageContainerImageImg' />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="studioHeroContainerText studioHeroTextParallax">
          <div className="studioHeroContainerTextContainer">
            <div className="studioHeroContainerTextContainerOne">
              <div className="studioHeroContainerTextContainerOneContainer">
                <div className="studioHeroContainerTextContainerOneContainerLeft">
                  <div className="studioHeroContainerTextContainerOneContainerLeftContainer">
                    <p className="studioHeroContainerTextContainerOneContainerLeftContainerText">
                      cape town, johannesburg, rsa
                    </p>
                  </div>
                </div>

                <div className="studioHeroContainerTextContainerOneContainerRight">
                  <div className="studioHeroContainerTextContainerOneContainerRightContainer">
                    <div className="studioHeroContainerTextContainerOneContainerRightContainerOne">
                      <div className="studioHeroContainerTextContainerOneContainerRightContainerOneContainer">
                        <div className="studioHeroContainerTextContainerOneContainerRightContainerOneContainerOne">
                          <p className="studioHeroContainerTextContainerOneContainerRightContainerOneContainerOneText">
                            [
                          </p>
                        </div>

                        <div className="studioHeroContainerTextContainerOneContainerRightContainerOneContainerTwo">
                          <p className="studioHeroContainerTextContainerOneContainerRightContainerOneContainerTwoText">
                            est. 1998
                          </p>
                        </div>
                        
                        <div className="studioHeroContainerTextContainerOneContainerRightContainerOneContainerThree">
                          <p className="studioHeroContainerTextContainerOneContainerRightContainerOneContainerThreeText">
                            ]
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="studioHeroContainerTextContainerOneContainerRightContainerTwo">
                      <div className="studioHeroContainerTextContainerOneContainerRightContainerTwoContainer">
                        <p className="studioHeroContainerTextContainerOneContainerRightContainerTwoContainerText">
                          dhk
                        </p>
                      </div>
                    </div>

                    <div className="studioHeroContainerTextContainerOneContainerRightContainerThree">
                      <div className="studioHeroContainerTextContainerOneContainerRightContainerThreeContainer">
                        <p className="studioHeroContainerTextContainerOneContainerRightContainerThreeContainerText">
                          architecture, urban design, interior design
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="studioHeroContainerTextContainerTwo">
              <div className="studioHeroContainerTextContainerTwoContainer">
                <p className="studioHeroContainerTextContainerTwoContainerText">
                  our studio
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudioHero