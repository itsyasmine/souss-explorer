// src/components/Navigation.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navigation.css';
import monumentIcon from '../assets/icons/monument-icon.svg';
import cultureIcon from '../assets/icons/culture-icon.svg';
import recipeIcon from '../assets/icons/recipe-icon.svg';
import quizIcon from '../assets/icons/quiz-icon.svg';

function Navigation() {
  return (
    <div className="navigation">
      <div className="nav-menu">
        <NavLink to="/monuments" className="nav-item">
          <div className="nav-icon">
            <img src={monumentIcon} alt="Monuments" />
          </div>
          <span>Monuments</span>
        </NavLink>
        
        <NavLink to="/culture" className="nav-item">
          <div className="nav-icon">
            <img src={cultureIcon} alt="Culture" />
          </div>
          <span>Culture</span>
        </NavLink>
        
        <NavLink to="/recettes" className="nav-item">
          <div className="nav-icon">
            <img src={recipeIcon} alt="Recettes" />
          </div>
          <span>Recettes</span>
        </NavLink>
        
        <NavLink to="/quiz" className="nav-item">
          <div className="nav-icon">
            <img src={quizIcon} alt="Quiz" />
          </div>
          <span>Quiz</span>
        </NavLink>
      </div>
      
      <div className="bottom-nav">
        <NavLink to="/" className="bottom-nav-item">
          <span>Accueil</span>
        </NavLink>
        <NavLink to="/carte" className="bottom-nav-item">
          <span>Carte</span>
        </NavLink>
        <NavLink to="/culture" className="bottom-nav-item">
          <span>Culture</span>
        </NavLink>
        <NavLink to="/recettes" className="bottom-nav-item">
          <span>Recettes</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Navigation;