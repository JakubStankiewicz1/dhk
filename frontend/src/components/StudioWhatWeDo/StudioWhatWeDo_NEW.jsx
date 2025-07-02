import React, { useState } from 'react';
import './studioWhatWeDo.css';
import assets from '../../assets/assets';

const StudioWhatWeDo = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      id: 'hospitality',
      title: 'hospitality',
      description: 'Create welcoming spaces that blend guest comfort with refined sophistication, aligned with the operator\'s brand ethos and operational requirements.',
      image: assets.StudioWhatWeDoImgOne
    },
    {
      id: 'interior-design',
      title: 'interior design',
      description: 'Through dhk Interior Design, create interior spaces that provide lasting value through materiality, susainable design and sophisticated detailing.',
      image: assets.StudioWhatWeDoImgTwo
    },
    {
      id: 'mixed-use',
      title: 'mixed-use',
      description: 'Build dynamic urban communities by weaving together living, working and lisure spaces designes to respond to their diverse functional needs.',
      image: assets.StudioWhatWeDoImgThree
    },
    {
      id: 'office',
      title: 'office',
      description: 'Desing progressive workplaces that inspire collaboration, engance wellbeing and adapt to the evolving needs of employers and emplyees alike.',
      image: assets.StudioWhatWeDoImgFour
    },
    {
      id: 'public-education',
      title: 'public + education',
      description: 'Shapre inclusive feature-ready environments desinged to  nature learning and enhance the experience of the people who use them.',
      image: assets.StudioWhatWeDoImgFive
    },
    {
      id: 'residential',
      title: 'residential',
      description: 'Deliver considered spaces that enrich daily life and optimise value for develoeprs through innovative space planning and sustainable construction.',
      image: assets.StudioWhatWeDoImgSix
    },
    {
      id: 'retail',
      title: 'retail',
      description: 'Design engaging retail environments that create memorable customer experiences and support successful commercial outcomes.',
      image: assets.StudioWhatWeDoImgSeven
    },
    {
      id: 'sustainable',
      title: 'sustainable',
      description: 'Infuse sustainability throughout our desing process, empowering clients and teams and embedding environmental principles from project inception to create meningful outcomes that enhance health, economic and social value.',
      image: assets.StudioWhatWeDoImgEight
    },
    {
      id: 'urban-design',
      title: 'urban design',
      description: 'Enhance urban lifestyle through integrated mesterpland that prioritise people, promote inclusive public spaces and build vibrant, healthy communities.',
      image: assets.StudioWhatWeDoImgNine
    }
  ];

  return (
    <div className='studioWhatWeDo'>
        <div className="studioWhatWeDoContainer">
            {/* Top Part */}
            <div className="studioWhatWeDoContainerTop">
                <div className="studioWhatWeDoContainerTopContainer">
                    <div className="studioWhatWeDoContainerTopContainerText">
                        <div className="studioWhatWeDoContainerTopContainerTextContainer">
                            <p className="studioWhatWeDoContainerTopContainerTextContainerText">
                                what we do
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Part */}
            <div className="studioWhatWeDoContainerBottom">
                <div className="studioWhatWeDoContainerBottomContainer">
                    <div className="studioWhatWeDoContainerBottomContainerContainer">
                        
                        {categories.map((category) => (
                            <div key={category.id} className="studioWhatWeDoContainerBottomContainerContainerOne">
                                {/* Top Part - Line */}
                                <div className="studioWhatWeDoContainerBottomContainerContainerOneTop">
                                    <div 
                                        className={`studioWhatWeDoContainerBottomContainerContainerOneTopDiv ${hoveredCategory === category.id ? 'visible' : ''}`} 
                                    />
                                </div>

                                {/* Bottom Part - Content */}
                                <div className="studioWhatWeDoContainerBottomContainerContainerOneContainer">
                                    {/* Left Part - Category Title */}
                                    <div 
                                        className="studioWhatWeDoContainerBottomContainerContainerOneContainerLeft"
                                        onMouseEnter={() => setHoveredCategory(category.id)}
                                        onMouseLeave={() => setHoveredCategory(null)}
                                    >
                                        <div className="studioWhatWeDoContainerBottomContainerContainerOneContainerLeftContainer">
                                            <p className="studioWhatWeDoContainerBottomContainerContainerOneContainerLeftContainerText">
                                                {category.title}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Middle Part - Image */}
                                    <div className={`studioWhatWeDoContainerBottomContainerContainerOneContainerMiddle ${hoveredCategory === category.id ? 'visible' : ''}`}>
                                        <div className="studioWhatWeDoContainerBottomContainerContainerOneContainerMiddleContainer">
                                            <div className="studioWhatWeDoContainerBottomContainerContainerOneContainerMiddleContainerImage">
                                                <img src={category.image} alt={category.title} className='studioWhatWeDoContainerBottomContainerContainerOneContainerMiddleContainerImageImg' />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Part - Description */}
                                    <div className={`studioWhatWeDoContainerBottomContainerContainerOneContainerRight ${hoveredCategory === category.id ? 'visible' : ''}`}>
                                        <div className="studioWhatWeDoContainerBottomContainerContainerOneContainerRightContainer">
                                            <div className="studioWhatWeDoContainerBottomContainerContainerOneContainerRightContainerDiv">
                                                <p className="studioWhatWeDoContainerBottomContainerContainerOneContainerRightContainerDivText">
                                                    {category.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StudioWhatWeDo
