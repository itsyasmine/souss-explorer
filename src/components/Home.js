// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import '../styles/Home.css';
import logo from '../assets/logo.svg';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <img src={logo} alt="Souss Explorer Logo" className="logo" />
        <h1>SOUSS EXPLORER</h1>
        <p className="tagline">Découvrez Souss-Massa !</p>
      </div>
      
      <div className="featured-content">
        {/* <h2>Explorez</h2>
        
        <div className="category-grid">
          <Link to="/monuments" className="category-card">
            <div className="category-icon monuments-icon"></div>
            <h3>Monuments</h3>
          </Link>
          
          <Link to="/culture" className="category-card">
            <div className="category-icon culture-icon"></div>
            <h3>Culture</h3>
          </Link>
          
          <Link to="/recettes" className="category-card">
            <div className="category-icon recettes-icon"></div>
            <h3>Recettes</h3>
          </Link>
          
          <Link to="/quiz" className="category-card">
            <div className="category-icon quiz-icon"></div>
            <h3>Quiz</h3>
          </Link>
        </div> */}
        
        <div className="featured-location">
          <h2>À découvrir</h2>
          <Link to="/monuments/agadir-oufella" className="feature-card">
            <div className="feature-image agadir-oufella"></div>
            <div className="feature-info">
              <h3>Agadir Oufella</h3>
              <p>Forteresse du XVIe siècle surplombant la ville d'Agadir</p>
            </div>
          </Link>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
}

export default Home;