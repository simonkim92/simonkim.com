import { useState, useEffect } from 'react';
import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NavBar() {
  const [selectedNav, setSelectedNav] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let newNav = '';

    if (location.pathname.includes('/project')) {
      newNav = '';
    } else if (location.pathname === '/info') {
      newNav = 'INFO';
    } else if (location.pathname === '/blog') {
      newNav = 'BLOG';
    } else {
      newNav = 'PROJECTS';
    }

    if (newNav !== selectedNav) {
      setSelectedNav(newNav);
    }
  }, [location.pathname, selectedNav]);

  const handleNavClick = (nav) => {
    setSelectedNav(nav);
    if (nav === 'PROJECTS') {
      navigate('/');
    } else if (nav === 'INFO') {
      navigate('/info');
    } else if (nav === 'BLOG') {
      navigate('/blog');
    }
  };

  const handleNameClick = () => {
    navigate('/');
  };

  return (
    <Header>
      <Name onClick={handleNameClick}>Simon Kim</Name>
      <Navigator>
        <NavButton
          onClick={() => handleNavClick('INFO')}
          selected={selectedNav === 'INFO'}
        >
          INFO
        </NavButton>
        <NavButton
          onClick={() => handleNavClick('PROJECTS')}
          selected={selectedNav === 'PROJECTS'}
        >
          PROJECTS
        </NavButton>
        <NavButton
          onClick={() => handleNavClick('BLOG')}
          selected={selectedNav === 'BLOG'}
        >
          BLOG
        </NavButton>
      </Navigator>
    </Header>
  );
}

const Header = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  font-weight: bold;
  position: absolute;
  margin-right: auto;
  cursor: pointer;
  letter-spacing: 0.5px;
`;

const Navigator = styled.div`
  gap: 10px;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  font-weight: bold;
`;

const NavButton = styled.div`
  cursor: pointer;
  color: ${({ selected }) => (selected ? 'rgb(254, 39, 39)' : '#ffffff')};
  &:hover {
    color: red;
  }
  transition: all 0.3s;
  letter-spacing: 0.5px;
`;
