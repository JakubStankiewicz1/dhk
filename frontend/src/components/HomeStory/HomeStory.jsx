import React, { useEffect } from 'react';
import './homeStory.css';
import assets from '../../assets/assets';
import { useTheme } from '../../contexts/ThemeContext';

const HomeStory = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Parallax effect for text section
    const handleScroll = () => {
      const homeStoryText = document.querySelector('.homeStoryContainerTextParalax');
      const homeStorySection = document.querySelector('.homeStory');
      
      if (homeStoryText && homeStorySection) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const sectionTop = homeStorySection.offsetTop;
        const sectionHeight = homeStorySection.offsetHeight;
        
        // Sprawdzamy czy jesteśmy w obszarze sekcji homeStory
        if (scrollTop >= sectionTop && scrollTop <= sectionTop + sectionHeight) {
          // Obliczamy progress w sekcji (0 na początku, 1 na końcu)
          const sectionProgress = (scrollTop - sectionTop) / sectionHeight;
          
          // Animacja parallax - tekst przesuwa się w dół płynnie
          const maxTranslate = window.innerHeight * 0.5; // 80vh maksymalny ruch
          const translateY = sectionProgress * maxTranslate;
          
          homeStoryText.style.transform = `translateX(100%) translateY(calc(-96vh + ${translateY}px))`;
        } else if (scrollTop < sectionTop) {
          // Przed sekcją - pozycja początkowa
          homeStoryText.style.transform = `translateX(100%) translateY(-96vh)`;
        } else {
          // Po sekcji - pozycja końcowa
          const maxTranslate = window.innerHeight * 0.4;
          homeStoryText.style.transform = `translateX(100%) translateY(calc(-96vh + ${maxTranslate}px))`;
        }
      }
    };

    // Dodajemy event listener do window scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`homeStory ${theme}`}>
        <div className="homeStoryContainer">

            {/* Images Section */}
            <div className="homeStoryContainerImages">
                <div className="homeStoryContainerImagesContainer">
                    {/* Top Part */}
                    <div className="homeStoryContainerImagesContainerTop">
                        <div className="homeStoryContainerImagesContainerTopContainer">
                            <div className="homeStoryContainerImagesContainerTopContainerImage">
                                <img src={assets.HomeStoryImgOne} alt="" className='homeStoryContainerImagesContainerTopContainerImageImg' />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="homeStoryContainerImagesContainerBottom">
                        <div className="homeStoryContainerImagesContainerBottomContainer">
                            <div className="homeStoryContainerImagesContainerBottomContainerImage">
                                <img src={assets.HomeStoryImgTwo} alt="" className='homeStoryContainerImagesContainerBottomContainerImageImg' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Text Section */}
            <div className="homeStoryContainerText homeStoryContainerTextParalax">
                <div className="homeStoryContainerTextContainer">
                    {/* Left Part */}
                    <div className="homeStoryContainerTextContainerLeft">
                        <div className="homeStoryContainerTextContainerLeft">
                            <div className="homeStoryContainerTextContainerLeftButton">
                                <p className="homeStoryContainerTextContainerLeftButtonTextOne">
                                    [
                                </p>

                                <p className="homeStoryContainerTextContainerLeftButtonTextTwo">
                                    our story
                                </p>

                                <p className="homeStoryContainerTextContainerLeftButtonTextThree">
                                    ]
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Part */}
                    <div className="homeStoryContainerTextContainerRight">
                        <div className="homeStoryContainerTextContainerRightContainer">
                            <div className="homeStoryContainerTextContainerRightContainerOne">
                                <div className="homeStoryContainerTextContainerRightContainerOneContainer">
                                    <p className="homeStoryContainerTextContainerRightContainerOneContainerText">
                                        dhk Architects was established in 1998 in a merger between Derick Henstra Architects and KCvR Architects. Today, we’re one of the largest and leading architectural studios in Africa. Since then, we’ve delivered award-winning buildings, urban designs and interior spaces in South Africa, across the continent and beyond. We have studios in Cape Town and Johannesburg and deliver for clients all over the world.
                                    </p>
                                </div>
                            </div>

                            <div className="homeStoryContainerTextContainerRightContainerTwo">
                                <div className="homeStoryContainerTextContainerRightContainerTwoContainer">
                                    <p className="homeStoryContainerTextContainerRightContainerTwoContainerText">
                                        Our team of over 100 people comprises multidisciplinary design professionals and technologists, supported by experienced and talented BIM experts, architectural visualisers, graphic designers, communication specialists, administrators, HR and finance specialists. We also work collaboratively with experts in other disciplines at all stages of our projects, from design concept to practical completion.
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

export default HomeStory