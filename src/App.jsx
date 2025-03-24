import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Home from './Home';
import ProjectDetail from './Components/Projects/ProjectDetail';

import { Info } from './Components/Info/Info';
import Blog from './Components/Blog/blogList';
import { ProjectList } from './Components/Projects/ProjectList';
import BlogPost from './Components/Blog/BlogPost';

export default function App() {
  const [sectionName, setSectionName] = useState('PROJECTS');

  const AppContent = () => {
    const location = useLocation();

    useEffect(() => {
      if (location.pathname === '/') {
        setSectionName('PROJECTS');
      } else if (location.pathname === '/info') {
        setSectionName('INFO');
      } else if (location.pathname === '/blog') {
        setSectionName('BLOG');
      } else if (location.pathname === '/project/relichunterszero') {
        setSectionName('relic hunters zero');
      } else if (location.pathname === '/project/metalslug2') {
        setSectionName('Metal Slug 2');
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
          <Route path="blog" index element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
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
