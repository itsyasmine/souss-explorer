// src/components/CultureDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigation from './Navigation';
import '../styles/CultureDetail.css';
import backIcon from '../assets/icons/back-icon.svg';

function CultureDetail() {
  const { id } = useParams();
  const [culturalElement, setCulturalElement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCultureDetail = async () => {
      try {
        const cultureDoc = doc(db, 'culturalElements', id);
        const cultureSnapshot = await getDoc(cultureDoc);
        
        if (cultureSnapshot.exists()) {
          setCulturalElement({
            id: cultureSnapshot.id,
            ...cultureSnapshot.data()
          });
        } else {
          console.log("No such cultural element!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cultural element details: ", error);
        setLoading(false);
      }
    };

    fetchCultureDetail();
  }, [id]);

  if (loading) {
    return <div className="loading">Chargement de l'élément culturel...</div>;
  }

  if (!culturalElement) {
    return <div className="error">Élément culturel non trouvé</div>;
  }

  return (
    <div className="culture-detail-container">
      <div className="culture-header">
        <Link to="/culture" className="back-button">
          <img src={backIcon} alt="Retour" />
        </Link>
        <h1>{culturalElement.name}</h1>
      </div>
      
      <div 
        className="culture-hero-image" 
        style={{ backgroundImage: `url(${culturalElement.imageUrl})` }}
      >
        <div className="culture-overlay">
          <div className="culture-categories">
            <span className="culture-category-badge">{culturalElement.category}</span>
            <span className="culture-region-badge">{culturalElement.region}</span>
          </div>
        </div>
      </div>
      
      <div className="culture-content">
        <section className="culture-description">
          {culturalElement.description}
        </section>
        
        {culturalElement.historicalContext && (
          <section className="culture-section">
            <h3>Contexte Historique</h3>
            <p>{culturalElement.historicalContext}</p>
          </section>
        )}
        
        {culturalElement.uses && (
          <section className="culture-section">
            <h3>Utilisations</h3>
            <ul className="uses-list">
              {culturalElement.uses.map((use, index) => (
                <li key={index}>{use}</li>
              ))}
            </ul>
          </section>
        )}
        
        {culturalElement.videoUrl && (
          <section className="culture-section">
            <h3>Démonstration</h3>
            <div className="video-container">
              <video 
                controls 
                poster={culturalElement.imageUrl}
                src={culturalElement.videoUrl}
              >
                Votre navigateur ne prend pas en charge la lecture de vidéos.
              </video>
            </div>
          </section>
        )}
        
        {culturalElement.funFact && (
          <section className="culture-section fun-fact">
            <h3>Le Saviez-Vous?</h3>
            <p>{culturalElement.funFact}</p>
          </section>
        )}
      </div>
      
      {/* <Navigation /> */}
    </div>
  );
}

export default CultureDetail;