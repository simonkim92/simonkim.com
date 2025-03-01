import { useState, useEffect } from 'react';
import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NavBar() {
  const [selectedNav, setSelectedNav] = useState('PROJECTS');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/project')) {
      setSelectedNav('');
    } else if (location.pathname.includes('/info')) {
      setSelectedNav('INFO');
    } else {
      setSelectedNav('PROJECTS');
    }
  }, [location.pathname]);

  const handleNavClick = (nav) => {
    setSelectedNav(nav);
    if (nav === 'PROJECTS') {
      navigate('/');
    } else if (nav === 'INFO') {
      navigate('/info');
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
    color: rgb(254, 39, 39);
  }
  //transition: all 0.5s;
  letter-spacing: 0.5px;
`;
