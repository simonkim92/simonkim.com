// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ProjectDetail from './ProjectDetail';
import ProjectList from './ProjectList';

export default function App() {
  const [sectionName, setSectionName] = useState('PROJECTS');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home sectionName={sectionName} setSectionName={setSectionName} />
          }
        >
          <Route index element={<ProjectList />} />
          <Route path="project/:id" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}
