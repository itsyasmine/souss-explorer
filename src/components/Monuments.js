// src/components/Monuments.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigation from './Navigation';
import '../styles/Monuments.css';

function Monuments() {
  const [monuments, setMonuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        const monumentsCollection = collection(db, 'monuments');
        const monumentsSnapshot = await getDocs(monumentsCollection);
        const monumentsList = monumentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMonuments(monumentsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching monuments: ", error);
        setLoading(false);
      }
    };

    fetchMonuments();
  }, []);

  if (loading) {
    return <div className="loading">Chargement des monuments...</div>;
  }

  return (
    <div className="monuments-container">
      <h1>Monuments du Souss-Massa</h1>
      
      <div className="monuments-grid">
        {monuments.map(monument => (
          <Link 
            to={`/monuments/${monument.id}`} 
            className="monument-card" 
            key={monument.id}
          >
            <div 
              className="monument-image" 
              style={{ backgroundImage: `url(${monument.imageUrl})` }}
            >
            </div>
            <div className="monument-info">
              <h3>{monument.name}</h3>
              <p className="monument-location">{monument.location}</p>
            </div>
          </Link>
        ))}
      </div>
      
      <Navigation />
    </div>
  );
}

export default Monuments;
