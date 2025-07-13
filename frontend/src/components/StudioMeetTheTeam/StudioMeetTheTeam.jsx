import React, { useEffect, useRef } from 'react';
import './studioMeetTheTeam.css';
import assets from '../../assets/assets';

const StudioMeetTheTeam = () => {
  const sectionRef = useRef(null);
  const rightContainerRef = useRef(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const rightContainer = rightContainerRef.current;
    let isScrollingHorizontally = false;
    let isSectionActive = false;
    let initialRightPosition = 0;
    let lastScrollY = window.scrollY;
    let scrollingUpInSection = false;
    
    // Calculate initial position
    const calculateInitialPosition = () => {
      if (rightContainer) {
        // Set the initial position to show only the first column
        const containerWidth = rightContainer.scrollWidth;
        const viewportWidth = window.innerWidth;
        initialRightPosition = containerWidth - viewportWidth + 100; // Adjust as needed
        
        // Set initial position with all content to the right
        rightContainer.style.transform = `translateX(${initialRightPosition}px)`;
      }
    };
    
    // Calculate on load and resize
    calculateInitialPosition();
    window.addEventListener('resize', calculateInitialPosition);
    
    // Function to check if we should block scrolling up
    const shouldBlockScrollUp = () => {
      if (!isSectionActive || !rightContainer) return false;
      
      const currentTransform = rightContainer.style.transform;
      const currentX = currentTransform 
        ? parseInt(currentTransform.replace('translateX(', '').replace('px)', '')) 
        : initialRightPosition;
      
      // If the grid is not fully right, block upward scrolling
      return currentX < initialRightPosition;
    };
    
    // Intersection observer to detect when section comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isSectionActive = true;
          isScrollingHorizontally = true;
          document.body.style.overflow = 'hidden'; // Prevent vertical scroll
        } else {
          // Only deactivate if we're not scrolling up within the section
          if (!scrollingUpInSection) {
            isSectionActive = false;
          }
        }
      });
    }, { threshold: 0.5 });
    
    if (section) {
      observer.observe(section);
    }
    
    // Capture scroll events to detect direction
    const handleScroll = () => {
      // Detect scroll direction
      const scrollDirection = window.scrollY > lastScrollY ? 'down' : 'up';
      
      // If scrolling up and section is in view or just above
      if (scrollDirection === 'up') {
        const sectionRect = section.getBoundingClientRect();
        const isSectionVisible = sectionRect.top <= window.innerHeight && sectionRect.bottom >= 0;
        
        if (isSectionVisible && shouldBlockScrollUp()) {
          // We're scrolling up while the section is visible and grid not at initial position
          scrollingUpInSection = true;
          
          // Force scroll position to stay at the section top
          // This effectively blocks upward scrolling until horizontal scrolling completes
          if (sectionRect.top < 10 && sectionRect.top > -10) {
            window.scrollTo({
              top: window.scrollY - sectionRect.top,
              behavior: 'instant'
            });
          }
        } else {
          scrollingUpInSection = false;
        }
      } else {
        scrollingUpInSection = false;
      }
      
      lastScrollY = window.scrollY;
    };
    
    // Handle wheel events
    const handleWheel = (e) => {
      if (!isSectionActive) return;
      
      // Current position of the grid
      const currentTransform = rightContainer?.style.transform || '';
      const currentX = currentTransform 
        ? parseInt(currentTransform.replace('translateX(', '').replace('px)', '')) 
        : initialRightPosition;
      
      // When scrolling up and the section is active
      if (e.deltaY < 0 && isSectionActive) {
        // If the grid is not in its rightmost position (initial position),
        // we need to move it back to the right first before allowing vertical scroll
        if (currentX < initialRightPosition) {
          e.preventDefault();
          document.body.style.overflow = 'hidden'; // Prevent vertical scroll
          isScrollingHorizontally = true;
          
          // Calculate new position (moving right when scrolling up)
          let newX = currentX - e.deltaY; // e.deltaY is negative when scrolling up
          newX = Math.min(newX, initialRightPosition); // Don't go beyond initial position
          
          // Apply the new position
          rightContainer.style.transform = `translateX(${newX}px)`;
          
          // If we've reached the initial position and still trying to scroll up more
          if (newX >= initialRightPosition) {
            // Only now allow vertical scrolling to continue
            isScrollingHorizontally = false;
            document.body.style.overflow = '';
          }
          
          return; // Exit here, don't process further
        }
      }
      
      // For scrolling down or other cases when horizontal scrolling is active
      if (isScrollingHorizontally && rightContainer) {
        e.preventDefault();
        
        // Calculate new position for scrolling down (moving left)
        let newX = currentX - e.deltaY;
        
        // Limits for scrolling
        const minX = 0; // Fully scrolled to the left
        const maxX = initialRightPosition; // Starting position (right)
        
        newX = Math.max(minX, Math.min(maxX, newX));
        
        // Apply new position
        rightContainer.style.transform = `translateX(${newX}px)`;
        
        // Check if we reached the left limit when scrolling down
        if (newX === minX && e.deltaY > 0) {
          // We've scrolled all the way left and trying to scroll more down
          isScrollingHorizontally = false;
          document.body.style.overflow = ''; // Enable vertical scrolling again
          
          // Let a small delay before enabling vertical scroll
          setTimeout(() => {
            window.scrollBy(0, 1); // Tiny scroll to continue natural movement
          }, 50);
        }
      }
    };
    
    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: false });
    
    // Create a passive scroll event to ensure we can detect scrolling up even when blocked
    let scrollTimeout;
    const passiveScrollMonitor = () => {
      if (isSectionActive && shouldBlockScrollUp()) {
        // If we're trying to scroll up while grid is not at initial position,
        // ensure horizontal scrolling is re-engaged
        isScrollingHorizontally = true;
        document.body.style.overflow = 'hidden';
      }
      
      scrollTimeout = setTimeout(passiveScrollMonitor, 100);
    };
    passiveScrollMonitor();
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateInitialPosition);
      observer.disconnect();
      document.body.style.overflow = ''; // Reset overflow on unmount
      clearTimeout(scrollTimeout);
    };
  }, []);
  
  return (
    <div className='studioMeetTheTeam' ref={sectionRef}>
      <div className="studioMeetTheTeamContainer">
        {/* Left Part */}
        <div className="studioMeetTheTeamContainerLeft">
          <div className="studioMeetTheTeamContainerLeftContainer">
            <p className="studioMeetTheTeamContainerLeftContainerText">
              meet the team
            </p>
          </div>
        </div>

        {/* Right Part */}
        <div className="studioMeetTheTeamContainerRight">
          <div className="studioMeetTheTeamContainerRightContainer" ref={rightContainerRef}>




            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>







            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
                    </div>
                  </div>
                </div>
              </div>
            </div>





            

            {/* Elememnt */}
            <div className="studioMeetTheTeamContainerRightContainerElement">
              <div className="studioMeetTheTeamContainerRightContainerElementContainer">
                {/* Left Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerLeft">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainer">
                    {/* Top Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTop">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerTopContainerText">
                          AJ Scheuble
                        </p>
                      </div>
                    </div>

                    {/* Bottom Part */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottom">
                      <div className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainer">
                        <p className="studioMeetTheTeamContainerRightContainerElementContainerLeftContainerBottomContainerText">
                          Senior Associate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Part */}
                <div className="studioMeetTheTeamContainerRightContainerElementContainerRight">
                  <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainer">
                    {/* Image Container */}
                    <div className="studioMeetTheTeamContainerRightContainerElementContainerRightContainerImage">
                      <img src={assets.StudioMeetTheTeamOne} alt="" className='studioMeetTheTeamContainerRightContainerElementContainerRightContainerImageImg' />
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

export default StudioMeetTheTeam
