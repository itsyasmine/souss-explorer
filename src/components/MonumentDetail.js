// src/components/MonumentDetail.js (updated with audio player)
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigation from './Navigation';
import AudioPlayer from './AudioPlayer';
import '../styles/MonumentDetail.css';
import backIcon from '../assets/icons/back-icon.svg';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function MonumentDetail() {
  const { id } = useParams();
  const [monument, setMonument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAudio, setShowAudio] = useState(false);

  useEffect(() => {
    const fetchMonumentDetail = async () => {
      try {
        const monumentDoc = doc(db, 'monuments', id);
        const monumentSnapshot = await getDoc(monumentDoc);
        
        if (monumentSnapshot.exists()) {
          setMonument({
            id: monumentSnapshot.id,
            ...monumentSnapshot.data()
          });
        } else {
          console.log("No such monument!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching monument details: ", error);
        setLoading(false);
      }
    };

    fetchMonumentDetail();
  }, [id]);

  const toggleAudioPlayer = () => {
    setShowAudio(!showAudio);
  };

  if (loading) {
    return <div className="loading">Chargement du monument...</div>;
  }

  if (!monument) {
    return <div className="error">Monument non trouvé</div>;
  }

  return (
    <div className="monument-detail-container">
      <div className="monument-header">
        <Link to="/monuments" className="back-button">
          <img src={backIcon} alt="Retour" />
        </Link>
        <h1>{monument.name}</h1>
        {monument.audioUrl && (
          <button className="audio-button" onClick={toggleAudioPlayer}>
            <span className="audio-icon">🔊</span>
          </button>
        )}
      </div>
      
      <div 
        className="monument-hero-image" 
        style={{ backgroundImage: `url(${monument.imageUrl})` }}
      >
        <div className="monument-overlay">
          <h2>{monument.name}</h2>
          <p className="monument-period">{monument.period}</p>
        </div>
      </div>
      
      {showAudio && monument.audioUrl && (
        <AudioPlayer 
          audioUrl={monument.audioUrl} 
          title={monument.name} 
        />
      )}
      
      <div className="monument-content">
        <div className="monument-description">
          {monument.description}
        </div>
        
        {monument.historicalInfo && (
          <div className="monument-section">
            <h3>Histoire</h3>
            <p>{monument.historicalInfo}</p>
          </div>
        )}
        
        {monument.funFact && (
          <div className="monument-section fun-fact">
            <h3>Le Saviez-Vous?</h3>
            <p>{monument.funFact}</p>
          </div>
        )}
        
        {monument.coordinates && (
          <div className="monument-section">
            <h3>Localisation</h3>
            <p>{monument.locationDescription}</p>
            <div className="monument-map">
            <MapContainer 
              center={[monument.coordinates.latitude, monument.coordinates.longitude]} 
              zoom={13} 
              style={{ height: '250px', width: '100%', borderRadius: '8px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[monument.coordinates.latitude, monument.coordinates.longitude]}>
                <Popup>
                  <b>{monument.name}</b><br />
                  {monument.location}
                </Popup>
              </Marker>
            </MapContainer>
              <div id="map" className="map-container"></div>
            </div>
          </div>
        )}
        
      </div>
      
      {/* <Navigation /> */}
    </div>
  );
}

export default MonumentDetail;