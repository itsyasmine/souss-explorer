// src/components/Map.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigation from './Navigation';
import 'leaflet/dist/leaflet.css';
import '../styles/Map.css';
import L from 'leaflet';

// Correction pour les icônes Leaflet qui ne s'affichent pas correctement dans React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function Map() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Position centrale (Agadir)
  const position = [30.4279, -9.5980];

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsCollection = collection(db, 'mapLocations');
        const locationsSnapshot = await getDocs(locationsCollection);
        const locationsList = locationsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setLocations(locationsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching locations: ", error);
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return <div className="loading">Chargement de la carte...</div>;
  }

  return (
    <div className="map-container">
      <h1>Carte des sites d'intérêt</h1>
      <MapContainer 
        center={position} 
        zoom={9} 
        style={{ height: '70vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {locations.map(location => (
          <Marker 
            key={location.id} 
            position={[location.latitude, location.longitude]}
          >
            <Popup>
              <div className="popup-content">
                <h3>{location.name}</h3>
                {location.imageUrl && (
                  <img 
                    src={location.imageUrl} 
                    alt={location.name} 
                    className="location-image" 
                  />
                )}
                <p>{location.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <Navigation />
    </div>
  );
}

export default Map;