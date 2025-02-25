import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';
import { projects } from './Projects';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('#121212'); // 기본 배경색
  const [hoveredProjectId, setHoveredProjectId] = useState(null); // 호버된 프로젝트 ID 저장
  const [showGallery, setShowGallery] = useState(true); // 갤러리 표시 상태 추가
  const [exitButtonVisible, setExitButtonVisible] = useState(false); // 나가기 버튼 상태 추가

  const openProject = (project) => {
    setSelectedProject(project);
    setBackgroundImage(`url(${project.image})`); // 클릭된 프로젝트의 이미지로 배경 변경
    setShowGallery(false); // 프로젝트 선택 시 갤러리 숨기기
    setExitButtonVisible(true); // 나가기 버튼 표시
  };

  const closeProject = () => {
    setSelectedProject(null);
    setBackgroundImage('#121212'); // 기본 배경색으로 복원
    setShowGallery(true); // 갤러리 다시 표시
    setExitButtonVisible(false); // 나가기 버튼 숨기기
  };

  return (
    <>
      {/* <BackgroundOverlay
        backgroundImage={backgroundImage}
        opacity={selectedProject ? 1 : 0} // 선택된 프로젝트가 있을 때만 보이도록 설정
      /> */}
      <Main>
        <Header>
          <Name>Simon Kim</Name>
          <Navigator>
            <NavButton>INFO</NavButton>
            <NavButton>PROJECTS</NavButton>
          </Navigator>
        </Header>
        <SectionName>PROJECTS</SectionName>
        <Section>
          {
            <ProjectGallery>
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  onClick={() => openProject(project)}
                >
                  <ProjectDate>January 2013</ProjectDate>
                  <ProjectVideo src={project.video} autoPlay loop muted />
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <Description>{project.description}</Description>
                </ProjectCard>
              ))}
            </ProjectGallery>
          }
        </Section>
        {exitButtonVisible && (
          <ExitButton onClick={closeProject}>나가기</ExitButton>
        )}
      </Main>
    </>
  );
}

export const Description = styled.div`
  font-size: 15px;
  color: rgb(178, 172, 162);
  margin-bottom: 5px;
  //font-family: Arial, Helvetica, sans-serif;
`;
export const ProjectDate = styled.div`
  font-size: 10px;
  margin-bottom: 5px;
  color: rgb(178, 172, 162);
  font-family: Arial, Helvetica, sans-serif;
`;
export const SectionName = styled.main`
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
  height: 100vh;
  transition: all 2s;
`;
export const Name = styled.div`
  font-weight: bold;
  position: absolute;
  margin-right: auto;
  cursor: pointer;
`;
export const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ backgroundImage }) =>
    `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), ${backgroundImage}`};
  background-size: cover;
  transition: background 11s ease-in-out, opacity 1s ease-in-out; /* 알파값 변화에 대한 트렌지션 추가 */
  opacity: ${({ opacity }) => opacity}; /* 알파값 조정 */
`;
export const Header = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
`;
export const Section = styled.section`
  padding: 40px 0px;
  display: flex;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #ffffff;
`;
export const NavButton = styled.div`
  cursor: pointer;
`;
export const Navigator = styled.div`
  gap: 10px;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  font-weight: bold;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #b0b0b0;
`;

export const Email = styled.div`
  margin-left: auto;
  font-size: 1rem;
  color: #b0b0b0;
`;

export const PlayArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  background-color: #1e1e1e;
`;

export const ProjectGallery = styled.section`
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const ProjectCard = styled.div`
  cursor: pointer;
  width: 238px;
  //max-height: 309px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  overflow: hidden; /* 추가된 부분 */
  transition: all 1s;
  position: relative; /* 추가된 부분 */
  &:hover {
    opacity: 1;
    transition: all 1s;
    transform: scale(1.05); /* 호버 시 사이즈 증가 */
    z-index: 100;
  }
`;

export const ProjectImageContainer = styled.div`
  width: 100%;
  height: 119px;
  position: relative; /* 추가된 부분 */
`;

export const ProjectVideo = styled.video`
  width: 100%;
  height: 119px;
  object-fit: cover; /* 추가된 부분 */
  margin-bottom: 10px;
`;

export const ProjectTitle = styled.div`
  font-size: 35px;
  width: 100%;
  color: #ffffff; /* 텍스트 색상 */
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #2a2a2a;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;
export const TopRow = styled.div`
  display: flex;
  align-items: center;
`;

export const BottomRow = styled.div``;

export const ExitButton = styled.div`
  position: fixed;
  top: 50px; /* 화면 밖에서 시작 */
  left: 50%; /* 중앙 정렬 */
  transform: translateX(-50%); /* 중앙 정렬 */
  cursor: pointer;
  font-size: 2rem; /* 크게 설정 */
  color: #ffffff;
  transition: top 0.5s ease-in-out; /* 부드러운 애니메이션 */
  z-index: 1000; /* 항상 위에 표시 */
  &:hover {
    color: #ff0000; /* 호버 시 색상 변경 */
  }
`;

export const GamePlayer = styled.iframe`
  width: 1280px;
  height: 720px;
`;
