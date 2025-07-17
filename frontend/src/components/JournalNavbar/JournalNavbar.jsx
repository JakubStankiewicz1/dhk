import React, { useState, useEffect, useRef } from 'react';
import './journalNavbar.css';
import { RiArrowDownSLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';

const JournalNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = (item) => {
    setIsDropdownOpen(false);
    // Tutaj możesz dodać logikę filtrowania artykułów
    console.log('Selected:', item.label);
  };

  // Zamknij dropdown przy kliknięciu poza nim
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownItems = [
    { id: 'all', label: 'all articles' },
    { id: 'insights', label: 'insights' },
    { id: 'friends', label: 'friends' },
    { id: 'events', label: 'events' },
    { id: 'press', label: 'press' },
    { id: 'career', label: 'career' },
    { id: 'studio', label: 'studio' },
    { id: 'sustainability', label: 'sustainability' },
    { id: 'people', label: 'people' },
    { id: 'projects', label: 'projects' }
  ];
  return (
    <div className='journalNavbar'>
        <div className="journalNavbarContainer">
            {/* Left Part */}
            <div className="journalNavbarContainerLeft">
                <div className="journalNavbarContainerLeftContainer">
                    <div className="journalNavbarContainerLeftContainerOne">
                        <div className="journalNavbarContainerLeftContainerOneDiv">
                        <NavLink to="/menu" className="journalNavbarContainerLeftContainerOneContainer">
                            <p className="journalNavbarContainerLeftContainerOneContainerText">
                                home
                            </p>
                        </NavLink>

                        <div className="journalNavbarContainerLeftContainerOneHover">
                            <div className="journalNavbarContainerLeftContainerOneHoverCont">
                                <p className="journalNavbarContainerLeftContainerOneHoverContText">
                                    dhk
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="journalNavbarContainerLeftContainerTwo">
                        <div className="journalNavbarContainerLeftContainerTwoContainer">
                            <div className="journalNavbarContainerLeftContainerTwoContainerLeft">
                                <div className="journalNavbarContainerLeftContainerTwoContainerLeftContainer">
                                    <div className="journalNavbarContainerLeftContainerTwoContainerLeftContainerOne">
                                        <p className="journalNavbarContainerLeftContainerTwoContainerLeftContainerOneText">
                                            [
                                        </p>
                                    </div>

                                    <div className="journalNavbarContainerLeftContainerTwoContainerLeftContainerTwo">
                                        <div className={`journalNavbarContainerLeftContainerTwoContainerLeftContainerTwoContainer ${isDropdownOpen ? 'rotated' : ''}`}>
                                            <RiArrowDownSLine className='journalNavbarContainerLeftContainerTwoContainerLeftContainerTwoContainerIcon' />
                                        </div>
                                    </div>

                                    <div className="journalNavbarContainerLeftContainerTwoContainerLeftContainerThree">
                                        <p className="journalNavbarContainerLeftContainerTwoContainerLeftContainerThreeText">
                                            ]
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="journalNavbarContainerLeftContainerTwoContainerRight" ref={dropdownRef}>
                                <div className="journalNavbarContainerLeftContainerTwoContainerRightContainer" onClick={toggleDropdown}>
                                    <p className="journalNavbarContainerLeftContainerTwoContainerRightContainerText">
                                        all articles
                                    </p>
                                </div>

                                <div className={`journalNavbarContainerLeftContainerTwoContainerRightDropdown ${isDropdownOpen ? 'open' : ''}`}>
                                    {dropdownItems.map((item) => (
                                        <div 
                                            key={item.id} 
                                            className="journalNavbarContainerLeftContainerTwoContainerRightDropdownItem"
                                            onClick={() => handleItemClick(item)}
                                        >
                                            <p className="journalNavbarContainerLeftContainerTwoContainerRightDropdownItemText">
                                                {item.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="journalNavbarContainerLeftContainerTwoContainerRightHover">
                                    <div className="journalNavbarContainerLeftContainerTwoContainerRightHoverCont">
                                        <p className="journalNavbarContainerLeftContainerTwoContainerRightHoverContText">
                                            news
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="journalNavbarContainerLeftContainerThree">
                        <div className="journalNavbarContainerLeftContainerThreeContainer">
                            <div className="journalNavbarContainerLeftContainerThreeContainerOne">
                                <NavLink to="/menu" className="journalNavbarContainerLeftContainerThreeContainerOneContainer">
                                    <p className="journalNavbarContainerLeftContainerThreeContainerOneContainerText">
                                        projects,
                                    </p>
                                </NavLink>

                                <div className="journalNavbarContainerLeftContainerThreeContainerOneHover">
                                    <div className="journalNavbarContainerLeftContainerThreeContainerOneHoverCont">
                                        <p className="journalNavbarContainerLeftContainerThreeContainerOneHoverContText">
                                            portfolio
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="journalNavbarContainerLeftContainerThreeContainerTwo">
                                <NavLink to="/menu" className="journalNavbarContainerLeftContainerThreeContainerTwoContainer">
                                    <p className="journalNavbarContainerLeftContainerThreeContainerTwoContainerText">
                                        studio,
                                    </p>
                                </NavLink>

                                <div className="journalNavbarContainerLeftContainerThreeContainerTwoHover">
                                    <div className="journalNavbarContainerLeftContainerThreeContainerTwoHoverCont">
                                        <p className="journalNavbarContainerLeftContainerThreeContainerTwoHoverContText">
                                            team
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="journalNavbarContainerLeftContainerThreeContainerThree">
                                <div className="journalNavbarContainerLeftContainerThreeContainerThreeContainer">
                                    <div className="journalNavbarContainerLeftContainerThreeContainerThreeContainerOne">
                                        <p className="journalNavbarContainerLeftContainerThreeContainerThreeContainerOneText">
                                            journal
                                        </p>
                                    </div>

                                    <div className="journalNavbarContainerLeftContainerThreeContainerThreeContainerTwo">
                                        <div className="journalNavbarContainerLeftContainerThreeContainerThreeContainerTwoDiv" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Part */}
            <div className="journalNavbarContainerRight">
                <NavLink to="/menu" className="journalNavbarContainerRightContainer">
                    <p className="journalNavbarContainerRightContainerText">
                        menu
                    </p>
                </NavLink>

                {/* <div className="journalNavbarContainerRightHover">
                    <div className="journalNavbarContainerRightHoverCont">
                        <p className="journalNavbarContainerRightHoverContText">
                            nav
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default JournalNavbar