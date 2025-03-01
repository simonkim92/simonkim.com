// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Home from './Home';
import ProjectDetail from './ProjectDetail';
import ProjectList from './ProjectList';
import { Info } from './Components/Info';

export default function App() {
  const [sectionName, setSectionName] = useState('PROJECTS');

  const AppContent = () => {
    const location = useLocation();

    useEffect(() => {
      if (location.pathname === '/') {
        setSectionName('PROJECTS');
      } else if (location.pathname === '/info') {
        setSectionName('Info');
      } else if (location.pathname === '/project/relichunterszero') {
        setSectionName('relic hunters zero');
      }
    }, [location]);

    return (
      <Routes>
        <Route
          path="/"
          element={
            <Home sectionName={sectionName} setSectionName={setSectionName} />
          }
        >
          <Route path="info" index element={<Info />} />
          <Route index element={<ProjectList />} />
          <Route path="project/:id" element={<ProjectDetail />} />
        </Route>
      </Routes>
    );
  };

  return (
    <Router>
      <AppContent />
    </Router>
  );
}
