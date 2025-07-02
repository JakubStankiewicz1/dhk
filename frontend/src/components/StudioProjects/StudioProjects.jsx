import React, { useEffect } from 'react';
import './studioProjects.css';
import assets from '../../assets/assets';

const StudioProjects = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const sectionTop = document.querySelector('.studioProjects').getBoundingClientRect().top + window.scrollY;
      const sectionHeight = document.querySelector('.studioProjects').offsetHeight;

      // Parallax effect for right side text (normal)
      const rightText = document.querySelector('.studioProjectsRightTextParallax');
      if (rightText) {
        if (scrollTop >= sectionTop && scrollTop <= sectionTop + sectionHeight) {
          const progress = (scrollTop - sectionTop) / sectionHeight;
          const maxTranslate = sectionHeight * 0.5;
          const translateY = progress * maxTranslate;
          rightText.style.transform = `translateY(${translateY}px)`;
        } else if (scrollTop < sectionTop) {
          rightText.style.transform = 'translateY(0px)';
        } else {
          const maxTranslate = sectionHeight * 0.02;
          rightText.style.transform = `translateY(${maxTranslate}px)`;
        }
      }

      // Parallax effect for right side image (normal)
      const rightImage = document.querySelector('.studioProjectsRightImageParallax');
      if (rightImage) {
        if (scrollTop >= sectionTop && scrollTop <= sectionTop + sectionHeight) {
          const progress = (scrollTop - sectionTop) / sectionHeight;
          const maxTranslate = sectionHeight * 0.2;
          const translateY = progress * maxTranslate;
          rightImage.style.transform = `translateY(${translateY}px)`;
        } else if (scrollTop < sectionTop) {
          rightImage.style.transform = 'translateY(0px)';
        } else {
          const maxTranslate = sectionHeight * 0.2;
          rightImage.style.transform = `translateY(${maxTranslate}px)`;
        }
      }

      // Reverse parallax effect for left side images
      const leftImages = document.querySelector('.studioProjectsLeftImagesReverse');
      if (leftImages) {
        if (scrollTop >= sectionTop && scrollTop <= sectionTop + sectionHeight) {
          const progress = (scrollTop - sectionTop) / sectionHeight;
          const maxTranslate = sectionHeight * 0.2;
          const translateY = -progress * maxTranslate; // Negative for reverse effect
          leftImages.style.transform = `translateY(${translateY}px)`;
        } else if (scrollTop < sectionTop) {
          leftImages.style.transform = 'translateY(0px)';
        } else {
          const maxTranslate = sectionHeight * 0.2;
          leftImages.style.transform = `translateY(${-maxTranslate}px)`;
        }
      }

      // Reverse parallax effect for left side text
    //   const leftText = document.querySelector('.studioProjectsLeftTextReverse');
    //   if (leftText) {
    //     if (scrollTop >= sectionTop && scrollTop <= sectionTop + sectionHeight) {
    //       const progress = (scrollTop - sectionTop) / sectionHeight;
    //       const maxTranslate = sectionHeight * 0.25;
    //       const translateY = -progress * maxTranslate; // Negative for reverse effect
    //       leftText.style.transform = `translateY(${translateY}px)`;
    //     } else if (scrollTop < sectionTop) {
    //       leftText.style.transform = 'translateY(0px)';
    //     } else {
    //       const maxTranslate = sectionHeight * 0.25;
    //       leftText.style.transform = `translateY(${-maxTranslate}px)`;
    //     }
    //   }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='studioProjects'>
        <div className="studioProjectsContainer">
            {/* Left Part */}
            <div className="studioProjectsContainerleftLeft">
                <div className="studioProjectsContainerleftLeftContainer">
                    <div className="studioProjectsContainerleftLeftContainerImages studioProjectsLeftImagesReverse">
                        <div className="studioProjectsContainerleftLeftContainerOne">
                            <div className="studioProjectsContainerleftLeftContainerOneContainer">
                                <div className="studioProjectsContainerleftLeftContainerOneContainerImage">
                                    <img src={assets.StudioProjectsImgOne} alt="" className='studioProjectsContainerleftLeftContainerOneContainerImageImg' />
                                </div>
                            </div>
                        </div>

                        <div className="studioProjectsContainerleftLeftContainerTwo">
                            <div className="studioProjectsContainerleftLeftContainerTwoContainer">
                                <div className="studioProjectsContainerleftLeftContainerTwoContainerImage">
                                    <img src={assets.StudioProjectsImgTwo} alt="" className='studioProjectsContainerleftLeftContainerTwoContainerImageImg' />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="studioProjectsContainerleftLeftContainerText studioProjectsLeftTextReverse">
                        <div className="studioProjectsContainerleftLeftContainerTextContainer">
                            <p className="studioProjectsContainerleftLeftContainerTextContainerText">
                                Design dna
                            </p>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Right Part */}
            <div className="studioProjectsContainerRight">
                <div className="studioProjectsContainerRightContainer">
                    <div className="studioProjectsContainerRightContainerImage studioProjectsRightImageParallax">
                        <div className="studioProjectsContainerRightContainerImageContainer">
                            <div className="studioProjectsContainerRightContainerImageContainerImage">
                                <img src={assets.StudioProjectsImgThree} alt="" className='studioProjectsContainerRightContainerImageContainerImageImg' />
                            </div>
                        </div>
                    </div>

                    {/* <div className="studioProjectsContainerRightContainerText studioProjectsRightTextParallax">
                        <div className="studioProjectsContainerRightContainerTextContainer">
                            <div className="studioProjectsContainerRightContainerTextContainerOne">
                                <div className="studioProjectsContainerRightContainerTextContainerOneContainer">
                                    <div className="studioProjectsContainerRightContainerTextContainerOneContainerOne">
                                        <p className="studioProjectsContainerRightContainerTextContainerOneContainerOneText">
                                            [
                                        </p>
                                    </div>

                                    <div className="studioProjectsContainerRightContainerTextContainerOneContainerTwo">
                                        <p className="studioProjectsContainerRightContainerTextContainerOneContainerTwoText">
                                            our projects
                                        </p>
                                    </div>

                                    <div className="studioProjectsContainerRightContainerTextContainerOneContainerThree">
                                        <p className="studioProjectsContainerRightContainerTextContainerOneContainerThreeText">
                                            ]
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="studioProjectsContainerRightContainerTextContainerTwo">
                                <div className="studioProjectsContainerRightContainerTextContainerTwoContainer">
                                    <p className="studioProjectsContainerRightContainerTextContainerTwoContainerText">
                                        Our strength as a design-led studio arises from a unique blend of creative talent, technical capability, implementation expertise and commercial strategy. We have a collaborative mindset and a global outlook. We’re always exploring new possibilities in advanced technologies, materials and design forms. We’re committed to being involved from first sketch to final construction, adding value at every stage. Each design is intentionally integrated into its unique social, environmental, cultural and functional context with quiet confidence and understated flair.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>


        
        
        {/* Bottom ? */}
        <div className="studioProjectsBtm">
            <div className="studioProjectsBtmContainer studioProjectsRightTextParallax">
                <div className="studioProjectsBtmContainerLeft">
                    <div className="studioProjectsContainerleftLeftContainerText">
                        <div className="studioProjectsContainerleftLeftContainerTextContainer">
                            <p className="studioProjectsContainerleftLeftContainerTextContainerText">
                                Design dna
                            </p>
                        </div>
                    </div>
                </div>

                <div className="studioProjectsBtmContainerRight">
                    <div className="studioProjectsContainerRightContainerText">
                        <div className="studioProjectsContainerRightContainerTextContainer">
                            <div className="studioProjectsContainerRightContainerTextContainerOne">
                                <div className="studioProjectsContainerRightContainerTextContainerOneContainer">
                                    <div className="studioProjectsContainerRightContainerTextContainerOneContainerOne">
                                        <p className="studioProjectsContainerRightContainerTextContainerOneContainerOneText">
                                            [
                                        </p>
                                    </div>

                                    <div className="studioProjectsContainerRightContainerTextContainerOneContainerTwo">
                                        <p className="studioProjectsContainerRightContainerTextContainerOneContainerTwoText">
                                            our projects
                                        </p>
                                    </div>

                                    <div className="studioProjectsContainerRightContainerTextContainerOneContainerThree">
                                        <p className="studioProjectsContainerRightContainerTextContainerOneContainerThreeText">
                                            ]
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="studioProjectsContainerRightContainerTextContainerTwo">
                                <div className="studioProjectsContainerRightContainerTextContainerTwoContainer">
                                    <p className="studioProjectsContainerRightContainerTextContainerTwoContainerText">
                                        Our strength as a design-led studio arises from a unique blend of creative talent, technical capability, implementation expertise and commercial strategy. We have a collaborative mindset and a global outlook. We’re always exploring new possibilities in advanced technologies, materials and design forms. We’re committed to being involved from first sketch to final construction, adding value at every stage. Each design is intentionally integrated into its unique social, environmental, cultural and functional context with quiet confidence and understated flair.
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

export default StudioProjects