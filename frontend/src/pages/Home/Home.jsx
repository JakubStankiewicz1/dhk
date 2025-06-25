import React from 'react';
import './home.css';
import HomeHero from '../../components/HomeHero/HomeHero';

const Home = () => {
  return (
    <div className='home'>
      <HomeHero />
      <div className="content-section">
        <h2>Pozostała treść strony</h2>
        <p>Tu jest reszta Twojej strony, która będzie normalnie scrollowała się po animacji.</p>
        <div style={{ height: '200vh', background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)' }}>
          <p>Długa sekcja do testowania scrollu...</p>
        </div>
      </div>
    </div>
  )
}

export default Home