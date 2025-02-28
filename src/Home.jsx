// src/Home.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './NavBar';

export default function Home({ sectionName, setSectionName }) {
  return (
    <Main>
      <NavBar />
      <SectionName>{sectionName}</SectionName>
      <Outlet context={{ sectionName, setSectionName }} />
    </Main>
  );
}

const SectionName = styled.main`
  letter-spacing: 0.6px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 46px;
`;

export const Main = styled.main`
  padding: 0px 40px;
  display: flex;
  flex-direction: column;
  color: #ffffff;
  background-color: rgb(25, 27, 28);
  min-height: 100vh; /* 최소 높이 유지 */
  transition: all 2s;
`;
