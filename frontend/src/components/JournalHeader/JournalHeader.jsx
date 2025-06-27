import React from 'react';
import './journalHeader.css';

const JournalHeader = () => {
  return (
    <div className='journalHeader'>
        <div className="journalHeaderContainer">
            <div className="journalHeaderContainerText">
                <div className="journalHeaderContainerTextContainer">
                    <p className="journalHeaderContainerTextContainerText">
                        all articles
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default JournalHeader