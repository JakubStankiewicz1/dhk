import React from 'react';
import './journal.css';
import JournalNavbar from '../../components/JournalNavbar/JournalNavbar';
import JournalHeader from '../../components/JournalHeader/JournalHeader';
import JournalArticles from '../../components/JournalArticles/JournalArticles';

const Journal = () => {
  return (
    <div className='journal'>
        <JournalNavbar />
        <JournalHeader />
        <JournalArticles />
    </div>
  )
}

export default Journal