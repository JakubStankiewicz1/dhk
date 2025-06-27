import React, { useState } from 'react';
import './journalArticles.css';
import JournalArticlesElement from '../JournalArticlesElement/JournalArticlesElement';
import assets from '../../assets/assets';

const articlesData = [
  {
    textOne: "career",
    textTwo: "current vacancies at dhk",
    textThree: "We have various roles open at dhk Architects. Architects, technologists, interior designers and urban designers. Apply today.",
    image: assets.JournalArticlesImageOne
  },
  {
    textOne: "awards",
    textTwo: "RIBA National Award Winner",
    textThree: "Our latest project has been recognized with the prestigious RIBA National Award for architectural excellence and innovation.",
    image: assets.JournalArticlesImageTwo
  },
  {
    textOne: "projects",
    textTwo: "sustainable office development",
    textThree: "Exploring new approaches to sustainable workplace design through innovative materials and energy-efficient systems.",
    image: assets.JournalArticlesImageThree
  },
  {
    textOne: "research",
    textTwo: "future of urban living",
    textThree: "Our research team investigates emerging trends in urban development and their impact on community-centered design.",
    image: assets.JournalArticlesImageFour
  },
  {
    textOne: "news",
    textTwo: "expanding our team",
    textThree: "We're growing! Join our dynamic team of architects, urban planners, and design professionals working on exciting projects.",
    image: assets.JournalArticlesImageFive
  },
  {
    textOne: "events",
    textTwo: "architecture symposium 2024",
    textThree: "Don't miss our annual symposium featuring renowned speakers discussing the future of sustainable architecture.",
    image: assets.JournalArticlesImageSix
  },
  {
    textOne: "insights",
    textTwo: "designing for climate change",
    textThree: "How architecture can adapt to environmental challenges while creating beautiful, functional spaces for communities.",
    image: assets.JournalArticlesImageOne
  },
  {
    textOne: "culture",
    textTwo: "studio life at dhk",
    textThree: "Behind the scenes at our studio: collaborative design processes, innovative thinking, and creative problem-solving.",
    image: assets.JournalArticlesImageTwo
  },
  {
    textOne: "technology",
    textTwo: "digital design tools",
    textThree: "Embracing cutting-edge technology to enhance our design process and create more precise, efficient architectural solutions.",
    image: assets.JournalArticlesImageThree
  },
  {
    textOne: "community",
    textTwo: "local engagement projects",
    textThree: "Working directly with communities to create spaces that reflect their needs, values, and aspirations for the future.",
    image: assets.JournalArticlesImageFour
  },
  {
    textOne: "innovation",
    textTwo: "materials of tomorrow",
    textThree: "Exploring new building materials and construction techniques that will shape the future of sustainable architecture.",
    image: assets.JournalArticlesImageFive
  },
  {
    textOne: "education",
    textTwo: "mentoring young architects",
    textThree: "Our commitment to nurturing the next generation of architects through mentorship programs and educational initiatives.",
    image: assets.JournalArticlesImageSix
  },
  {
    textOne: "heritage",
    textTwo: "preserving architectural legacy",
    textThree: "Balancing respect for historical architecture with contemporary needs in our restoration and adaptive reuse projects.",
    image: assets.JournalArticlesImageOne
  },
  {
    textOne: "wellness",
    textTwo: "designing for wellbeing",
    textThree: "Creating spaces that promote physical and mental health through thoughtful design, natural light, and biophilic elements.",
    image: assets.JournalArticlesImageTwo
  },
  {
    textOne: "global",
    textTwo: "international collaborations",
    textThree: "Working with partners worldwide to share knowledge and create architecture that addresses global challenges.",
    image: assets.JournalArticlesImageThree
  },
  {
    textOne: "future",
    textTwo: "vision for 2030",
    textThree: "Our strategic vision for the next decade: pioneering sustainable design practices and fostering innovative architectural solutions.",
    image: assets.JournalArticlesImageFour
  },
  {
    textOne: "projects",
    textTwo: "sustainable office development",
    textThree: "Exploring new approaches to sustainable workplace design through innovative materials and energy-efficient systems.",
    image: assets.JournalArticlesImageThree
  },
  {
    textOne: "research",
    textTwo: "future of urban living",
    textThree: "Our research team investigates emerging trends in urban development and their impact on community-centered design.",
    image: assets.JournalArticlesImageFour
  },
  {
    textOne: "news",
    textTwo: "expanding our team",
    textThree: "We're growing! Join our dynamic team of architects, urban planners, and design professionals working on exciting projects.",
    image: assets.JournalArticlesImageFive
  },
  {
    textOne: "events",
    textTwo: "architecture symposium 2024",
    textThree: "Don't miss our annual symposium featuring renowned speakers discussing the future of sustainable architecture.",
    image: assets.JournalArticlesImageSix
  },
  {
    textOne: "insights",
    textTwo: "designing for climate change",
    textThree: "How architecture can adapt to environmental challenges while creating beautiful, functional spaces for communities.",
    image: assets.JournalArticlesImageOne
  },
  {
    textOne: "culture",
    textTwo: "studio life at dhk",
    textThree: "Behind the scenes at our studio: collaborative design processes, innovative thinking, and creative problem-solving.",
    image: assets.JournalArticlesImageTwo
  },
  {
    textOne: "technology",
    textTwo: "digital design tools",
    textThree: "Embracing cutting-edge technology to enhance our design process and create more precise, efficient architectural solutions.",
    image: assets.JournalArticlesImageThree
  },
  {
    textOne: "community",
    textTwo: "local engagement projects",
    textThree: "Working directly with communities to create spaces that reflect their needs, values, and aspirations for the future.",
    image: assets.JournalArticlesImageFour
  },
  {
    textOne: "innovation",
    textTwo: "materials of tomorrow",
    textThree: "Exploring new building materials and construction techniques that will shape the future of sustainable architecture.",
    image: assets.JournalArticlesImageFive
  },
  {
    textOne: "education",
    textTwo: "mentoring young architects",
    textThree: "Our commitment to nurturing the next generation of architects through mentorship programs and educational initiatives.",
    image: assets.JournalArticlesImageSix
  },
  {
    textOne: "heritage",
    textTwo: "preserving architectural legacy",
    textThree: "Balancing respect for historical architecture with contemporary needs in our restoration and adaptive reuse projects.",
    image: assets.JournalArticlesImageOne
  },
  {
    textOne: "wellness",
    textTwo: "designing for wellbeing",
    textThree: "Creating spaces that promote physical and mental health through thoughtful design, natural light, and biophilic elements.",
    image: assets.JournalArticlesImageTwo
  },
  {
    textOne: "global",
    textTwo: "international collaborations",
    textThree: "Working with partners worldwide to share knowledge and create architecture that addresses global challenges.",
    image: assets.JournalArticlesImageThree
  },
  {
    textOne: "future",
    textTwo: "vision for 2030",
    textThree: "Our strategic vision for the next decade: pioneering sustainable design practices and fostering innovative architectural solutions.",
    image: assets.JournalArticlesImageFour
  },
  {
    textOne: "projects",
    textTwo: "sustainable office development",
    textThree: "Exploring new approaches to sustainable workplace design through innovative materials and energy-efficient systems.",
    image: assets.JournalArticlesImageThree
  },
  {
    textOne: "research",
    textTwo: "future of urban living",
    textThree: "Our research team investigates emerging trends in urban development and their impact on community-centered design.",
    image: assets.JournalArticlesImageFour
  },
  {
    textOne: "news",
    textTwo: "expanding our team",
    textThree: "We're growing! Join our dynamic team of architects, urban planners, and design professionals working on exciting projects.",
    image: assets.JournalArticlesImageFive
  },
  {
    textOne: "events",
    textTwo: "architecture symposium 2024",
    textThree: "Don't miss our annual symposium featuring renowned speakers discussing the future of sustainable architecture.",
    image: assets.JournalArticlesImageSix
  },
  {
    textOne: "insights",
    textTwo: "designing for climate change",
    textThree: "How architecture can adapt to environmental challenges while creating beautiful, functional spaces for communities.",
    image: assets.JournalArticlesImageOne
  },
  {
    textOne: "culture",
    textTwo: "studio life at dhk",
    textThree: "Behind the scenes at our studio: collaborative design processes, innovative thinking, and creative problem-solving.",
    image: assets.JournalArticlesImageTwo
  },
  {
    textOne: "technology",
    textTwo: "digital design tools",
    textThree: "Embracing cutting-edge technology to enhance our design process and create more precise, efficient architectural solutions.",
    image: assets.JournalArticlesImageThree
  },
  {
    textOne: "community",
    textTwo: "local engagement projects",
    textThree: "Working directly with communities to create spaces that reflect their needs, values, and aspirations for the future.",
    image: assets.JournalArticlesImageFour
  },
  {
    textOne: "innovation",
    textTwo: "materials of tomorrow",
    textThree: "Exploring new building materials and construction techniques that will shape the future of sustainable architecture.",
    image: assets.JournalArticlesImageFive
  },
  {
    textOne: "education",
    textTwo: "mentoring young architects",
    textThree: "Our commitment to nurturing the next generation of architects through mentorship programs and educational initiatives.",
    image: assets.JournalArticlesImageSix
  },
  {
    textOne: "heritage",
    textTwo: "preserving architectural legacy",
    textThree: "Balancing respect for historical architecture with contemporary needs in our restoration and adaptive reuse projects.",
    image: assets.JournalArticlesImageOne
  },
  {
    textOne: "wellness",
    textTwo: "designing for wellbeing",
    textThree: "Creating spaces that promote physical and mental health through thoughtful design, natural light, and biophilic elements.",
    image: assets.JournalArticlesImageTwo
  },
  {
    textOne: "global",
    textTwo: "international collaborations",
    textThree: "Working with partners worldwide to share knowledge and create architecture that addresses global challenges.",
    image: assets.JournalArticlesImageThree
  },
  {
    textOne: "future",
    textTwo: "vision for 2030",
    textThree: "Our strategic vision for the next decade: pioneering sustainable design practices and fostering innovative architectural solutions.",
    image: assets.JournalArticlesImageFour
  },
  {
    textOne: "projects",
    textTwo: "sustainable office development",
    textThree: "Exploring new approaches to sustainable workplace design through innovative materials and energy-efficient systems.",
    image: assets.JournalArticlesImageThree
  },
  {
    textOne: "research",
    textTwo: "future of urban living",
    textThree: "Our research team investigates emerging trends in urban development and their impact on community-centered design.",
    image: assets.JournalArticlesImageFour
  },
  {
    textOne: "news",
    textTwo: "expanding our team",
    textThree: "We're growing! Join our dynamic team of architects, urban planners, and design professionals working on exciting projects.",
    image: assets.JournalArticlesImageFive
  },
  {
    textOne: "events",
    textTwo: "architecture symposium 2024",
    textThree: "Don't miss our annual symposium featuring renowned speakers discussing the future of sustainable architecture.",
    image: assets.JournalArticlesImageSix
  },
  {
    textOne: "insights",
    textTwo: "designing for climate change",
    textThree: "How architecture can adapt to environmental challenges while creating beautiful, functional spaces for communities.",
    image: assets.JournalArticlesImageOne
  },
  {
    textOne: "culture",
    textTwo: "studio life at dhk",
    textThree: "Behind the scenes at our studio: collaborative design processes, innovative thinking, and creative problem-solving.",
    image: assets.JournalArticlesImageTwo
  },
  {
    textOne: "technology",
    textTwo: "digital design tools",
    textThree: "Embracing cutting-edge technology to enhance our design process and create more precise, efficient architectural solutions.",
    image: assets.JournalArticlesImageThree
  },
  {
    textOne: "community",
    textTwo: "local engagement projects",
    textThree: "Working directly with communities to create spaces that reflect their needs, values, and aspirations for the future.",
    image: assets.JournalArticlesImageFour
  },
  {
    textOne: "innovation",
    textTwo: "materials of tomorrow",
    textThree: "Exploring new building materials and construction techniques that will shape the future of sustainable architecture.",
    image: assets.JournalArticlesImageFive
  },
  {
    textOne: "education",
    textTwo: "mentoring young architects",
    textThree: "Our commitment to nurturing the next generation of architects through mentorship programs and educational initiatives.",
    image: assets.JournalArticlesImageSix
  },
  {
    textOne: "heritage",
    textTwo: "preserving architectural legacy",
    textThree: "Balancing respect for historical architecture with contemporary needs in our restoration and adaptive reuse projects.",
    image: assets.JournalArticlesImageOne
  },
  {
    textOne: "wellness",
    textTwo: "designing for wellbeing",
    textThree: "Creating spaces that promote physical and mental health through thoughtful design, natural light, and biophilic elements.",
    image: assets.JournalArticlesImageTwo
  },
  {
    textOne: "global",
    textTwo: "international collaborations",
    textThree: "Working with partners worldwide to share knowledge and create architecture that addresses global challenges.",
    image: assets.JournalArticlesImageThree
  },
  {
    textOne: "future",
    textTwo: "vision for 2030",
    textThree: "Our strategic vision for the next decade: pioneering sustainable design practices and fostering innovative architectural solutions.",
    image: assets.JournalArticlesImageFour
  }
]

const JournalArticles = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  
  console.log('Component rendered. Visible count:', visibleCount);
  console.log('Articles data length:', articlesData.length);
  
  const handleLoadMore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // alert('Load more clicked!');
    // console.log('Load more clicked, current count:', visibleCount);
    // console.log('Total articles:', articlesData.length);
    setVisibleCount(prevCount => {
      const newCount = Math.min(prevCount + 6, articlesData.length);
      console.log('Previous count:', prevCount, 'New count will be:', newCount);
      return newCount;
    });
  };
  
  const hasMoreArticles = visibleCount < articlesData.length;
  console.log('Has more articles:', hasMoreArticles);
  return (
    <div className='journalArticles'>
        <div className="journalArticlesContainer">
            {articlesData.slice(0, visibleCount).map((article, index) => (
              <JournalArticlesElement 
                key={index}
                textOne={article.textOne}
                textTwo={article.textTwo}
                textThree={article.textThree}
                image={article.image}
              />
            ))}
        </div>

        {hasMoreArticles && (
          <div className="journalArticlesBottom">
            <div className="journalArticlesBottomContainer" onClick={handleLoadMore}>
              <div className="journalArticlesBottomContainerOne">
                <div className="journalArticlesBottomContainerOneContainer">
                  <p className="journalArticlesBottomContainerOneContainerText">
                    [
                  </p>
                </div>
              </div>

              <div className="journalArticlesBottomContainerTwo">
                <div className="journalArticlesBottomContainerTwoContainer">
                  <p className="journalArticlesBottomContainerTwoContainerText">
                    load more
                  </p>
                </div>
              </div>

              <div className="journalArticlesBottomContainerThree">
                <div className="journalArticlesBottomContainerThreeContainer">
                  <p className="journalArticlesBottomContainerThreeContainerText">
                    ]
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default JournalArticles