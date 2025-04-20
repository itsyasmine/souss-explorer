import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Monuments from './components/Monuments';
import MonumentDetail from './components/MonumentDetail';
import Culture from './components/Culture';
import CultureDetail from './components/CultureDetail';
import Recipes from './components/Recipes';
import RecipeDetail from './components/RecipeDetail';
import Quiz from './components/Quiz';
import Map from './components/Map';
import './App.css';
import 'leaflet/dist/leaflet.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carte" element={<Map />} />
        <Route path="/monuments" element={<Monuments />} />
        <Route path="/monuments/:id" element={<MonumentDetail />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/culture/:id" element={<CultureDetail />} />
        <Route path="/recettes" element={<Recipes />} />
        <Route path="/recettes/:id" element={<RecipeDetail />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;