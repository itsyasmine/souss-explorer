// src/components/Recipes.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigation from './Navigation';
import '../styles/Recipes.css';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesCollection = collection(db, 'recipes');
        const recipesSnapshot = await getDocs(recipesCollection);
        const recipesList = recipesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Extract unique categories
        const uniqueCategories = ['Tous', ...new Set(recipesList.map(recipe => recipe.category))];
        
        setRecipes(recipesList);
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes: ", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = selectedCategory === 'Tous' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  if (loading) {
    return <div className="loading">Chargement des recettes...</div>;
  }

  return (
    <div className="recipes-container">
      <h1>Recettes Traditionnelles</h1>
      
      <div className="category-filters">
        {categories.map(category => (
          <button 
            key={category}
            className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="recipes-grid">
        {filteredRecipes.map(recipe => (
          <Link 
            to={`/recettes/${recipe.id}`} 
            className="recipe-card" 
            key={recipe.id}
          >
            <div 
              className="recipe-image" 
              style={{ backgroundImage: `url(${recipe.imageUrl})` }}
            >
              <div className="recipe-difficulty">
                {recipe.difficulty}
              </div>
            </div>
            <div className="recipe-info">
              <h3>{recipe.name}</h3>
              <div className="recipe-meta">
                <span className="recipe-time">
                  <i className="time-icon"></i>
                  {recipe.prepTime + recipe.cookTime} min
                </span>
                <span className="recipe-servings">
                  <i className="servings-icon"></i>
                  {recipe.servings} pers.
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <Navigation />
    </div>
  );
}

export default Recipes;