// src/components/Culture.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigation from './Navigation';
import '../styles/Culture.css';

function Culture() {
  const [culturalElements, setCulturalElements] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCulturalElements = async () => {
      try {
        const cultureCollection = collection(db, 'culturalElements');
        const cultureSnapshot = await getDocs(cultureCollection);
        const cultureList = cultureSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Extract unique categories
        const uniqueCategories = ['Tous', ...new Set(cultureList.map(item => item.category))];
        
        setCulturalElements(cultureList);
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cultural elements: ", error);
        setLoading(false);
      }
    };

    fetchCulturalElements();
  }, []);

  const filteredElements = selectedCategory === 'Tous' 
    ? culturalElements 
    : culturalElements.filter(item => item.category === selectedCategory);

  if (loading) {
    return <div className="loading">Chargement des éléments culturels...</div>;
  }

  return (
    <div className="culture-container">
      <h1>Culture du Souss-Massa</h1>
      
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
      
      <div className="culture-grid">
        {filteredElements.map(item => (
          <Link 
            to={`/culture/${item.id}`} 
            className="culture-card" 
            key={item.id}
          >
            <div 
              className="culture-image" 
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            >
              <div className="culture-category-badge">
                {item.category}
              </div>
            </div>
            <div className="culture-info">
              <h3>{item.name}</h3>
              <p className="culture-region">{item.region}</p>
            </div>
          </Link>
        ))}
      </div>
      
      <Navigation />
    </div>
  );
}

export default Culture;