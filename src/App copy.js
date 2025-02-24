import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';
import { projects } from './Projects';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('#121212'); // 기본 배경색
  const [hoveredProjectId, setHoveredProjectId] = useState(null); // 호버된 프로젝트 ID 저장
  const [showGallery, setShowGallery] = useState(true); // 갤러리 표시 상태 추가

  const openProject = (project) => {
    setSelectedProject(project);
    setBackgroundImage(`url(${project.image})`); // 클릭된 프로젝트의 이미지로 배경 변경
    setShowGallery(false); // 프로젝트 선택 시 갤러리 숨기기
  };

  const closeProject = () => {
    setSelectedProject(null);
    setBackgroundImage('#121212'); // 기본 배경색으로 복원
    setShowGallery(true); // 갤러리 다시 표시
  };

  return (
    <>
      <BackgroundOverlay
        backgroundImage={backgroundImage}
        opacity={selectedProject ? 1 : 0} // 선택된 프로젝트가 있을 때만 보이도록 설정
      />
      <Main>
        <Header>
          <Name>Simon Kim</Name>
          <Navigator>
            <div>Info</div>
            <div>Portfolio</div>
          </Navigator>
        </Header>
        <Section>
          {
            <ProjectGallery>
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  onClick={() => openProject(project)}
                  onMouseEnter={() => {
                    setHoveredProjectId(project.id); // 호버된 프로젝트 ID 설정
                  }}
                  onMouseLeave={() => {
                    setHoveredProjectId(null); // 호버된 프로젝트 ID 초기화
                  }}
                  style={{
                    opacity:
                      selectedProject && selectedProject.id !== project.id
                        ? 0
                        : 1,
                    transition: 'opacity 0.5s ease-in-out',
                  }}
                >
                  <ProjectImageContainer>
                    <ProjectVideo src={project.video} autoPlay loop muted />
                  </ProjectImageContainer>
                  {selectedProject && selectedProject.id === project.id && (
                    <ProjectTitle>{project.title}</ProjectTitle>
                  )}
                </ProjectCard>
              ))}
            </ProjectGallery>
          }
        </Section>

        {/* 나가기 버튼 */}
        {selectedProject && (
          <ExitButton onClick={closeProject}>
            나가기
          </ExitButton>
        )}
      </Main>
    </>
  );
}

export const Main = styled.main`
  padding: 0px 40px;
  display: flex;
  flex-direction: column;
  color: #ffffff;
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
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #ffffff;
`;
export const Navigator = styled.div`
  gap: 10px;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  font-weight: bold;
  cursor: pointer;
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
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const ProjectCard = styled.div`
  cursor: pointer;
  width: 238px;
  height: 170px;
  border-radius: 8px;
  background-color: #2a2a2a;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  height: 200px;
  position: relative; /* 추가된 부분 */
  overflow: hidden; /* 동영상이 밖으로 안넘치도록 추가된 부분 */
`;

export const ProjectVideo = styled.video`
  width: 100%;
  height: 100%; /* 변경된 부분 */
  object-fit: cover; /* 추가된 부분 */
`;

export const ProjectTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  height: 30px;
  width: 100%;
  position: absolute;
  bottom: 0px;
  color: #ffffff; /* 텍스트 색상 */
  background-color: #222222;
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
  top: -50px; /* 화면 밖에서 시작 */
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
