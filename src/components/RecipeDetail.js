// src/components/RecipeDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigation from './Navigation';
import '../styles/RecipeDetail.css';
import backIcon from '../assets/icons/back-icon.svg';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const recipeDoc = doc(db, 'recipes', id);
        const recipeSnapshot = await getDoc(recipeDoc);
        
        if (recipeSnapshot.exists()) {
          setRecipe({
            id: recipeSnapshot.id,
            ...recipeSnapshot.data()
          });
        } else {
          console.log("No such recipe!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe details: ", error);
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  if (loading) {
    return <div className="loading">Chargement de la recette...</div>;
  }

  if (!recipe) {
    return <div className="error">Recette non trouvée</div>;
  }

  return (
    <div className="recipe-detail-container">
      <div className="recipe-header">
        <Link to="/recettes" className="back-button">
          <img src={backIcon} alt="Retour" />
        </Link>
        <h1>{recipe.name}</h1>
      </div>
      
      <div 
        className="recipe-hero-image" 
        style={{ backgroundImage: `url(${recipe.imageUrl})` }}
      >
        <div className="recipe-overlay">
          <div className="recipe-categories">
          <span className="recipe-category">{recipe.category}</span>
            <span className="recipe-region">{recipe.region}</span>
          </div>
        </div>
      </div>
      
      <div className="recipe-content">
        <div className="recipe-meta-details">
          <div className="meta-item">
            <span className="meta-icon prep-icon"></span>
            <div className="meta-info">
              <span className="meta-label">Préparation</span>
              <span className="meta-value">{recipe.prepTime} min</span>
            </div>
          </div>
          
          <div className="meta-item">
            <span className="meta-icon cook-icon"></span>
            <div className="meta-info">
              <span className="meta-label">Cuisson</span>
              <span className="meta-value">{recipe.cookTime} min</span>
            </div>
          </div>
          
          <div className="meta-item">
            <span className="meta-icon servings-icon"></span>
            <div className="meta-info">
              <span className="meta-label">Personnes</span>
              <span className="meta-value">{recipe.servings}</span>
            </div>
          </div>
          
          <div className="meta-item">
            <span className="meta-icon difficulty-icon"></span>
            <div className="meta-info">
              <span className="meta-label">Difficulté</span>
              <span className="meta-value">{recipe.difficulty}</span>
            </div>
          </div>
        </div>
        
        <section className="recipe-section">
          <h2>Ingrédients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">{ingredient}</li>
            ))}
          </ul>
        </section>
        
        <section className="recipe-section">
          <h2>Instructions</h2>
          <ol className="instructions-list">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="instruction-step">{step}</li>
            ))}
          </ol>
        </section>
        
        {recipe.tips && (
          <section className="recipe-section tips-section">
            <h2>Conseils</h2>
            <p>{recipe.tips}</p>
          </section>
        )}
        
        {recipe.funFact && (
          <section className="recipe-section fun-fact">
            <h2>Le Saviez-Vous?</h2>
            <p>{recipe.funFact}</p>
          </section>
        )}
      </div>
      
      {/* <Navigation /> */}
    </div>
  );
}

export default RecipeDetail;