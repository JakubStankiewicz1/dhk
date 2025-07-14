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
    
    // Calculate initial position
    const calculateInitialPosition = () => {
      if (rightContainer) {
        // Get the total width of all elements
        const containerWidth = rightContainer.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        // Calculate the total number of columns
        const totalColumns = Math.ceil(rightContainer.querySelectorAll('.studioMeetTheTeamContainerRightContainerElement').length / 4);
        const columnWidth = 152 + 5; // Image width + gap (5px odstęp)
        
        // Update grid template for accurate column positioning
        rightContainer.style.gridTemplateColumns = `repeat(${totalColumns}, 152px)`;
        rightContainer.style.columnGap = '5px';
        rightContainer.style.rowGap = '5px';
        
        // Calculate exact position to show just the first column
        // Position element so only the first column is visible and aligned to the right edge of viewport
        const titleOffset = document.querySelector('.studioMeetTheTeamContainerLeft')?.offsetWidth || 300;
        const availableSpace = viewportWidth - titleOffset - 50; // 50px padding
        const columnsToShow = 1; // Show exactly 1 column
        const visibleWidth = columnsToShow * columnWidth;
        
        // Calculate how much to translate - ensure we see exactly one column initially
        initialRightPosition = containerWidth - visibleWidth - titleOffset;
        
        // Ensure additional space at end for full scrolling (matching the extra padding we added)
        const fullScrollPadding = 200;
        document.documentElement.style.setProperty('--team-grid-scroll-padding', `${fullScrollPadding}px`);
        
        // Set initial position with just first column visible
        rightContainer.style.transform = `translateX(${initialRightPosition}px)`;
        
        // Update CSS variable to control how far left we can scroll
        document.documentElement.style.setProperty('--team-grid-total-width', `${totalColumns * columnWidth + fullScrollPadding}px`);
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
          // Section is in view
          isSectionActive = true;
          
          // Start horizontal scrolling only if we're not at the initial position
          const currentTransform = rightContainer?.style.transform || '';
          const currentX = currentTransform 
            ? parseInt(currentTransform.replace('translateX(', '').replace('px)', '')) 
            : initialRightPosition;
            
          if (currentX < initialRightPosition) {
            isScrollingHorizontally = true;
            document.body.style.overflow = 'hidden';
          }
        } else {
          // Section is out of view
          isSectionActive = false;
          isScrollingHorizontally = false;
          document.body.style.overflow = '';
        }
      });
    }, { threshold: 0.2 }); // Trigger earlier
    
    if (section) {
      observer.observe(section);
    }
    
    // Capture scroll events to detect direction
    const handleScroll = () => {
      // Only do special handling if section is active
      if (!isSectionActive) return;
      
      // Detect scroll direction
      const scrollDirection = window.scrollY > lastScrollY ? 'down' : 'up';
      
      // If scrolling up and we're not at the initial right position
      if (scrollDirection === 'up' && shouldBlockScrollUp()) {
        // Force horizontal scrolling
        isScrollingHorizontally = true;
        document.body.style.overflow = 'hidden';
      }
      
      lastScrollY = window.scrollY;
    };
    
    // Handle wheel events
    const handleWheel = (e) => {
      // Skip if section is not active
      if (!isSectionActive || !rightContainer) return;
      
      // Current position of the grid
      const currentTransform = rightContainer.style.transform || '';
      const currentX = currentTransform 
        ? parseInt(currentTransform.replace('translateX(', '').replace('px)', '')) 
        : initialRightPosition;
      
      // When scrolling up and the section is active
      if (e.deltaY < 0) {
        // If the grid is not in its rightmost position (initial position),
        // we need to move it back to the right first before allowing vertical scroll
        if (currentX < initialRightPosition) {
          e.preventDefault();
          
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
          } else {
            // Still scrolling horizontally
            isScrollingHorizontally = true;
            document.body.style.overflow = 'hidden';
          }
        } else {
          // We're at the rightmost position, allow normal vertical scrolling
          isScrollingHorizontally = false;
          document.body.style.overflow = '';
        }
      } 
      // When scrolling down
      else if (e.deltaY > 0) {
        // Always engage horizontal scrolling first when starting to scroll down in this section
        if (currentX >= initialRightPosition) {
          // We're at the initial position (showing just the first column)
          isScrollingHorizontally = true;
          document.body.style.overflow = 'hidden';
        }
        
        if (isScrollingHorizontally) {
          e.preventDefault();
          
          // Calculate new position for scrolling down (moving left)
          let newX = currentX - e.deltaY;
          
          // Get total grid width to calculate limits
          const containerWidth = rightContainer.scrollWidth;
          const viewportWidth = window.innerWidth;
          const titleWidth = document.querySelector('.studioMeetTheTeamContainerLeft')?.offsetWidth || 300;
          
          // Calculate the absolute left limit (when all columns are visible)
          // Subtract additional space to ensure we can see all team members completely
          // Add more buffer to ensure full scrolling to the last column
          const minX = -(containerWidth - viewportWidth + 300);
          const maxX = initialRightPosition; // Starting position (right)
          
          newX = Math.max(minX, Math.min(maxX, newX));
          
          // Apply new position
          rightContainer.style.transform = `translateX(${newX}px)`;
          
          // Check if we reached the left limit when scrolling down
          if (newX <= minX) {
            // We've scrolled all the way left (all photos are now visible)
            isScrollingHorizontally = false;
            document.body.style.overflow = '';
            
            // Let a small delay before enabling vertical scroll
            setTimeout(() => {
              window.scrollBy(0, 1); // Tiny scroll to continue natural movement
            }, 50);
          }
        }
      }
    };
    
    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateInitialPosition);
      observer.disconnect();
      document.body.style.overflow = ''; // Reset overflow on unmount
    };
  }, []);
  
  return (
    <div className='studioMeetTheTeam' ref={sectionRef}>
      <div className="studioMeetTheTeamContainer">
        {/* Left Part */}
        <div className="studioMeetTheTeamContainerLeft">
          <div className="studioMeetTheTeamContainerLeftContainer">
            <div className="studioMeetTheTeamContainerLeftContainerText">meet the team</div>
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
